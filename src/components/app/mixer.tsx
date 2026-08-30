import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useObs } from "@/lib/obs/store";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export function Mixer() {
  const inputs = useObs((s) => s.inputs);
  const meters = useObs((s) => s.meters);
  const send = useObs((s) => s.send);
  const ready = useObs((s) => s.phase === "ready");

  return (
    <div className="flex h-full min-h-[180px] gap-2 overflow-x-auto pb-1">
      {inputs.map((input) => {
        const level = meters[input.inputName] ?? 0;
        const Icon = input.special === "mic" ? (input.inputMuted ? MicOff : Mic) : input.inputMuted ? VolumeX : Volume2;
        return (
          <div
            key={input.inputName}
            className="flex w-[72px] shrink-0 flex-col items-center gap-2 rounded-xl bg-surface p-2 shadow-hairline"
          >
            <div className="relative h-28 w-7 overflow-hidden rounded-md bg-surface-2">
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 origin-bottom rounded-sm transition-[height,background-color] duration-150 ease-out",
                  input.inputMuted ? "bg-subtle" : level > 0.86 ? "bg-live" : "bg-ready",
                )}
                style={{ height: `${Math.round(level * 100)}%` }}
              />
            </div>
            <Slider
              orientation="vertical"
              className="h-24"
              disabled={!ready}
              min={0}
              max={100}
              value={[Math.round(input.inputVolumeMul * 100)]}
              onValueChange={([v]) =>
                send("SetInputVolume", { inputName: input.inputName, inputVolumeMul: (v ?? 0) / 100 })
              }
            />
            <Button
              type="button"
              size="icon"
              variant={input.inputMuted ? "quiet" : "secondary"}
              disabled={!ready}
              aria-label={input.inputMuted ? `Unmute ${input.inputName}` : `Mute ${input.inputName}`}
              onClick={() => send("ToggleInputMute", { inputName: input.inputName })}
            >
              <Icon />
            </Button>
            <div className="w-full truncate text-center text-micro leading-tight text-muted">{input.inputName}</div>
          </div>
        );
      })}
    </div>
  );
}
