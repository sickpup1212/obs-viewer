import { create } from "zustand";
import { COMMANDS } from "./catalog";
import type {
  AudioInput,
  BootPhase,
  ContainerStatus,
  LogEvent,
  ObsResponse,
  Scene,
} from "./types";

const STORAGE_KEY = "stagehand.v1";

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function seedScenes(): Scene[] {
  return [
    {
      sceneName: "Starting Soon",
      sceneIndex: 0,
      items: [
        { id: "1", sourceName: "Backdrop", kind: "color", enabled: true },
        { id: "2", sourceName: "Title Card", kind: "text", enabled: true },
        { id: "3", sourceName: "Countdown", kind: "text", enabled: true },
        { id: "4", sourceName: "Idle Loop", kind: "browser", enabled: true },
      ],
    },
    {
      sceneName: "Gameplay",
      sceneIndex: 1,
      items: [
        { id: "5", sourceName: "Game Capture", kind: "game", enabled: true },
        { id: "6", sourceName: "Webcam", kind: "camera", enabled: true },
        { id: "7", sourceName: "Overlay", kind: "overlay", enabled: true },
        { id: "8", sourceName: "Alerts", kind: "browser", enabled: true },
      ],
    },
    {
      sceneName: "Just Chatting",
      sceneIndex: 2,
      items: [
        { id: "9", sourceName: "Backdrop", kind: "color", enabled: true },
        { id: "10", sourceName: "Webcam", kind: "camera", enabled: true },
        { id: "11", sourceName: "Chat", kind: "chat", enabled: true },
        { id: "12", sourceName: "Lower Third", kind: "lower", enabled: true },
      ],
    },
    {
      sceneName: "Be Right Back",
      sceneIndex: 3,
      items: [
        { id: "13", sourceName: "Backdrop", kind: "color", enabled: true },
        { id: "14", sourceName: "BRB Card", kind: "text", enabled: true },
        { id: "15", sourceName: "Music Visual", kind: "browser", enabled: true },
      ],
    },
    {
      sceneName: "Ending",
      sceneIndex: 4,
      items: [
        { id: "16", sourceName: "Backdrop", kind: "color", enabled: true },
        { id: "17", sourceName: "Thanks Card", kind: "text", enabled: true },
        { id: "18", sourceName: "Credits", kind: "text", enabled: true },
      ],
    },
    {
      sceneName: "Intermission",
      sceneIndex: 5,
      items: [
        { id: "19", sourceName: "Backdrop", kind: "color", enabled: true },
        { id: "20", sourceName: "Break Card", kind: "text", enabled: true },
        { id: "21", sourceName: "Music Visual", kind: "browser", enabled: true },
      ],
    },
  ];
}

function seedInputs(): AudioInput[] {
  return [
    {
      inputName: "Mic/Aux",
      inputKind: "pulse_input_capture",
      inputMuted: false,
      inputVolumeMul: 0.82,
      special: "mic",
    },
    {
      inputName: "Desktop Audio",
      inputKind: "pulse_output_capture",
      inputMuted: false,
      inputVolumeMul: 0.64,
      special: "desktop",
    },
    {
      inputName: "Game Capture",
      inputKind: "xcomposite_input",
      inputMuted: false,
      inputVolumeMul: 0.7,
      special: "aux",
    },
    {
      inputName: "Music",
      inputKind: "ffmpeg_source",
      inputMuted: true,
      inputVolumeMul: 0.4,
      special: "aux",
    },
    {
      inputName: "Browser Source",
      inputKind: "browser_source",
      inputMuted: false,
      inputVolumeMul: 0.5,
      special: "aux",
    },
  ];
}

type Connection = { host: string; port: number; password: string };

type StreamState = {
  outputActive: boolean;
  outputReconnecting: boolean;
  outputTimecodeMs: number;
  outputDurationMs: number;
  outputBytes: number;
  outputSkippedFrames: number;
  outputTotalFrames: number;
  outputCongestion: number;
};

type RecordState = {
  outputActive: boolean;
  outputPaused: boolean;
  outputTimecodeMs: number;
  outputDurationMs: number;
  outputBytes: number;
};

type Stats = {
  cpuUsage: number;
  memoryUsage: number;
  activeFps: number;
  averageFrameRenderTime: number;
  renderSkippedFrames: number;
  renderTotalFrames: number;
  outputSkippedFrames: number;
  outputTotalFrames: number;
};

type ObsStore = {
  phase: BootPhase;
  bootLabel: string;
  container: ContainerStatus;
  identified: boolean;
  connection: Connection;
  scenes: Scene[];
  currentProgramScene: string;
  currentPreviewScene: string;
  studioMode: boolean;
  inputs: AudioInput[];
  stream: StreamState;
  record: RecordState;
  virtualCam: boolean;
  stats: Stats;
  events: LogEvent[];
  lastResponse: ObsResponse | null;
  meters: Record<string, number>;
  boot: () => void;
  stop: () => void;
  restart: () => void;
  setConnection: (patch: Partial<Connection>) => void;
  send: (requestType: string, requestData?: Record<string, unknown>) => ObsResponse;
};

const initialStream = (): StreamState => ({
  outputActive: false,
  outputReconnecting: false,
  outputTimecodeMs: 0,
  outputDurationMs: 0,
  outputBytes: 0,
  outputSkippedFrames: 0,
  outputTotalFrames: 0,
  outputCongestion: 0,
});

const initialRecord = (): RecordState => ({
  outputActive: false,
  outputPaused: false,
  outputTimecodeMs: 0,
  outputDurationMs: 0,
  outputBytes: 0,
});

const initialStats = (): Stats => ({
  cpuUsage: 4.2,
  memoryUsage: 612,
  activeFps: 60,
  averageFrameRenderTime: 2.4,
  renderSkippedFrames: 0,
  renderTotalFrames: 0,
  outputSkippedFrames: 0,
  outputTotalFrames: 0,
});

let tickTimer: ReturnType<typeof setInterval> | null = null;
let bootTimers: ReturnType<typeof setTimeout>[] = [];

function clearTimers() {
  if (tickTimer) {
    clearInterval(tickTimer);
    tickTimer = null;
  }
  for (const t of bootTimers) clearTimeout(t);
  bootTimers = [];
}

function pushEvent(events: LogEvent[], e: Omit<LogEvent, "id" | "at">): LogEvent[] {
  const next: LogEvent = { id: uid(), at: Date.now(), ...e };
  return [next, ...events].slice(0, 80);
}

function fail(type: string, comment: string): ObsResponse {
  return {
    requestType: type,
    requestStatus: { result: false, code: 600, comment },
  };
}

function ok(type: string, responseData?: Record<string, unknown>): ObsResponse {
  return {
    requestType: type,
    requestStatus: { result: true, code: 100 },
    responseData,
  };
}

function loadConnection(): Connection {
  if (typeof window === "undefined") {
    return { host: "127.0.0.1", port: 4455, password: "stagehand" };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { host: "127.0.0.1", port: 4455, password: "stagehand" };
    const parsed = JSON.parse(raw) as Partial<Connection>;
    return {
      host: parsed.host || "127.0.0.1",
      port: parsed.port || 4455,
      password: parsed.password || "stagehand",
    };
  } catch {
    return { host: "127.0.0.1", port: 4455, password: "stagehand" };
  }
}

export const useObs = create<ObsStore>((set, get) => ({
  phase: "booting",
  bootLabel: "Allocating framebuffer",
  container: { xvfb: "starting", obs: "down", websocket: "down" },
  identified: false,
  connection: loadConnection(),
  scenes: seedScenes(),
  currentProgramScene: "Starting Soon",
  currentPreviewScene: "Gameplay",
  studioMode: false,
  inputs: seedInputs(),
  stream: initialStream(),
  record: initialRecord(),
  virtualCam: false,
  stats: initialStats(),
  events: [],
  lastResponse: null,
  meters: {},

  setConnection: (patch) => {
    const connection = { ...get().connection, ...patch };
    set({ connection });
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(connection));
    }
  },

  boot: () => {
    clearTimers();
    set({
      phase: "booting",
      bootLabel: "Allocating framebuffer",
      identified: false,
      container: { xvfb: "starting", obs: "down", websocket: "down" },
      events: pushEvent(get().events, {
        kind: "system",
        name: "container.start",
        detail: "docker compose up — display :99",
      }),
    });

    const step = (ms: number, fn: () => void) => {
      bootTimers.push(setTimeout(fn, ms));
    };

    step(420, () => {
      set({
        bootLabel: "Xvfb :99 1920×1080×24",
        container: { xvfb: "up", obs: "starting", websocket: "down" },
        events: pushEvent(get().events, {
          kind: "system",
          name: "xvfb.ready",
          detail: "DISPLAY=:99",
        }),
      });
    });
    step(980, () => {
      set({
        bootLabel: "Launching OBS Studio",
        container: { xvfb: "up", obs: "up", websocket: "starting" },
        events: pushEvent(get().events, {
          kind: "system",
          name: "obs.ready",
          detail: "obs-studio 30.2.3 linux",
        }),
      });
    });
    step(1480, () => {
      set({
        bootLabel: "obs-websocket Identify",
        container: { xvfb: "up", obs: "up", websocket: "up" },
        events: pushEvent(get().events, {
          kind: "event",
          name: "Hello",
          detail: "op 0  rpcVersion=1  auth required",
        }),
      });
    });
    step(1860, () => {
      set({
        phase: "ready",
        bootLabel: "Identified",
        identified: true,
        events: pushEvent(get().events, {
          kind: "event",
          name: "Identified",
          detail: "op 2  negotiated rpc 1",
        }),
      });
      startTick(set, get);
    });
  },

  stop: () => {
    clearTimers();
    set({
      phase: "stopped",
      bootLabel: "Container stopped",
      identified: false,
      container: { xvfb: "down", obs: "down", websocket: "down" },
      stream: initialStream(),
      record: initialRecord(),
      virtualCam: false,
      events: pushEvent(get().events, {
        kind: "system",
        name: "container.stop",
        detail: "SIGTERM obs · xvfb",
      }),
    });
  },

  restart: () => {
    get().stop();
    bootTimers.push(setTimeout(() => get().boot(), 240));
  },

  send: (requestType, requestData = {}) => {
    const state = get();
    if (state.phase !== "ready") {
      const res = fail(requestType, "Not identified. Container is not ready.");
      set({
        lastResponse: res,
        events: pushEvent(
          pushEvent(state.events, {
            kind: "request",
            name: requestType,
            detail: JSON.stringify(requestData),
          }),
          { kind: "response", name: requestType, ok: false, detail: res.requestStatus.comment },
        ),
      });
      return res;
    }

    const res = dispatch(requestType, requestData, get, set);
    set((s) => ({
      lastResponse: res,
      events: pushEvent(
        pushEvent(s.events, {
          kind: "request",
          name: requestType,
          detail: Object.keys(requestData).length ? JSON.stringify(requestData) : undefined,
        }),
        {
          kind: "response",
          name: requestType,
          ok: res.requestStatus.result,
          detail: res.requestStatus.result
            ? res.responseData
              ? JSON.stringify(res.responseData)
              : "ok"
            : res.requestStatus.comment,
        },
      ),
    }));
    return res;
  },
}));

type SetFn = (partial: Partial<ObsStore> | ((s: ObsStore) => Partial<ObsStore>)) => void;
type GetFn = () => ObsStore;

function startTick(set: SetFn, get: GetFn) {
  if (tickTimer) clearInterval(tickTimer);
  tickTimer = setInterval(() => {
    const s = get();
    if (s.phase !== "ready") return;
    const dt = 250;
    const jitter = () => (Math.random() - 0.5) * 2;

    const meters: Record<string, number> = {};
    for (const input of s.inputs) {
      if (input.inputMuted) {
        meters[input.inputName] = 0;
      } else {
        const base = 0.18 + input.inputVolumeMul * 0.55;
        const liveBoost = s.stream.outputActive ? 0.12 : 0;
        meters[input.inputName] = Math.min(1, Math.max(0.04, base + liveBoost + jitter() * 0.22));
      }
    }

    const stream = { ...s.stream };
    if (stream.outputActive) {
      stream.outputTimecodeMs += dt;
      stream.outputDurationMs += dt;
      stream.outputBytes += 420_000 + Math.round(jitter() * 40_000);
      stream.outputTotalFrames += 15;
      if (Math.random() < 0.04) stream.outputSkippedFrames += 1;
      stream.outputCongestion = Math.max(0, 0.04 + jitter() * 0.05);
    }

    const record = { ...s.record };
    if (record.outputActive && !record.outputPaused) {
      record.outputTimecodeMs += dt;
      record.outputDurationMs += dt;
      record.outputBytes += 780_000 + Math.round(jitter() * 60_000);
    }

    const stats = { ...s.stats };
    const load = (stream.outputActive ? 18 : 6) + (record.outputActive ? 8 : 0);
    stats.cpuUsage = Math.min(48, Math.max(3, load + jitter() * 3));
    stats.memoryUsage = 580 + load * 4 + jitter() * 8;
    stats.activeFps = 60 - (Math.random() < 0.08 ? 0.4 : 0);
    stats.averageFrameRenderTime = 2.1 + load * 0.04 + jitter() * 0.3;
    stats.renderTotalFrames += 15;
    stats.outputTotalFrames = stream.outputTotalFrames;
    stats.outputSkippedFrames = stream.outputSkippedFrames;

    set({ meters, stream, record, stats });
  }, 250);
}

function dispatch(
  type: string,
  data: Record<string, unknown>,
  get: GetFn,
  set: SetFn,
): ObsResponse {
  const s = get();

  switch (type) {
    case "GetVersion":
      return ok(type, {
        obsVersion: "30.2.3",
        obsWebSocketVersion: "5.5.2",
        rpcVersion: 1,
        availableRequests: COMMANDS.map((c) => c.type),
        platform: "linux",
        platformDescription: "Ubuntu 24.04 (Xvfb :99)",
      });
    case "GetStats":
      return ok(type, { ...s.stats });
    case "GetSceneList":
      return ok(type, {
        currentProgramSceneName: s.currentProgramScene,
        currentPreviewSceneName: s.currentPreviewScene,
        scenes: s.scenes.map((sc) => ({
          sceneName: sc.sceneName,
          sceneIndex: sc.sceneIndex,
        })),
      });
    case "GetCurrentProgramScene":
      return ok(type, { sceneName: s.currentProgramScene });
    case "SetCurrentProgramScene": {
      const name = String(data.sceneName ?? "");
      const found = s.scenes.find((sc) => sc.sceneName === name);
      if (!found) return fail(type, `Scene not found: ${name}`);
      set({ currentProgramScene: name });
      set((cur) => ({
        events: pushEvent(cur.events, {
          kind: "event",
          name: "CurrentProgramSceneChanged",
          detail: name,
        }),
      }));
      return ok(type);
    }
    case "GetSceneItemList": {
      const name = String(data.sceneName ?? s.currentProgramScene);
      const scene = s.scenes.find((sc) => sc.sceneName === name);
      if (!scene) return fail(type, `Scene not found: ${name}`);
      return ok(type, {
        sceneItems: scene.items.map((it, i) => ({
          sceneItemId: Number(it.id),
          sourceName: it.sourceName,
          sceneItemEnabled: it.enabled,
          sceneItemIndex: i,
        })),
      });
    }
    case "SetSceneItemEnabled": {
      const name = String(data.sceneName ?? s.currentProgramScene);
      const id = String(data.sceneItemId ?? "");
      const enabled = Boolean(data.sceneItemEnabled);
      let hit = false;
      const scenes = s.scenes.map((sc) => {
        if (sc.sceneName !== name) return sc;
        return {
          ...sc,
          items: sc.items.map((it) => {
            if (it.id !== id) return it;
            hit = true;
            return { ...it, enabled };
          }),
        };
      });
      if (!hit) return fail(type, `Scene item ${id} not in ${name}`);
      set({ scenes });
      return ok(type);
    }
    case "GetInputList":
      return ok(type, {
        inputs: s.inputs.map((i) => ({
          inputName: i.inputName,
          inputKind: i.inputKind,
          unversionedInputKind: i.inputKind,
        })),
      });
    case "GetSpecialInputs":
      return ok(type, {
        desktop1: "Desktop Audio",
        desktop2: null,
        mic1: "Mic/Aux",
        mic2: null,
        mic3: null,
        mic4: null,
      });
    case "SetInputMute": {
      const name = String(data.inputName ?? "");
      const muted = Boolean(data.inputMuted);
      if (!s.inputs.some((i) => i.inputName === name)) return fail(type, `Input not found: ${name}`);
      set({
        inputs: s.inputs.map((i) => (i.inputName === name ? { ...i, inputMuted: muted } : i)),
      });
      return ok(type);
    }
    case "ToggleInputMute": {
      const name = String(data.inputName ?? "");
      const input = s.inputs.find((i) => i.inputName === name);
      if (!input) return fail(type, `Input not found: ${name}`);
      const next = !input.inputMuted;
      set({
        inputs: s.inputs.map((i) => (i.inputName === name ? { ...i, inputMuted: next } : i)),
      });
      return ok(type, { inputMuted: next });
    }
    case "SetInputVolume": {
      const name = String(data.inputName ?? "");
      const mul = Number(data.inputVolumeMul);
      if (!s.inputs.some((i) => i.inputName === name)) return fail(type, `Input not found: ${name}`);
      if (Number.isNaN(mul)) return fail(type, "inputVolumeMul must be a number");
      set({
        inputs: s.inputs.map((i) =>
          i.inputName === name ? { ...i, inputVolumeMul: Math.min(1, Math.max(0, mul)) } : i,
        ),
      });
      return ok(type);
    }
    case "GetStreamStatus":
      return ok(type, { ...s.stream, outputTimecode: formatProtoTime(s.stream.outputTimecodeMs) });
    case "StartStream":
      if (s.stream.outputActive) return fail(type, "Already streaming");
      set({ stream: { ...s.stream, outputActive: true } });
      emit(set, "StreamStateChanged", "live");
      return ok(type);
    case "StopStream":
      if (!s.stream.outputActive) return fail(type, "Not streaming");
      set({ stream: { ...s.stream, outputActive: false } });
      emit(set, "StreamStateChanged", "offline");
      return ok(type);
    case "ToggleStream": {
      const next = !s.stream.outputActive;
      set({ stream: { ...s.stream, outputActive: next } });
      emit(set, "StreamStateChanged", next ? "live" : "offline");
      return ok(type, { outputActive: next });
    }
    case "GetRecordStatus":
      return ok(type, { ...s.record, outputTimecode: formatProtoTime(s.record.outputTimecodeMs) });
    case "StartRecord":
      if (s.record.outputActive) return fail(type, "Already recording");
      set({ record: { ...s.record, outputActive: true, outputPaused: false } });
      emit(set, "RecordStateChanged", "recording");
      return ok(type);
    case "StopRecord":
      if (!s.record.outputActive) return fail(type, "Not recording");
      set({ record: { ...s.record, outputActive: false, outputPaused: false } });
      emit(set, "RecordStateChanged", "stopped");
      return ok(type, { outputPath: "/recordings/stagehand.mkv" });
    case "ToggleRecord": {
      const next = !s.record.outputActive;
      set({ record: { ...s.record, outputActive: next, outputPaused: false } });
      emit(set, "RecordStateChanged", next ? "recording" : "stopped");
      return ok(type, { outputActive: next });
    }
    case "PauseRecord":
      if (!s.record.outputActive) return fail(type, "Not recording");
      if (s.record.outputPaused) return fail(type, "Already paused");
      set({ record: { ...s.record, outputPaused: true } });
      return ok(type);
    case "ResumeRecord":
      if (!s.record.outputActive || !s.record.outputPaused) return fail(type, "Not paused");
      set({ record: { ...s.record, outputPaused: false } });
      return ok(type);
    case "GetVirtualCamStatus":
      return ok(type, { outputActive: s.virtualCam });
    case "StartVirtualCam":
      set({ virtualCam: true });
      return ok(type);
    case "StopVirtualCam":
      set({ virtualCam: false });
      return ok(type);
    case "ToggleVirtualCam": {
      const next = !s.virtualCam;
      set({ virtualCam: next });
      return ok(type, { outputActive: next });
    }
    case "GetStudioModeEnabled":
      return ok(type, { studioModeEnabled: s.studioMode });
    case "SetStudioModeEnabled": {
      const enabled = Boolean(data.studioModeEnabled);
      set({ studioMode: enabled });
      return ok(type);
    }
    case "TriggerStudioModeTransition": {
      if (!s.studioMode) return fail(type, "Studio mode is off");
      set({ currentProgramScene: s.currentPreviewScene });
      emit(set, "CurrentProgramSceneChanged", s.currentPreviewScene);
      return ok(type);
    }
    default:
      return fail(type, `Unknown request type: ${type}`);
  }
}

function emit(set: SetFn, name: string, detail: string) {
  set((s) => ({
    events: pushEvent(s.events, { kind: "event", name, detail }),
  }));
}

function formatProtoTime(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const frac = Math.floor((ms % 1000) / 10);
  return `${[h, m, s].map((n) => String(n).padStart(2, "0")).join(":")}.${String(frac).padStart(2, "0")}`;
}
