import { useEffect, useState } from "react";
import {
  Camera,
  Circle,
  Eye,
  EyeOff,
  Layers,
  MonitorPlay,
  Radio,
  RotateCcw,
  Square,
  Terminal,
  Box,
} from "lucide-react";
import { toast } from "sonner";
import { useObs } from "@/lib/obs/store";
import { cn, formatBitrate, formatBytes, formatTimecode } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgramMonitor } from "./program-monitor";
import { Mixer } from "./mixer";
import { ConsolePanel } from "./console-panel";
import { StackPanel } from "./stack-panel";

function statusTone(s: "down" | "starting" | "up") {
  if (s === "up") return "text-ready";
  if (s === "starting") return "text-warn";
  return "text-subtle";
}

export function ControlRoom() {
  const boot = useObs((s) => s.boot);
  const stop = useObs((s) => s.stop);
  const restart = useObs((s) => s.restart);
  const phase = useObs((s) => s.phase);
  const bootLabel = useObs((s) => s.bootLabel);

  useEffect(() => {
    const current = useObs.getState().phase;
    if (current === "ready" || current === "stopped") return;
    boot();
  }, [boot]);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <TopBar />
      {phase === "booting" || phase === "idle" ? (
        <BootScreen label={bootLabel} />
      ) : (
        <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-4 py-4 pb-10 sm:px-6">
          <StatusStrip />
          {phase === "stopped" ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-surface px-6 py-16 text-center shadow-hairline">
              <p className="text-sm text-muted">Container is stopped. Xvfb, OBS, and the websocket are down.</p>
              <Button type="button" onClick={boot}>
                Start container
              </Button>
            </div>
          ) : (
            <Deck />
          )}
          {phase === "ready" && (
            <div className="flex justify-end">
              <Button type="button" variant="ghost" size="sm" onClick={stop}>
                Stop container
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={restart}>
                <RotateCcw />
                Restart
              </Button>
            </div>
          )}
        </main>
      )}
    </div>
  );
}

function TopBar() {
  const live = useObs((s) => s.stream.outputActive);
  const rec = useObs((s) => s.record.outputActive);
  const paused = useObs((s) => s.record.outputPaused);
  const identified = useObs((s) => s.identified);
  const streamMs = useObs((s) => s.stream.outputTimecodeMs);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/90">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="font-medium tracking-tight text-fg">Stagehand</span>
          <span className="hidden text-xs text-muted sm:inline">Headless OBS control</span>
        </div>
        <div className="flex items-center gap-2">
          {live && (
            <Badge variant="live">
              <span className="live-dot size-1.5 rounded-full bg-live" />
              Live {formatTimecode(streamMs)}
            </Badge>
          )}
          {rec && <Badge variant={paused ? "warn" : "live"}>{paused ? "Rec paused" : "Rec"}</Badge>}
          <Badge variant={identified ? "ready" : "default"}>{identified ? "Identified" : "Offline"}</Badge>
        </div>
      </div>
    </header>
  );
}

function BootScreen({ label }: { label: string }) {
  const container = useObs((s) => s.container);
  const rows = [
    { key: "xvfb", name: "Xvfb", detail: "DISPLAY=:99  1920×1080×24", state: container.xvfb },
    { key: "obs", name: "OBS Studio", detail: "30.2.3  linux  software encode", state: container.obs },
    { key: "ws", name: "obs-websocket", detail: "v5.5.2  :4455  Identify", state: container.websocket },
  ] as const;

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] w-full max-w-lg flex-col justify-center gap-8 px-6">
      <div className="boot-row">
        <p className="font-mono text-2xs tracking-display text-muted">STAGEHAND</p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight text-fg">Bringing up the studio</h1>
        <p className="mt-2 text-sm text-muted">{label}</p>
      </div>
      <ul className="flex flex-col gap-2">
        {rows.map((row, i) => (
          <li
            key={row.key}
            className="boot-row flex items-center justify-between rounded-xl bg-surface px-4 py-3 shadow-hairline"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div>
              <div className="text-sm text-fg">{row.name}</div>
              <div className="font-mono text-2xs text-muted">{row.detail}</div>
            </div>
            <span className={cn("font-mono text-2xs tracking-wide uppercase", statusTone(row.state))}>
              {row.state}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusStrip() {
  const container = useObs((s) => s.container);
  const stats = useObs((s) => s.stats);
  const connection = useObs((s) => s.connection);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl bg-surface px-4 py-2.5 font-mono text-2xs text-muted shadow-hairline">
      <span className={statusTone(container.xvfb)}>xvfb {container.xvfb}</span>
      <span className={statusTone(container.obs)}>obs {container.obs}</span>
      <span className={statusTone(container.websocket)}>
        ws {connection.host}:{connection.port} {container.websocket}
      </span>
      <span className="tabular-nums">cpu {stats.cpuUsage.toFixed(1)}%</span>
      <span className="tabular-nums">fps {stats.activeFps.toFixed(1)}</span>
      <span className="tabular-nums">mem {Math.round(stats.memoryUsage)} MB</span>
    </div>
  );
}

function Deck() {
  const scenes = useObs((s) => s.scenes);
  const current = useObs((s) => s.currentProgramScene);
  const scene = scenes.find((s) => s.sceneName === current);
  const stream = useObs((s) => s.stream);
  const record = useObs((s) => s.record);
  const send = useObs((s) => s.send);
  const ready = useObs((s) => s.phase === "ready");

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex min-w-0 flex-col gap-4">
        <ProgramMonitor
          scene={scene}
          live={stream.outputActive}
          recording={record.outputActive}
          timecodeMs={stream.outputActive ? stream.outputTimecodeMs : record.outputTimecodeMs}
        />
        <Transport />
        <Tabs defaultValue="scenes">
          <div className="overflow-x-auto">
            <TabsList>
              <TabsTrigger value="scenes">
                <Layers className="size-3.5" />
                Scenes
              </TabsTrigger>
              <TabsTrigger value="mixer">Mixer</TabsTrigger>
              <TabsTrigger value="console">
                <Terminal className="size-3.5" />
                Console
              </TabsTrigger>
              <TabsTrigger value="stack">
                <Box className="size-3.5" />
                Stack
              </TabsTrigger>
              <TabsTrigger value="log">Log</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="scenes">
            <SceneAndSources />
          </TabsContent>
          <TabsContent value="mixer">
            <Mixer />
          </TabsContent>
          <TabsContent value="console">
            <ConsolePanel />
          </TabsContent>
          <TabsContent value="stack">
            <StackPanel />
          </TabsContent>
          <TabsContent value="log">
            <EventLog />
          </TabsContent>
        </Tabs>
      </div>
      <aside className="flex flex-col gap-4">
        <OutputsCard />
        <ConnectionCard />
        {ready && scene && (
          <div className="hidden rounded-2xl bg-surface p-3 shadow-hairline lg:block">
            <div className="mb-2 px-1 text-2xs font-medium tracking-wide text-muted uppercase">Sources</div>
            <SourceList sceneName={scene.sceneName} items={scene.items} send={send} />
          </div>
        )}
      </aside>
    </div>
  );
}

function Transport() {
  const send = useObs((s) => s.send);
  const stream = useObs((s) => s.stream);
  const record = useObs((s) => s.record);
  const virtualCam = useObs((s) => s.virtualCam);
  const ready = useObs((s) => s.phase === "ready");

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <Button
        type="button"
        variant={stream.outputActive ? "live" : "secondary"}
        disabled={!ready}
        onClick={() => {
          send("ToggleStream");
          toast(stream.outputActive ? "Stream stopped" : "Stream started");
        }}
      >
        {stream.outputActive ? <Square /> : <Radio />}
        {stream.outputActive ? "End stream" : "Go live"}
      </Button>
      <Button
        type="button"
        variant={record.outputActive ? "quiet" : "secondary"}
        disabled={!ready}
        onClick={() => {
          send("ToggleRecord");
          toast(record.outputActive ? "Recording stopped" : "Recording started");
        }}
      >
        <Circle className={cn(record.outputActive && "fill-live text-live")} />
        {record.outputActive ? "Stop rec" : "Record"}
      </Button>
      <Button
        type="button"
        variant="secondary"
        disabled={!ready || !record.outputActive}
        onClick={() => send(record.outputPaused ? "ResumeRecord" : "PauseRecord")}
      >
        {record.outputPaused ? "Resume rec" : "Pause rec"}
      </Button>
      <Button
        type="button"
        variant={virtualCam ? "outline" : "secondary"}
        disabled={!ready}
        onClick={() => send("ToggleVirtualCam")}
      >
        <Camera />
        {virtualCam ? "Cam on" : "Virtual cam"}
      </Button>
    </div>
  );
}

function SceneAndSources() {
  const scenes = useObs((s) => s.scenes);
  const current = useObs((s) => s.currentProgramScene);
  const send = useObs((s) => s.send);
  const ready = useObs((s) => s.phase === "ready");
  const scene = scenes.find((s) => s.sceneName === current);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {scenes.map((sc) => {
          const active = sc.sceneName === current;
          return (
            <button
              key={sc.sceneName}
              type="button"
              disabled={!ready}
              onClick={() => send("SetCurrentProgramScene", { sceneName: sc.sceneName })}
              className={cn(
                "h-11 shrink-0 rounded-lg px-4 text-sm font-medium transition-[background-color,color,box-shadow] duration-150 ease-out",
                active ? "bg-accent text-accent-fg" : "bg-surface text-muted shadow-hairline hover:text-fg",
              )}
            >
              {sc.sceneName}
            </button>
          );
        })}
      </div>
      {scene && (
        <div className="rounded-xl bg-surface p-3 shadow-hairline lg:hidden">
          <SourceList sceneName={scene.sceneName} items={scene.items} send={send} />
        </div>
      )}
    </div>
  );
}

function SourceList({
  sceneName,
  items,
  send,
}: {
  sceneName: string;
  items: { id: string; sourceName: string; enabled: boolean }[];
  send: (type: string, data?: Record<string, unknown>) => unknown;
}) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() =>
              send("SetSceneItemEnabled", {
                sceneName,
                sceneItemId: Number(item.id),
                sceneItemEnabled: !item.enabled,
              })
            }
            className="flex h-11 w-full items-center justify-between gap-2 rounded-lg px-2 text-left text-sm transition-[background-color] duration-150 ease-out hover:bg-surface-2"
          >
            <span className={cn("truncate", item.enabled ? "text-fg" : "text-subtle")}>{item.sourceName}</span>
            {item.enabled ? <Eye className="size-4 text-muted" /> : <EyeOff className="size-4 text-subtle" />}
          </button>
        </li>
      ))}
    </ul>
  );
}

function OutputsCard() {
  const stream = useObs((s) => s.stream);
  const record = useObs((s) => s.record);
  const stats = useObs((s) => s.stats);
  const bitrate = stream.outputActive ? (stream.outputBytes / Math.max(1, stream.outputDurationMs / 1000)) * 8 : 0;

  return (
    <div className="rounded-2xl bg-surface p-4 shadow-hairline">
      <div className="mb-3 flex items-center gap-2 text-2xs font-medium tracking-wide text-muted uppercase">
        <MonitorPlay className="size-3.5" />
        Outputs
      </div>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-2 font-mono text-xs tabular-nums">
        <div>
          <dt className="text-subtle">Stream</dt>
          <dd className="text-fg">{stream.outputActive ? formatTimecode(stream.outputTimecodeMs) : "idle"}</dd>
        </div>
        <div>
          <dt className="text-subtle">Bitrate</dt>
          <dd className="text-fg">{stream.outputActive ? formatBitrate(bitrate) : "—"}</dd>
        </div>
        <div>
          <dt className="text-subtle">Record</dt>
          <dd className="text-fg">
            {record.outputActive ? formatTimecode(record.outputTimecodeMs) : "idle"}
            {record.outputPaused ? " paused" : ""}
          </dd>
        </div>
        <div>
          <dt className="text-subtle">Disk</dt>
          <dd className="text-fg">{record.outputActive ? formatBytes(record.outputBytes) : "—"}</dd>
        </div>
        <div>
          <dt className="text-subtle">Dropped</dt>
          <dd className="text-fg">
            {stream.outputSkippedFrames}/{Math.max(stream.outputTotalFrames, 1)}
          </dd>
        </div>
        <div>
          <dt className="text-subtle">Render</dt>
          <dd className="text-fg">{stats.averageFrameRenderTime.toFixed(2)} ms</dd>
        </div>
      </dl>
    </div>
  );
}

function ConnectionCard() {
  const connection = useObs((s) => s.connection);
  const setConnection = useObs((s) => s.setConnection);
  const studioMode = useObs((s) => s.studioMode);
  const send = useObs((s) => s.send);
  const [host, setHost] = useState(connection.host);
  const [port, setPort] = useState(String(connection.port));
  const [password, setPassword] = useState(connection.password);

  return (
    <div className="rounded-2xl bg-surface p-4 shadow-hairline">
      <div className="mb-3 text-2xs font-medium tracking-wide text-muted uppercase">Websocket</div>
      <div className="flex flex-col gap-2">
        <Input value={host} onChange={(e) => setHost(e.target.value)} aria-label="Host" placeholder="Host" />
        <Input value={port} onChange={(e) => setPort(e.target.value)} aria-label="Port" placeholder="Port" />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
          placeholder="Password"
        />
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => {
            setConnection({ host, port: Number(port) || 4455, password });
            toast("Connection saved for obs-call.mjs");
          }}
        >
          Save for scripts
        </Button>
        <div className="mt-1 flex h-11 items-center justify-between gap-3">
          <span className="text-sm text-muted">Studio mode</span>
          <Switch
            checked={studioMode}
            onCheckedChange={(v) => send("SetStudioModeEnabled", { studioModeEnabled: v })}
            aria-label="Studio mode"
          />
        </div>
      </div>
    </div>
  );
}

function EventLog() {
  const events = useObs((s) => s.events);
  if (events.length === 0) {
    return <p className="text-sm text-muted">No protocol traffic yet.</p>;
  }
  return (
    <ul className="flex max-h-96 flex-col gap-1 overflow-auto rounded-xl bg-surface p-2 shadow-hairline">
      {events.map((e) => (
        <li key={e.id} className="flex gap-3 rounded-lg px-2 py-2 font-mono text-2xs">
          <span className="w-14 shrink-0 text-subtle">{e.kind}</span>
          <span className={cn("shrink-0", e.ok === false ? "text-live" : "text-fg")}>{e.name}</span>
          {e.detail && <span className="min-w-0 truncate text-muted">{e.detail}</span>}
        </li>
      ))}
    </ul>
  );
}
