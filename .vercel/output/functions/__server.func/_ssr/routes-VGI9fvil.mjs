import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, n as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Circle, a as Square, c as Play, d as MicOff, f as Layers, g as Copy, h as Download, i as Terminal, l as MonitorPlay, m as EyeOff, n as Volume2, o as RotateCcw, p as Eye, s as Radio, t as VolumeX, u as Mic, v as Camera, y as Box } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-VGI9fvil.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatTimecode(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	return [
		Math.floor(total / 3600),
		Math.floor(total % 3600 / 60),
		total % 60
	].map((n) => String(n).padStart(2, "0")).join(":");
}
function formatBytes(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
	if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(1)} MB`;
	return `${(bytes / 1073741824).toFixed(2)} GB`;
}
function formatBitrate(bps) {
	if (bps < 1e3) return `${Math.round(bps)} bps`;
	if (bps < 1e6) return `${(bps / 1e3).toFixed(0)} kbps`;
	return `${(bps / 1e6).toFixed(2)} Mbps`;
}
var COMMANDS = [
	{
		type: "GetVersion",
		group: "General",
		summary: "OBS build, platform, and websocket version"
	},
	{
		type: "GetStats",
		group: "General",
		summary: "CPU, FPS, memory, skipped frames"
	},
	{
		type: "GetSceneList",
		group: "Scenes",
		summary: "All scenes and the current program scene"
	},
	{
		type: "SetCurrentProgramScene",
		group: "Scenes",
		summary: "Cut the program bus to a scene",
		params: [{
			key: "sceneName",
			label: "Scene",
			kind: "string",
			optionsFrom: "scenes"
		}]
	},
	{
		type: "GetCurrentProgramScene",
		group: "Scenes",
		summary: "Name of the scene on program"
	},
	{
		type: "GetSceneItemList",
		group: "Sources",
		summary: "Items in a scene",
		params: [{
			key: "sceneName",
			label: "Scene",
			kind: "string",
			optionsFrom: "scenes"
		}]
	},
	{
		type: "SetSceneItemEnabled",
		group: "Sources",
		summary: "Show or hide a scene item",
		params: [
			{
				key: "sceneName",
				label: "Scene",
				kind: "string",
				optionsFrom: "scenes"
			},
			{
				key: "sceneItemId",
				label: "Item id",
				kind: "number"
			},
			{
				key: "sceneItemEnabled",
				label: "Enabled",
				kind: "boolean"
			}
		]
	},
	{
		type: "GetInputList",
		group: "Inputs",
		summary: "All inputs (audio and video)"
	},
	{
		type: "GetSpecialInputs",
		group: "Inputs",
		summary: "Desktop and mic special inputs"
	},
	{
		type: "SetInputMute",
		group: "Inputs",
		summary: "Mute or unmute an input",
		params: [{
			key: "inputName",
			label: "Input",
			kind: "string",
			optionsFrom: "inputs"
		}, {
			key: "inputMuted",
			label: "Muted",
			kind: "boolean"
		}]
	},
	{
		type: "ToggleInputMute",
		group: "Inputs",
		summary: "Flip mute on an input",
		params: [{
			key: "inputName",
			label: "Input",
			kind: "string",
			optionsFrom: "inputs"
		}]
	},
	{
		type: "SetInputVolume",
		group: "Inputs",
		summary: "Set input volume (multiplier 0–1)",
		params: [{
			key: "inputName",
			label: "Input",
			kind: "string",
			optionsFrom: "inputs"
		}, {
			key: "inputVolumeMul",
			label: "Volume mul",
			kind: "number"
		}]
	},
	{
		type: "GetStreamStatus",
		group: "Stream",
		summary: "Live state, timecode, bytes, skipped"
	},
	{
		type: "StartStream",
		group: "Stream",
		summary: "Go live"
	},
	{
		type: "StopStream",
		group: "Stream",
		summary: "End the stream"
	},
	{
		type: "ToggleStream",
		group: "Stream",
		summary: "Toggle streaming"
	},
	{
		type: "GetRecordStatus",
		group: "Record",
		summary: "Recording state and timecode"
	},
	{
		type: "StartRecord",
		group: "Record",
		summary: "Start recording"
	},
	{
		type: "StopRecord",
		group: "Record",
		summary: "Stop recording"
	},
	{
		type: "ToggleRecord",
		group: "Record",
		summary: "Toggle recording"
	},
	{
		type: "PauseRecord",
		group: "Record",
		summary: "Pause the recording"
	},
	{
		type: "ResumeRecord",
		group: "Record",
		summary: "Resume the recording"
	},
	{
		type: "GetVirtualCamStatus",
		group: "Virtual Cam",
		summary: "Virtual camera state"
	},
	{
		type: "StartVirtualCam",
		group: "Virtual Cam",
		summary: "Start the virtual camera"
	},
	{
		type: "StopVirtualCam",
		group: "Virtual Cam",
		summary: "Stop the virtual camera"
	},
	{
		type: "ToggleVirtualCam",
		group: "Virtual Cam",
		summary: "Toggle virtual camera"
	},
	{
		type: "GetStudioModeEnabled",
		group: "Studio",
		summary: "Whether studio mode is on"
	},
	{
		type: "SetStudioModeEnabled",
		group: "Studio",
		summary: "Enable or disable studio mode",
		params: [{
			key: "studioModeEnabled",
			label: "Enabled",
			kind: "boolean"
		}]
	},
	{
		type: "TriggerStudioModeTransition",
		group: "Studio",
		summary: "Cut preview to program"
	}
];
var COMMAND_GROUPS = [
	"General",
	"Scenes",
	"Sources",
	"Inputs",
	"Stream",
	"Record",
	"Virtual Cam",
	"Studio"
];
function cliFor(type, data, conn) {
	const args = Object.entries(data).filter(([, v]) => v !== "" && v !== void 0).map(([k, v]) => `${k}=${String(v)}`).join(" ");
	const base = `node obs-call.mjs --host ${conn.host} --port ${conn.port} --password ${conn.password} ${type}`;
	return args ? `${base} ${args}` : base;
}
var STORAGE_KEY = "stagehand.v1";
function uid() {
	return Math.random().toString(36).slice(2, 10);
}
function seedScenes() {
	return [
		{
			sceneName: "Starting Soon",
			sceneIndex: 0,
			items: [
				{
					id: "1",
					sourceName: "Backdrop",
					kind: "color",
					enabled: true
				},
				{
					id: "2",
					sourceName: "Title Card",
					kind: "text",
					enabled: true
				},
				{
					id: "3",
					sourceName: "Countdown",
					kind: "text",
					enabled: true
				},
				{
					id: "4",
					sourceName: "Idle Loop",
					kind: "browser",
					enabled: true
				}
			]
		},
		{
			sceneName: "Gameplay",
			sceneIndex: 1,
			items: [
				{
					id: "5",
					sourceName: "Game Capture",
					kind: "game",
					enabled: true
				},
				{
					id: "6",
					sourceName: "Webcam",
					kind: "camera",
					enabled: true
				},
				{
					id: "7",
					sourceName: "Overlay",
					kind: "overlay",
					enabled: true
				},
				{
					id: "8",
					sourceName: "Alerts",
					kind: "browser",
					enabled: true
				}
			]
		},
		{
			sceneName: "Just Chatting",
			sceneIndex: 2,
			items: [
				{
					id: "9",
					sourceName: "Backdrop",
					kind: "color",
					enabled: true
				},
				{
					id: "10",
					sourceName: "Webcam",
					kind: "camera",
					enabled: true
				},
				{
					id: "11",
					sourceName: "Chat",
					kind: "chat",
					enabled: true
				},
				{
					id: "12",
					sourceName: "Lower Third",
					kind: "lower",
					enabled: true
				}
			]
		},
		{
			sceneName: "Be Right Back",
			sceneIndex: 3,
			items: [
				{
					id: "13",
					sourceName: "Backdrop",
					kind: "color",
					enabled: true
				},
				{
					id: "14",
					sourceName: "BRB Card",
					kind: "text",
					enabled: true
				},
				{
					id: "15",
					sourceName: "Music Visual",
					kind: "browser",
					enabled: true
				}
			]
		},
		{
			sceneName: "Ending",
			sceneIndex: 4,
			items: [
				{
					id: "16",
					sourceName: "Backdrop",
					kind: "color",
					enabled: true
				},
				{
					id: "17",
					sourceName: "Thanks Card",
					kind: "text",
					enabled: true
				},
				{
					id: "18",
					sourceName: "Credits",
					kind: "text",
					enabled: true
				}
			]
		},
		{
			sceneName: "Intermission",
			sceneIndex: 5,
			items: [
				{
					id: "19",
					sourceName: "Backdrop",
					kind: "color",
					enabled: true
				},
				{
					id: "20",
					sourceName: "Break Card",
					kind: "text",
					enabled: true
				},
				{
					id: "21",
					sourceName: "Music Visual",
					kind: "browser",
					enabled: true
				}
			]
		}
	];
}
function seedInputs() {
	return [
		{
			inputName: "Mic/Aux",
			inputKind: "pulse_input_capture",
			inputMuted: false,
			inputVolumeMul: .82,
			special: "mic"
		},
		{
			inputName: "Desktop Audio",
			inputKind: "pulse_output_capture",
			inputMuted: false,
			inputVolumeMul: .64,
			special: "desktop"
		},
		{
			inputName: "Game Capture",
			inputKind: "xcomposite_input",
			inputMuted: false,
			inputVolumeMul: .7,
			special: "aux"
		},
		{
			inputName: "Music",
			inputKind: "ffmpeg_source",
			inputMuted: true,
			inputVolumeMul: .4,
			special: "aux"
		},
		{
			inputName: "Browser Source",
			inputKind: "browser_source",
			inputMuted: false,
			inputVolumeMul: .5,
			special: "aux"
		}
	];
}
var initialStream = () => ({
	outputActive: false,
	outputReconnecting: false,
	outputTimecodeMs: 0,
	outputDurationMs: 0,
	outputBytes: 0,
	outputSkippedFrames: 0,
	outputTotalFrames: 0,
	outputCongestion: 0
});
var initialRecord = () => ({
	outputActive: false,
	outputPaused: false,
	outputTimecodeMs: 0,
	outputDurationMs: 0,
	outputBytes: 0
});
var initialStats = () => ({
	cpuUsage: 4.2,
	memoryUsage: 612,
	activeFps: 60,
	averageFrameRenderTime: 2.4,
	renderSkippedFrames: 0,
	renderTotalFrames: 0,
	outputSkippedFrames: 0,
	outputTotalFrames: 0
});
var tickTimer = null;
var bootTimers = [];
function clearTimers() {
	if (tickTimer) {
		clearInterval(tickTimer);
		tickTimer = null;
	}
	for (const t of bootTimers) clearTimeout(t);
	bootTimers = [];
}
function pushEvent(events, e) {
	return [{
		id: uid(),
		at: Date.now(),
		...e
	}, ...events].slice(0, 80);
}
function fail(type, comment) {
	return {
		requestType: type,
		requestStatus: {
			result: false,
			code: 600,
			comment
		}
	};
}
function ok(type, responseData) {
	return {
		requestType: type,
		requestStatus: {
			result: true,
			code: 100
		},
		responseData
	};
}
function loadConnection() {
	if (typeof window === "undefined") return {
		host: "127.0.0.1",
		port: 4455,
		password: "stagehand"
	};
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return {
			host: "127.0.0.1",
			port: 4455,
			password: "stagehand"
		};
		const parsed = JSON.parse(raw);
		return {
			host: parsed.host || "127.0.0.1",
			port: parsed.port || 4455,
			password: parsed.password || "stagehand"
		};
	} catch {
		return {
			host: "127.0.0.1",
			port: 4455,
			password: "stagehand"
		};
	}
}
var useObs = create((set, get) => ({
	phase: "booting",
	bootLabel: "Allocating framebuffer",
	container: {
		xvfb: "starting",
		obs: "down",
		websocket: "down"
	},
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
		const connection = {
			...get().connection,
			...patch
		};
		set({ connection });
		if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(connection));
	},
	boot: () => {
		clearTimers();
		set({
			phase: "booting",
			bootLabel: "Allocating framebuffer",
			identified: false,
			container: {
				xvfb: "starting",
				obs: "down",
				websocket: "down"
			},
			events: pushEvent(get().events, {
				kind: "system",
				name: "container.start",
				detail: "docker compose up — display :99"
			})
		});
		const step = (ms, fn) => {
			bootTimers.push(setTimeout(fn, ms));
		};
		step(420, () => {
			set({
				bootLabel: "Xvfb :99 1920×1080×24",
				container: {
					xvfb: "up",
					obs: "starting",
					websocket: "down"
				},
				events: pushEvent(get().events, {
					kind: "system",
					name: "xvfb.ready",
					detail: "DISPLAY=:99"
				})
			});
		});
		step(980, () => {
			set({
				bootLabel: "Launching OBS Studio",
				container: {
					xvfb: "up",
					obs: "up",
					websocket: "starting"
				},
				events: pushEvent(get().events, {
					kind: "system",
					name: "obs.ready",
					detail: "obs-studio 30.2.3 linux"
				})
			});
		});
		step(1480, () => {
			set({
				bootLabel: "obs-websocket Identify",
				container: {
					xvfb: "up",
					obs: "up",
					websocket: "up"
				},
				events: pushEvent(get().events, {
					kind: "event",
					name: "Hello",
					detail: "op 0  rpcVersion=1  auth required"
				})
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
					detail: "op 2  negotiated rpc 1"
				})
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
			container: {
				xvfb: "down",
				obs: "down",
				websocket: "down"
			},
			stream: initialStream(),
			record: initialRecord(),
			virtualCam: false,
			events: pushEvent(get().events, {
				kind: "system",
				name: "container.stop",
				detail: "SIGTERM obs · xvfb"
			})
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
				events: pushEvent(pushEvent(state.events, {
					kind: "request",
					name: requestType,
					detail: JSON.stringify(requestData)
				}), {
					kind: "response",
					name: requestType,
					ok: false,
					detail: res.requestStatus.comment
				})
			});
			return res;
		}
		const res = dispatch(requestType, requestData, get, set);
		set((s) => ({
			lastResponse: res,
			events: pushEvent(pushEvent(s.events, {
				kind: "request",
				name: requestType,
				detail: Object.keys(requestData).length ? JSON.stringify(requestData) : void 0
			}), {
				kind: "response",
				name: requestType,
				ok: res.requestStatus.result,
				detail: res.requestStatus.result ? res.responseData ? JSON.stringify(res.responseData) : "ok" : res.requestStatus.comment
			})
		}));
		return res;
	}
}));
function startTick(set, get) {
	if (tickTimer) clearInterval(tickTimer);
	tickTimer = setInterval(() => {
		const s = get();
		if (s.phase !== "ready") return;
		const dt = 250;
		const jitter = () => (Math.random() - .5) * 2;
		const meters = {};
		for (const input of s.inputs) if (input.inputMuted) meters[input.inputName] = 0;
		else {
			const base = .18 + input.inputVolumeMul * .55;
			const liveBoost = s.stream.outputActive ? .12 : 0;
			meters[input.inputName] = Math.min(1, Math.max(.04, base + liveBoost + jitter() * .22));
		}
		const stream = { ...s.stream };
		if (stream.outputActive) {
			stream.outputTimecodeMs += dt;
			stream.outputDurationMs += dt;
			stream.outputBytes += 42e4 + Math.round(jitter() * 4e4);
			stream.outputTotalFrames += 15;
			if (Math.random() < .04) stream.outputSkippedFrames += 1;
			stream.outputCongestion = Math.max(0, .04 + jitter() * .05);
		}
		const record = { ...s.record };
		if (record.outputActive && !record.outputPaused) {
			record.outputTimecodeMs += dt;
			record.outputDurationMs += dt;
			record.outputBytes += 78e4 + Math.round(jitter() * 6e4);
		}
		const stats = { ...s.stats };
		const load = (stream.outputActive ? 18 : 6) + (record.outputActive ? 8 : 0);
		stats.cpuUsage = Math.min(48, Math.max(3, load + jitter() * 3));
		stats.memoryUsage = 580 + load * 4 + jitter() * 8;
		stats.activeFps = 60 - (Math.random() < .08 ? .4 : 0);
		stats.averageFrameRenderTime = 2.1 + load * .04 + jitter() * .3;
		stats.renderTotalFrames += 15;
		stats.outputTotalFrames = stream.outputTotalFrames;
		stats.outputSkippedFrames = stream.outputSkippedFrames;
		set({
			meters,
			stream,
			record,
			stats
		});
	}, 250);
}
function dispatch(type, data, get, set) {
	const s = get();
	switch (type) {
		case "GetVersion": return ok(type, {
			obsVersion: "30.2.3",
			obsWebSocketVersion: "5.5.2",
			rpcVersion: 1,
			availableRequests: COMMANDS.map((c) => c.type),
			platform: "linux",
			platformDescription: "Ubuntu 24.04 (Xvfb :99)"
		});
		case "GetStats": return ok(type, { ...s.stats });
		case "GetSceneList": return ok(type, {
			currentProgramSceneName: s.currentProgramScene,
			currentPreviewSceneName: s.currentPreviewScene,
			scenes: s.scenes.map((sc) => ({
				sceneName: sc.sceneName,
				sceneIndex: sc.sceneIndex
			}))
		});
		case "GetCurrentProgramScene": return ok(type, { sceneName: s.currentProgramScene });
		case "SetCurrentProgramScene": {
			const name = String(data.sceneName ?? "");
			if (!s.scenes.find((sc) => sc.sceneName === name)) return fail(type, `Scene not found: ${name}`);
			set({ currentProgramScene: name });
			set((cur) => ({ events: pushEvent(cur.events, {
				kind: "event",
				name: "CurrentProgramSceneChanged",
				detail: name
			}) }));
			return ok(type);
		}
		case "GetSceneItemList": {
			const name = String(data.sceneName ?? s.currentProgramScene);
			const scene = s.scenes.find((sc) => sc.sceneName === name);
			if (!scene) return fail(type, `Scene not found: ${name}`);
			return ok(type, { sceneItems: scene.items.map((it, i) => ({
				sceneItemId: Number(it.id),
				sourceName: it.sourceName,
				sceneItemEnabled: it.enabled,
				sceneItemIndex: i
			})) });
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
						return {
							...it,
							enabled
						};
					})
				};
			});
			if (!hit) return fail(type, `Scene item ${id} not in ${name}`);
			set({ scenes });
			return ok(type);
		}
		case "GetInputList": return ok(type, { inputs: s.inputs.map((i) => ({
			inputName: i.inputName,
			inputKind: i.inputKind,
			unversionedInputKind: i.inputKind
		})) });
		case "GetSpecialInputs": return ok(type, {
			desktop1: "Desktop Audio",
			desktop2: null,
			mic1: "Mic/Aux",
			mic2: null,
			mic3: null,
			mic4: null
		});
		case "SetInputMute": {
			const name = String(data.inputName ?? "");
			const muted = Boolean(data.inputMuted);
			if (!s.inputs.some((i) => i.inputName === name)) return fail(type, `Input not found: ${name}`);
			set({ inputs: s.inputs.map((i) => i.inputName === name ? {
				...i,
				inputMuted: muted
			} : i) });
			return ok(type);
		}
		case "ToggleInputMute": {
			const name = String(data.inputName ?? "");
			const input = s.inputs.find((i) => i.inputName === name);
			if (!input) return fail(type, `Input not found: ${name}`);
			const next = !input.inputMuted;
			set({ inputs: s.inputs.map((i) => i.inputName === name ? {
				...i,
				inputMuted: next
			} : i) });
			return ok(type, { inputMuted: next });
		}
		case "SetInputVolume": {
			const name = String(data.inputName ?? "");
			const mul = Number(data.inputVolumeMul);
			if (!s.inputs.some((i) => i.inputName === name)) return fail(type, `Input not found: ${name}`);
			if (Number.isNaN(mul)) return fail(type, "inputVolumeMul must be a number");
			set({ inputs: s.inputs.map((i) => i.inputName === name ? {
				...i,
				inputVolumeMul: Math.min(1, Math.max(0, mul))
			} : i) });
			return ok(type);
		}
		case "GetStreamStatus": return ok(type, {
			...s.stream,
			outputTimecode: formatProtoTime(s.stream.outputTimecodeMs)
		});
		case "StartStream":
			if (s.stream.outputActive) return fail(type, "Already streaming");
			set({ stream: {
				...s.stream,
				outputActive: true
			} });
			emit(set, "StreamStateChanged", "live");
			return ok(type);
		case "StopStream":
			if (!s.stream.outputActive) return fail(type, "Not streaming");
			set({ stream: {
				...s.stream,
				outputActive: false
			} });
			emit(set, "StreamStateChanged", "offline");
			return ok(type);
		case "ToggleStream": {
			const next = !s.stream.outputActive;
			set({ stream: {
				...s.stream,
				outputActive: next
			} });
			emit(set, "StreamStateChanged", next ? "live" : "offline");
			return ok(type, { outputActive: next });
		}
		case "GetRecordStatus": return ok(type, {
			...s.record,
			outputTimecode: formatProtoTime(s.record.outputTimecodeMs)
		});
		case "StartRecord":
			if (s.record.outputActive) return fail(type, "Already recording");
			set({ record: {
				...s.record,
				outputActive: true,
				outputPaused: false
			} });
			emit(set, "RecordStateChanged", "recording");
			return ok(type);
		case "StopRecord":
			if (!s.record.outputActive) return fail(type, "Not recording");
			set({ record: {
				...s.record,
				outputActive: false,
				outputPaused: false
			} });
			emit(set, "RecordStateChanged", "stopped");
			return ok(type, { outputPath: "/recordings/stagehand.mkv" });
		case "ToggleRecord": {
			const next = !s.record.outputActive;
			set({ record: {
				...s.record,
				outputActive: next,
				outputPaused: false
			} });
			emit(set, "RecordStateChanged", next ? "recording" : "stopped");
			return ok(type, { outputActive: next });
		}
		case "PauseRecord":
			if (!s.record.outputActive) return fail(type, "Not recording");
			if (s.record.outputPaused) return fail(type, "Already paused");
			set({ record: {
				...s.record,
				outputPaused: true
			} });
			return ok(type);
		case "ResumeRecord":
			if (!s.record.outputActive || !s.record.outputPaused) return fail(type, "Not paused");
			set({ record: {
				...s.record,
				outputPaused: false
			} });
			return ok(type);
		case "GetVirtualCamStatus": return ok(type, { outputActive: s.virtualCam });
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
		case "GetStudioModeEnabled": return ok(type, { studioModeEnabled: s.studioMode });
		case "SetStudioModeEnabled":
			set({ studioMode: Boolean(data.studioModeEnabled) });
			return ok(type);
		case "TriggerStudioModeTransition":
			if (!s.studioMode) return fail(type, "Studio mode is off");
			set({ currentProgramScene: s.currentPreviewScene });
			emit(set, "CurrentProgramSceneChanged", s.currentPreviewScene);
			return ok(type);
		default: return fail(type, `Unknown request type: ${type}`);
	}
}
function emit(set, name, detail) {
	set((s) => ({ events: pushEvent(s.events, {
		kind: "event",
		name,
		detail
	}) }));
}
function formatProtoTime(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	const h = Math.floor(total / 3600);
	const m = Math.floor(total % 3600 / 60);
	const s = total % 60;
	const frac = Math.floor(ms % 1e3 / 10);
	return `${[
		h,
		m,
		s
	].map((n) => String(n).padStart(2, "0")).join(":")}.${String(frac).padStart(2, "0")}`;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[scale,background-color,color,opacity,box-shadow] duration-150 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90",
			secondary: "bg-surface-2 text-fg shadow-hairline hover:bg-surface-2/80",
			outline: "bg-transparent text-fg shadow-hairline hover:bg-surface-2",
			ghost: "text-muted hover:text-fg hover:bg-surface-2",
			live: "bg-live text-fg hover:bg-live/90",
			quiet: "bg-live/15 text-live hover:bg-live/25"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var badgeVariants = cva("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-2xs font-medium tracking-wide uppercase", {
	variants: { variant: {
		default: "bg-surface-2 text-muted shadow-hairline",
		live: "bg-live/15 text-live",
		ready: "bg-ready/15 text-ready",
		warn: "bg-warn/15 text-warn",
		accent: "bg-accent/15 text-accent"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({
			variant,
			className
		})),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md bg-surface-2 px-3 text-sm text-fg shadow-hairline", "placeholder:text-subtle", "transition-[box-shadow,background-color] duration-150 ease-out", "focus-visible:shadow-hairline-strong focus-visible:outline-none", "disabled:cursor-not-allowed disabled:opacity-40", className),
		...props
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full shadow-hairline", "transition-[background-color] duration-150 ease-out", "data-[state=checked]:bg-accent data-[state=unchecked]:bg-surface-2", "disabled:cursor-not-allowed disabled:opacity-40", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block size-5 rounded-full bg-fg", "transition-transform duration-150 ease-out", "data-[state=checked]:translate-x-[22px] data-[state=unchecked]:translate-x-0.5", "data-[state=checked]:bg-accent-fg") })
	});
}
var Tabs = Root2;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("inline-flex h-11 items-center gap-0.5 rounded-lg bg-surface-2 p-1 shadow-hairline", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		className: cn("inline-flex h-9 items-center justify-center rounded-md px-3 text-xs font-medium text-muted", "transition-[background-color,color] duration-150 ease-out", "data-[state=active]:bg-surface data-[state=active]:text-fg data-[state=active]:shadow-hairline", "hover:text-fg", "disabled:pointer-events-none disabled:opacity-40", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("mt-3 outline-none", className),
		...props
	});
}
var CHAT = [
	{
		user: "mira",
		text: "that transition was clean"
	},
	{
		user: "oak",
		text: "audio sitting right"
	},
	{
		user: "len",
		text: "what overlay pack is that"
	},
	{
		user: "nori",
		text: "going live from a box. wild"
	},
	{
		user: "sol",
		text: "cut to chatting when you can"
	}
];
function itemOn(scene, kind) {
	return scene.items.some((i) => i.kind === kind && i.enabled);
}
function Backdrop() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_20%,color-mix(in_oklab,var(--color-accent)_18%,transparent),transparent_42%),radial-gradient(circle_at_80%_70%,color-mix(in_oklab,var(--color-fg)_6%,transparent),transparent_50%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:32px_32px]" })]
	});
}
function GameField() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 overflow-hidden bg-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-30 [background-image:linear-gradient(color-mix(in_oklab,var(--color-accent)_35%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--color-accent)_35%,transparent)_1px,transparent_1px)] [background-size:48px_48px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-accent/30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[18%] top-[28%] h-2 w-10 rounded-sm bg-fg/30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-[22%] top-[62%] h-2 w-14 rounded-sm bg-fg/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-6 left-6 font-mono text-micro tracking-widest text-accent/80",
				children: "CAPTURE · 1920×1080"
			})
		]
	});
}
function Camera$1({ large }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative overflow-hidden rounded-md bg-surface-2 shadow-hairline", large ? "h-full w-full" : "h-full w-full"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,color-mix(in_oklab,var(--color-accent)_28%,transparent),transparent_55%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-[38%] size-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-[72%] h-[38%] w-[70%] -translate-x-1/2 rounded-t-full bg-accent/15" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute left-2 top-2 font-mono text-micro tracking-widest text-muted",
				children: "CAM 1"
			})
		]
	});
}
function OverlayBar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-x-0 bottom-0 flex h-[14%] items-center gap-3 bg-bg/80 px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-2 rounded-full bg-live" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-2xs font-medium tracking-wide text-fg",
			children: "STAGEHAND"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-mono text-micro tracking-widest text-muted",
			children: "HEADLESS STUDIO"
		})] })]
	});
}
function LowerThird() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute bottom-[10%] left-[6%] overflow-hidden rounded-md bg-surface/90 px-3 py-2 shadow-hairline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs font-medium text-fg",
			children: "Director"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-mono text-micro tracking-wide text-muted",
			children: "obs-websocket · display :99"
		})]
	});
}
function ChatPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full flex-col justify-end gap-1.5 rounded-md bg-bg/55 p-2 shadow-hairline",
		children: CHAT.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-micro leading-snug",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-accent",
				children: c.user
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted",
				children: [" ", c.text]
			})]
		}, c.user))
	});
}
function TitleCard({ title, kicker }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 flex flex-col items-center justify-center gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-micro tracking-display text-muted",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-2xl font-medium tracking-tight text-fg sm:text-3xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-24 bg-accent/60" })
		]
	});
}
function SceneArt({ scene }) {
	const name = scene.sceneName;
	if (name === "Gameplay") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		itemOn(scene, "game") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameField, {}),
		!itemOn(scene, "game") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, {}),
		itemOn(scene, "camera") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute bottom-[16%] right-[4%] aspect-video w-[26%]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera$1, {})
		}),
		itemOn(scene, "overlay") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverlayBar, {}),
		itemOn(scene, "browser") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute right-3 top-3 rounded-full bg-live/90 px-2 py-0.5 font-mono text-micro tracking-widest text-fg",
			children: "ALERT"
		})
	] });
	if (name === "Just Chatting") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-3 flex gap-3",
			children: [itemOn(scene, "camera") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 flex-[1.4]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera$1, { large: true })
			}), itemOn(scene, "chat") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden w-[34%] sm:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPanel, {})
			})]
		}),
		itemOn(scene, "lower") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LowerThird, {})
	] });
	if (name === "Starting Soon") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, {}),
		itemOn(scene, "text") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleCard, {
			kicker: "PLEASE STAND BY",
			title: "Starting Soon"
		}),
		itemOn(scene, "browser") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute bottom-6 font-mono text-micro tracking-widest text-muted",
			children: "framebuffer live"
		})
	] });
	if (name === "Be Right Back") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, {}), itemOn(scene, "text") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleCard, {
		kicker: "HOLD",
		title: "Be Right Back"
	})] });
	if (name === "Ending") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, {}), itemOn(scene, "text") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleCard, {
		kicker: "END CARD",
		title: "Thanks for watching"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, {}), itemOn(scene, "text") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleCard, {
		kicker: "BREAK",
		title: "Intermission"
	})] });
}
function ProgramMonitor({ scene, live, recording, timecodeMs, label = "PGM" }) {
	const resolution = (0, import_react.useMemo)(() => "1920 × 1080", []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2 px-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-micro tracking-kicker text-muted",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-fg",
					children: scene?.sceneName ?? "—"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 font-mono text-micro tabular-nums text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: resolution }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTimecode(timecodeMs) })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-video overflow-hidden rounded-xl bg-surface shadow-hairline",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex items-center justify-center",
					children: scene ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneArt, { scene }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted",
						children: "No program"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pgm-scan h-1/3 w-full bg-gradient-to-b from-transparent via-fg to-transparent" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute left-3 top-3 flex gap-1.5",
					children: [live && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 rounded-full bg-live px-2 py-0.5 text-micro font-medium tracking-widest text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-dot size-1.5 rounded-full bg-fg" }), "LIVE"]
					}), recording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 rounded-full bg-fg/90 px-2 py-0.5 text-micro font-medium tracking-widest text-bg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-live" }), "REC"]
					})]
				})
			]
		})]
	});
}
function Slider({ className, ...props }) {
	const vertical = props.orientation === "vertical";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex touch-none select-none items-center", vertical ? "h-full w-6 flex-col" : "w-full h-6", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: cn("relative grow overflow-hidden rounded-full bg-surface-2 shadow-hairline", vertical ? "w-1.5 h-full" : "h-1.5 w-full"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: cn("absolute bg-accent", vertical ? "w-full" : "h-full") })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: cn("block size-4 rounded-full bg-fg shadow-hairline-strong", "transition-[box-shadow,scale] duration-150 ease-out", "focus-visible:outline-none focus-visible:scale-110", "disabled:pointer-events-none disabled:opacity-40") })]
	});
}
function Mixer() {
	const inputs = useObs((s) => s.inputs);
	const meters = useObs((s) => s.meters);
	const send = useObs((s) => s.send);
	const ready = useObs((s) => s.phase === "ready");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full min-h-[180px] gap-2 overflow-x-auto pb-1",
		children: inputs.map((input) => {
			const level = meters[input.inputName] ?? 0;
			const Icon = input.special === "mic" ? input.inputMuted ? MicOff : Mic : input.inputMuted ? VolumeX : Volume2;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-[72px] shrink-0 flex-col items-center gap-2 rounded-xl bg-surface p-2 shadow-hairline",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative h-28 w-7 overflow-hidden rounded-md bg-surface-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("absolute inset-x-0 bottom-0 origin-bottom rounded-sm transition-[height,background-color] duration-150 ease-out", input.inputMuted ? "bg-subtle" : level > .86 ? "bg-live" : "bg-ready"),
							style: { height: `${Math.round(level * 100)}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						orientation: "vertical",
						className: "h-24",
						disabled: !ready,
						min: 0,
						max: 100,
						value: [Math.round(input.inputVolumeMul * 100)],
						onValueChange: ([v]) => send("SetInputVolume", {
							inputName: input.inputName,
							inputVolumeMul: (v ?? 0) / 100
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "icon",
						variant: input.inputMuted ? "quiet" : "secondary",
						disabled: !ready,
						"aria-label": input.inputMuted ? `Unmute ${input.inputName}` : `Mute ${input.inputName}`,
						onClick: () => send("ToggleInputMute", { inputName: input.inputName }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full truncate text-center text-micro leading-tight text-muted",
						children: input.inputName
					})
				]
			}, input.inputName);
		})
	});
}
function ConsolePanel() {
	const send = useObs((s) => s.send);
	const last = useObs((s) => s.lastResponse);
	const scenes = useObs((s) => s.scenes);
	const inputs = useObs((s) => s.inputs);
	const connection = useObs((s) => s.connection);
	const ready = useObs((s) => s.phase === "ready");
	const [type, setType] = (0, import_react.useState)("GetVersion");
	const [fields, setFields] = (0, import_react.useState)({});
	const def = COMMANDS.find((c) => c.type === type) ?? COMMANDS[0];
	const data = (0, import_react.useMemo)(() => {
		const out = {};
		for (const p of def.params ?? []) {
			const raw = fields[p.key];
			if (raw === void 0 || raw === "") continue;
			if (p.kind === "boolean") out[p.key] = raw === "true";
			else if (p.kind === "number") out[p.key] = Number(raw);
			else out[p.key] = raw;
		}
		return out;
	}, [def, fields]);
	const cli = cliFor(type, data, connection);
	const requestJson = JSON.stringify({
		op: 6,
		d: {
			requestType: type,
			requestId: "…",
			requestData: Object.keys(data).length ? data : void 0
		}
	}, null, 2);
	function optionsFor(from) {
		if (from === "scenes") return scenes.map((s) => s.sceneName);
		if (from === "inputs") return inputs.map((i) => i.inputName);
		return null;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xs font-medium tracking-wide text-muted uppercase",
						children: "Request"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "h-11 rounded-md bg-surface-2 px-3 text-sm text-fg shadow-hairline",
						value: type,
						onChange: (e) => {
							setType(e.target.value);
							setFields({});
						},
						children: COMMAND_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
							label: g,
							children: COMMANDS.filter((c) => c.group === g).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.type,
								children: c.type
							}, c.type))
						}, g))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: def.summary
				}),
				(def.params ?? []).map((p) => {
					const opts = optionsFor(p.optionsFrom);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xs font-medium tracking-wide text-muted uppercase",
							children: p.label
						}), opts ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "h-11 rounded-md bg-surface-2 px-3 text-sm text-fg shadow-hairline",
							value: fields[p.key] ?? "",
							onChange: (e) => setFields((f) => ({
								...f,
								[p.key]: e.target.value
							})),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}), opts.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: o,
								children: o
							}, o))]
						}) : p.kind === "boolean" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "h-11 rounded-md bg-surface-2 px-3 text-sm text-fg shadow-hairline",
							value: fields[p.key] ?? "",
							onChange: (e) => setFields((f) => ({
								...f,
								[p.key]: e.target.value
							})),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "true",
									children: "true"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "false",
									children: "false"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: fields[p.key] ?? "",
							inputMode: p.kind === "number" ? "decimal" : "text",
							placeholder: p.placeholder ?? p.key,
							onChange: (e) => setFields((f) => ({
								...f,
								[p.key]: e.target.value
							}))
						})]
					}, p.key);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					disabled: !ready,
					onClick: () => {
						const res = send(type, data);
						toast(res.requestStatus.result ? `${type} ok` : `${type} failed`);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), "Send request"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
					title: "obs-websocket v5",
					value: requestJson
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
					title: "External script",
					value: cli
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
					title: "Response",
					value: last ? JSON.stringify(last, null, 2) : "No request yet.",
					tone: last && !last.requestStatus.result ? "bad" : "ok"
				})
			]
		})]
	});
}
function CodeBlock({ title, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 rounded-xl bg-surface p-3 shadow-hairline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-2xs font-medium tracking-wide text-muted uppercase",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "icon-sm",
				variant: "ghost",
				"aria-label": `Copy ${title}`,
				onClick: async () => {
					await navigator.clipboard.writeText(value);
					toast("Copied");
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: cn("max-h-48 overflow-auto font-mono text-2xs leading-relaxed text-muted", tone === "bad" && "text-live"),
			children: value
		})]
	});
}
var STACK_FILES = [
	{
		name: "Dockerfile",
		language: "docker",
		body: `# Headless OBS Studio — Xvfb display + bundled obs-websocket (OBS 28+)
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive \\
    DISPLAY=:99 \\
    WIDTH=1920 \\
    HEIGHT=1080 \\
    DEPTH=24 \\
    OBS_PORT=4455 \\
    OBS_PASSWORD=stagehand \\
    ENABLE_VNC=0

RUN apt-get update && apt-get install -y --no-install-recommends \\
      ca-certificates curl gnupg software-properties-common \\
    && add-apt-repository -y ppa:obsproject/obs-studio \\
    && apt-get update && apt-get install -y --no-install-recommends \\
      obs-studio xvfb x11vnc ffmpeg \\
    && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 4455 5900
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
`
	},
	{
		name: "entrypoint.sh",
		language: "bash",
		body: `#!/bin/sh
# Bring up a virtual framebuffer, then OBS with websocket on OBS_PORT.
set -eu

WIDTH="\${WIDTH:-1920}"
HEIGHT="\${HEIGHT:-1080}"
DEPTH="\${DEPTH:-24}"
OBS_PORT="\${OBS_PORT:-4455}"
OBS_PASSWORD="\${OBS_PASSWORD:-stagehand}"

echo "[stagehand] Xvfb :99 \${WIDTH}x\${HEIGHT}x\${DEPTH}"
Xvfb :99 -screen 0 "\${WIDTH}x\${HEIGHT}x\${DEPTH}" -ac +extension GLX +render -noreset &
sleep 1

if [ "\${ENABLE_VNC:-0}" = "1" ]; then
  echo "[stagehand] x11vnc on 5900 (debug only)"
  x11vnc -display :99 -forever -shared -rfbport 5900 -nopw &
fi

echo "[stagehand] OBS websocket ws://0.0.0.0:\${OBS_PORT}"
exec obs \\
  --disable-shutdown-check \\
  --websocket_port "\${OBS_PORT}" \\
  --websocket_password "\${OBS_PASSWORD}" \\
  "\$@"
`
	},
	{
		name: "docker-compose.yml",
		language: "yaml",
		body: `services:
  obs:
    build: .
    container_name: stagehand-obs
    restart: unless-stopped
    environment:
      WIDTH: "1920"
      HEIGHT: "1080"
      DEPTH: "24"
      OBS_PORT: "4455"
      OBS_PASSWORD: "stagehand"
      ENABLE_VNC: "0"
    ports:
      - "4455:4455"
      # - "5900:5900"   # uncomment with ENABLE_VNC=1 to peek at the framebuffer
    shm_size: "256mb"
    tmpfs:
      - /tmp
`
	},
	{
		name: "obs-call.mjs",
		language: "javascript",
		body: `#!/usr/bin/env node
/**
 * Call a headless OBS container over obs-websocket v5.
 *
 *   node obs-call.mjs --host 127.0.0.1 --port 4455 --password stagehand GetVersion
 *   node obs-call.mjs SetCurrentProgramScene sceneName=Gameplay
 *   node obs-call.mjs StartStream
 *   node obs-call.mjs SetInputMute inputName=Mic/Aux inputMuted=true
 *
 * Node 22+ (global WebSocket). No extra packages.
 */
import { createHash } from "node:crypto";

const args = process.argv.slice(2);
const flags = { host: "127.0.0.1", port: "4455", password: "stagehand" };
const rest = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--host") flags.host = args[++i];
  else if (a === "--port") flags.port = args[++i];
  else if (a === "--password") flags.password = args[++i];
  else rest.push(a);
}

const requestType = rest.shift();
if (!requestType) {
  console.error("usage: obs-call.mjs [--host --port --password] RequestType key=value ...");
  process.exit(1);
}

const requestData = {};
for (const pair of rest) {
  const eq = pair.indexOf("=");
  if (eq < 1) continue;
  const key = pair.slice(0, eq);
  let value = pair.slice(eq + 1);
  if (value === "true") value = true;
  else if (value === "false") value = false;
  else if (value !== "" && !Number.isNaN(Number(value))) value = Number(value);
  requestData[key] = value;
}

function sha256b64(s) {
  return createHash("sha256").update(s).digest("base64");
}

const url = \`ws://\${flags.host}:\${flags.port}\`;
const ws = new WebSocket(url);
const requestId = crypto.randomUUID();

ws.addEventListener("error", (err) => {
  console.error("websocket error", err.message ?? err);
  process.exit(2);
});

ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(String(ev.data));
  if (msg.op === 0) {
    const { authentication } = msg.d;
    const identify = { op: 1, d: { rpcVersion: 1, eventSubscriptions: 0 } };
    if (authentication) {
      const secret = sha256b64(flags.password + authentication.salt);
      identify.d.authentication = sha256b64(secret + authentication.challenge);
    }
    ws.send(JSON.stringify(identify));
    return;
  }
  if (msg.op === 2) {
    ws.send(
      JSON.stringify({
        op: 6,
        d: {
          requestType,
          requestId,
          requestData: Object.keys(requestData).length ? requestData : undefined,
        },
      }),
    );
    return;
  }
  if (msg.op === 7 && msg.d.requestId === requestId) {
    const out = {
      requestType: msg.d.requestType,
      requestStatus: msg.d.requestStatus,
      responseData: msg.d.responseData ?? null,
    };
    console.log(JSON.stringify(out, null, 2));
    ws.close();
    process.exit(msg.d.requestStatus?.result ? 0 : 3);
  }
});
`
	}
];
var STACK_README = `Stagehand talks obs-websocket v5 — the same protocol OBS 28+ exposes
inside this container.

1. Build and run the studio
   docker compose up --build -d

2. From any machine that can reach port 4455
   node obs-call.mjs GetVersion
   node obs-call.mjs SetCurrentProgramScene sceneName="Gameplay"
   node obs-call.mjs StartStream

Xvfb owns DISPLAY=:99 so OBS never needs a physical monitor.
obs-websocket is compiled into OBS 28+; no extra plugin.
`;
function StackPanel() {
	const [active, setActive] = (0, import_react.useState)(STACK_FILES[0].name);
	const file = STACK_FILES.find((f) => f.name === active) ?? STACK_FILES[0];
	function download(name, body) {
		const blob = new Blob([body], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = name;
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-sm leading-relaxed text-muted whitespace-pre-wrap",
				children: STACK_README
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: STACK_FILES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setActive(f.name),
					className: cn("h-9 rounded-md px-3 text-xs font-medium transition-[background-color,color] duration-150 ease-out", f.name === active ? "bg-surface-2 text-fg shadow-hairline" : "text-muted hover:text-fg"),
					children: f.name
				}, f.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface p-3 shadow-hairline sm:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-muted",
						children: file.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							onClick: async () => {
								await navigator.clipboard.writeText(file.body);
								toast(`Copied ${file.name}`);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), "Copy"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							variant: "secondary",
							onClick: () => download(file.name, file.body),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Download"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "max-h-96 overflow-auto font-mono text-2xs leading-relaxed text-muted",
					children: file.body
				})]
			})
		]
	});
}
function statusTone(s) {
	if (s === "up") return "text-ready";
	if (s === "starting") return "text-warn";
	return "text-subtle";
}
function ControlRoom() {
	const boot = useObs((s) => s.boot);
	const stop = useObs((s) => s.stop);
	const restart = useObs((s) => s.restart);
	const phase = useObs((s) => s.phase);
	const bootLabel = useObs((s) => s.bootLabel);
	(0, import_react.useEffect)(() => {
		const current = useObs.getState().phase;
		if (current === "ready" || current === "stopped") return;
		boot();
	}, [boot]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}), phase === "booting" || phase === "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, { label: bootLabel }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-4 py-4 pb-10 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusStrip, {}),
				phase === "stopped" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-4 rounded-2xl bg-surface px-6 py-16 text-center shadow-hairline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Container is stopped. Xvfb, OBS, and the websocket are down."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: boot,
						children: "Start container"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Deck, {}),
				phase === "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: stop,
						children: "Stop container"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: restart,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), "Restart"]
					})]
				})
			]
		})]
	});
}
function TopBar() {
	const live = useObs((s) => s.stream.outputActive);
	const rec = useObs((s) => s.record.outputActive);
	const paused = useObs((s) => s.record.outputPaused);
	const identified = useObs((s) => s.identified);
	const streamMs = useObs((s) => s.stream.outputTimecodeMs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-20 border-b border-border bg-bg/90",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium tracking-tight text-fg",
					children: "Stagehand"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden text-xs text-muted sm:inline",
					children: "Headless OBS control"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					live && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "live",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-dot size-1.5 rounded-full bg-live" }),
							"Live ",
							formatTimecode(streamMs)
						]
					}),
					rec && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: paused ? "warn" : "live",
						children: paused ? "Rec paused" : "Rec"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: identified ? "ready" : "default",
						children: identified ? "Identified" : "Offline"
					})
				]
			})]
		})
	});
}
function BootScreen({ label }) {
	const container = useObs((s) => s.container);
	const rows = [
		{
			key: "xvfb",
			name: "Xvfb",
			detail: "DISPLAY=:99  1920×1080×24",
			state: container.xvfb
		},
		{
			key: "obs",
			name: "OBS Studio",
			detail: "30.2.3  linux  software encode",
			state: container.obs
		},
		{
			key: "ws",
			name: "obs-websocket",
			detail: "v5.5.2  :4455  Identify",
			state: container.websocket
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-[calc(100dvh-3.5rem)] w-full max-w-lg flex-col justify-center gap-8 px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "boot-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xs tracking-display text-muted",
					children: "STAGEHAND"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-3xl font-medium tracking-tight text-fg",
					children: "Bringing up the studio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: label
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-2",
			children: rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "boot-row flex items-center justify-between rounded-xl bg-surface px-4 py-3 shadow-hairline",
				style: { animationDelay: `${i * 80}ms` },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-fg",
					children: row.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-2xs text-muted",
					children: row.detail
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("font-mono text-2xs tracking-wide uppercase", statusTone(row.state)),
					children: row.state
				})]
			}, row.key))
		})]
	});
}
function StatusStrip() {
	const container = useObs((s) => s.container);
	const stats = useObs((s) => s.stats);
	const connection = useObs((s) => s.connection);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl bg-surface px-4 py-2.5 font-mono text-2xs text-muted shadow-hairline",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: statusTone(container.xvfb),
				children: ["xvfb ", container.xvfb]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: statusTone(container.obs),
				children: ["obs ", container.obs]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: statusTone(container.websocket),
				children: [
					"ws ",
					connection.host,
					":",
					connection.port,
					" ",
					container.websocket
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "tabular-nums",
				children: [
					"cpu ",
					stats.cpuUsage.toFixed(1),
					"%"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "tabular-nums",
				children: ["fps ", stats.activeFps.toFixed(1)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "tabular-nums",
				children: [
					"mem ",
					Math.round(stats.memoryUsage),
					" MB"
				]
			})
		]
	});
}
function Deck() {
	const scenes = useObs((s) => s.scenes);
	const current = useObs((s) => s.currentProgramScene);
	const scene = scenes.find((s) => s.sceneName === current);
	const stream = useObs((s) => s.stream);
	const record = useObs((s) => s.record);
	const send = useObs((s) => s.send);
	const ready = useObs((s) => s.phase === "ready");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramMonitor, {
					scene,
					live: stream.outputActive,
					recording: record.outputActive,
					timecodeMs: stream.outputActive ? stream.outputTimecodeMs : record.outputTimecodeMs
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transport, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "scenes",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "scenes",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }), "Scenes"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "mixer",
									children: "Mixer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "console",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-3.5" }), "Console"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "stack",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "size-3.5" }), "Stack"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "log",
									children: "Log"
								})
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "scenes",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneAndSources, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "mixer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mixer, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "console",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsolePanel, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "stack",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StackPanel, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "log",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventLog, {})
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutputsCard, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectionCard, {}),
				ready && scene && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden rounded-2xl bg-surface p-3 shadow-hairline lg:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 px-1 text-2xs font-medium tracking-wide text-muted uppercase",
						children: "Sources"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceList, {
						sceneName: scene.sceneName,
						items: scene.items,
						send
					})]
				})
			]
		})]
	});
}
function Transport() {
	const send = useObs((s) => s.send);
	const stream = useObs((s) => s.stream);
	const record = useObs((s) => s.record);
	const virtualCam = useObs((s) => s.virtualCam);
	const ready = useObs((s) => s.phase === "ready");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: stream.outputActive ? "live" : "secondary",
				disabled: !ready,
				onClick: () => {
					send("ToggleStream");
					toast(stream.outputActive ? "Stream stopped" : "Stream started");
				},
				children: [stream.outputActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {}), stream.outputActive ? "End stream" : "Go live"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: record.outputActive ? "quiet" : "secondary",
				disabled: !ready,
				onClick: () => {
					send("ToggleRecord");
					toast(record.outputActive ? "Recording stopped" : "Recording started");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: cn(record.outputActive && "fill-live text-live") }), record.outputActive ? "Stop rec" : "Record"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "secondary",
				disabled: !ready || !record.outputActive,
				onClick: () => send(record.outputPaused ? "ResumeRecord" : "PauseRecord"),
				children: record.outputPaused ? "Resume rec" : "Pause rec"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: virtualCam ? "outline" : "secondary",
				disabled: !ready,
				onClick: () => send("ToggleVirtualCam"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {}), virtualCam ? "Cam on" : "Virtual cam"]
			})
		]
	});
}
function SceneAndSources() {
	const scenes = useObs((s) => s.scenes);
	const current = useObs((s) => s.currentProgramScene);
	const send = useObs((s) => s.send);
	const ready = useObs((s) => s.phase === "ready");
	const scene = scenes.find((s) => s.sceneName === current);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2 overflow-x-auto pb-1",
			children: scenes.map((sc) => {
				const active = sc.sceneName === current;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !ready,
					onClick: () => send("SetCurrentProgramScene", { sceneName: sc.sceneName }),
					className: cn("h-11 shrink-0 rounded-lg px-4 text-sm font-medium transition-[background-color,color,box-shadow] duration-150 ease-out", active ? "bg-accent text-accent-fg" : "bg-surface text-muted shadow-hairline hover:text-fg"),
					children: sc.sceneName
				}, sc.sceneName);
			})
		}), scene && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl bg-surface p-3 shadow-hairline lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceList, {
				sceneName: scene.sceneName,
				items: scene.items,
				send
			})
		})]
	});
}
function SourceList({ sceneName, items, send }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-1",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => send("SetSceneItemEnabled", {
				sceneName,
				sceneItemId: Number(item.id),
				sceneItemEnabled: !item.enabled
			}),
			className: "flex h-11 w-full items-center justify-between gap-2 rounded-lg px-2 text-left text-sm transition-[background-color] duration-150 ease-out hover:bg-surface-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("truncate", item.enabled ? "text-fg" : "text-subtle"),
				children: item.sourceName
			}), item.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4 text-muted" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4 text-subtle" })]
		}) }, item.id))
	});
}
function OutputsCard() {
	const stream = useObs((s) => s.stream);
	const record = useObs((s) => s.record);
	const stats = useObs((s) => s.stats);
	const bitrate = stream.outputActive ? stream.outputBytes / Math.max(1, stream.outputDurationMs / 1e3) * 8 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface p-4 shadow-hairline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center gap-2 text-2xs font-medium tracking-wide text-muted uppercase",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorPlay, { className: "size-3.5" }), "Outputs"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "grid grid-cols-2 gap-x-3 gap-y-2 font-mono text-xs tabular-nums",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-subtle",
					children: "Stream"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-fg",
					children: stream.outputActive ? formatTimecode(stream.outputTimecodeMs) : "idle"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-subtle",
					children: "Bitrate"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-fg",
					children: stream.outputActive ? formatBitrate(bitrate) : "—"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-subtle",
					children: "Record"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
					className: "text-fg",
					children: [record.outputActive ? formatTimecode(record.outputTimecodeMs) : "idle", record.outputPaused ? " paused" : ""]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-subtle",
					children: "Disk"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-fg",
					children: record.outputActive ? formatBytes(record.outputBytes) : "—"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-subtle",
					children: "Dropped"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
					className: "text-fg",
					children: [
						stream.outputSkippedFrames,
						"/",
						Math.max(stream.outputTotalFrames, 1)
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-subtle",
					children: "Render"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
					className: "text-fg",
					children: [stats.averageFrameRenderTime.toFixed(2), " ms"]
				})] })
			]
		})]
	});
}
function ConnectionCard() {
	const connection = useObs((s) => s.connection);
	const setConnection = useObs((s) => s.setConnection);
	const studioMode = useObs((s) => s.studioMode);
	const send = useObs((s) => s.send);
	const [host, setHost] = (0, import_react.useState)(connection.host);
	const [port, setPort] = (0, import_react.useState)(String(connection.port));
	const [password, setPassword] = (0, import_react.useState)(connection.password);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface p-4 shadow-hairline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-3 text-2xs font-medium tracking-wide text-muted uppercase",
			children: "Websocket"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: host,
					onChange: (e) => setHost(e.target.value),
					"aria-label": "Host",
					placeholder: "Host"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: port,
					onChange: (e) => setPort(e.target.value),
					"aria-label": "Port",
					placeholder: "Port"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "password",
					value: password,
					onChange: (e) => setPassword(e.target.value),
					"aria-label": "Password",
					placeholder: "Password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					size: "sm",
					onClick: () => {
						setConnection({
							host,
							port: Number(port) || 4455,
							password
						});
						toast("Connection saved for obs-call.mjs");
					},
					children: "Save for scripts"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex h-11 items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: "Studio mode"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: studioMode,
						onCheckedChange: (v) => send("SetStudioModeEnabled", { studioModeEnabled: v }),
						"aria-label": "Studio mode"
					})]
				})
			]
		})]
	});
}
function EventLog() {
	const events = useObs((s) => s.events);
	if (events.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "No protocol traffic yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex max-h-96 flex-col gap-1 overflow-auto rounded-xl bg-surface p-2 shadow-hairline",
		children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex gap-3 rounded-lg px-2 py-2 font-mono text-2xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-14 shrink-0 text-subtle",
					children: e.kind
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("shrink-0", e.ok === false ? "text-live" : "text-fg"),
					children: e.name
				}),
				e.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 truncate text-muted",
					children: e.detail
				})
			]
		}, e.id))
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRoom, {});
}
//#endregion
export { Home as component };
