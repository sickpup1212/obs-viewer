import { useMemo } from "react";
import { cn, formatTimecode } from "@/lib/utils";
import type { Scene, SceneItem } from "@/lib/obs/types";

const CHAT = [
  { user: "mira", text: "that transition was clean" },
  { user: "oak", text: "audio sitting right" },
  { user: "len", text: "what overlay pack is that" },
  { user: "nori", text: "going live from a box. wild" },
  { user: "sol", text: "cut to chatting when you can" },
];

function itemOn(scene: Scene, kind: SceneItem["kind"]) {
  return scene.items.some((i) => i.kind === kind && i.enabled);
}

function Backdrop() {
  return (
    <div className="absolute inset-0 bg-bg">
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_20%,color-mix(in_oklab,var(--color-accent)_18%,transparent),transparent_42%),radial-gradient(circle_at_80%_70%,color-mix(in_oklab,var(--color-fg)_6%,transparent),transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:32px_32px]" />
    </div>
  );
}

function GameField() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-surface">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(color-mix(in_oklab,var(--color-accent)_35%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--color-accent)_35%,transparent)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-accent/30" />
      <div className="absolute left-[18%] top-[28%] h-2 w-10 rounded-sm bg-fg/30" />
      <div className="absolute right-[22%] top-[62%] h-2 w-14 rounded-sm bg-fg/20" />
      <div className="absolute bottom-6 left-6 font-mono text-micro tracking-widest text-accent/80">
        CAPTURE · 1920×1080
      </div>
    </div>
  );
}

function Camera({ large }: { large?: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-surface-2 shadow-hairline",
        large ? "h-full w-full" : "h-full w-full",
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,color-mix(in_oklab,var(--color-accent)_28%,transparent),transparent_55%)]" />
      <div className="absolute left-1/2 top-[38%] size-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20" />
      <div className="absolute left-1/2 top-[72%] h-[38%] w-[70%] -translate-x-1/2 rounded-t-full bg-accent/15" />
      <div className="absolute left-2 top-2 font-mono text-micro tracking-widest text-muted">CAM 1</div>
    </div>
  );
}

function OverlayBar() {
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-[14%] items-center gap-3 bg-bg/80 px-4">
      <div className="size-2 rounded-full bg-live" />
      <div>
        <div className="text-2xs font-medium tracking-wide text-fg">STAGEHAND</div>
        <div className="font-mono text-micro tracking-widest text-muted">HEADLESS STUDIO</div>
      </div>
    </div>
  );
}

function LowerThird() {
  return (
    <div className="absolute bottom-[10%] left-[6%] overflow-hidden rounded-md bg-surface/90 px-3 py-2 shadow-hairline">
      <div className="text-xs font-medium text-fg">Director</div>
      <div className="font-mono text-micro tracking-wide text-muted">obs-websocket · display :99</div>
    </div>
  );
}

function ChatPanel() {
  return (
    <div className="flex h-full flex-col justify-end gap-1.5 rounded-md bg-bg/55 p-2 shadow-hairline">
      {CHAT.map((c) => (
        <div key={c.user} className="text-micro leading-snug">
          <span className="font-medium text-accent">{c.user}</span>
          <span className="text-muted"> {c.text}</span>
        </div>
      ))}
    </div>
  );
}

function TitleCard({ title, kicker }: { title: string; kicker: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <div className="font-mono text-micro tracking-display text-muted">{kicker}</div>
      <div className="text-2xl font-medium tracking-tight text-fg sm:text-3xl">{title}</div>
      <div className="h-px w-24 bg-accent/60" />
    </div>
  );
}

function SceneArt({ scene }: { scene: Scene }) {
  const name = scene.sceneName;
  if (name === "Gameplay") {
    return (
      <>
        {itemOn(scene, "game") && <GameField />}
        {!itemOn(scene, "game") && <Backdrop />}
        {itemOn(scene, "camera") && (
          <div className="absolute bottom-[16%] right-[4%] aspect-video w-[26%]">
            <Camera />
          </div>
        )}
        {itemOn(scene, "overlay") && <OverlayBar />}
        {itemOn(scene, "browser") && (
          <div className="absolute right-3 top-3 rounded-full bg-live/90 px-2 py-0.5 font-mono text-micro tracking-widest text-fg">
            ALERT
          </div>
        )}
      </>
    );
  }
  if (name === "Just Chatting") {
    return (
      <>
        <Backdrop />
        <div className="absolute inset-3 flex gap-3">
          {itemOn(scene, "camera") && (
            <div className="min-w-0 flex-[1.4]">
              <Camera large />
            </div>
          )}
          {itemOn(scene, "chat") && (
            <div className="hidden w-[34%] sm:block">
              <ChatPanel />
            </div>
          )}
        </div>
        {itemOn(scene, "lower") && <LowerThird />}
      </>
    );
  }
  if (name === "Starting Soon") {
    return (
      <>
        <Backdrop />
        {itemOn(scene, "text") && <TitleCard kicker="PLEASE STAND BY" title="Starting Soon" />}
        {itemOn(scene, "browser") && (
          <div className="absolute bottom-6 font-mono text-micro tracking-widest text-muted">
            framebuffer live
          </div>
        )}
      </>
    );
  }
  if (name === "Be Right Back") {
    return (
      <>
        <Backdrop />
        {itemOn(scene, "text") && <TitleCard kicker="HOLD" title="Be Right Back" />}
      </>
    );
  }
  if (name === "Ending") {
    return (
      <>
        <Backdrop />
        {itemOn(scene, "text") && <TitleCard kicker="END CARD" title="Thanks for watching" />}
      </>
    );
  }
  return (
    <>
      <Backdrop />
      {itemOn(scene, "text") && <TitleCard kicker="BREAK" title="Intermission" />}
    </>
  );
}

export function ProgramMonitor({
  scene,
  live,
  recording,
  timecodeMs,
  label = "PGM",
}: {
  scene: Scene | undefined;
  live: boolean;
  recording: boolean;
  timecodeMs: number;
  label?: string;
}) {
  const resolution = useMemo(() => "1920 × 1080", []);
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <div className="flex items-center justify-between gap-2 px-0.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-micro tracking-kicker text-muted">{label}</span>
          <span className="text-xs text-fg">{scene?.sceneName ?? "—"}</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-micro tabular-nums text-muted">
          <span>{resolution}</span>
          <span>{formatTimecode(timecodeMs)}</span>
        </div>
      </div>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-surface shadow-hairline">
        <div className="absolute inset-0 flex items-center justify-center">
          {scene ? <SceneArt scene={scene} /> : <div className="text-sm text-muted">No program</div>}
        </div>
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]">
          <div className="pgm-scan h-1/3 w-full bg-gradient-to-b from-transparent via-fg to-transparent" />
        </div>
        <div className="absolute left-3 top-3 flex gap-1.5">
          {live && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-live px-2 py-0.5 text-micro font-medium tracking-widest text-fg">
              <span className="live-dot size-1.5 rounded-full bg-fg" />
              LIVE
            </span>
          )}
          {recording && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-fg/90 px-2 py-0.5 text-micro font-medium tracking-widest text-bg">
              <span className="size-1.5 rounded-full bg-live" />
              REC
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
