import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Copy, Play } from "lucide-react";
import { COMMANDS, COMMAND_GROUPS, cliFor } from "@/lib/obs/catalog";
import { useObs } from "@/lib/obs/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ConsolePanel() {
  const send = useObs((s) => s.send);
  const last = useObs((s) => s.lastResponse);
  const scenes = useObs((s) => s.scenes);
  const inputs = useObs((s) => s.inputs);
  const connection = useObs((s) => s.connection);
  const ready = useObs((s) => s.phase === "ready");
  const [type, setType] = useState("GetVersion");
  const [fields, setFields] = useState<Record<string, string>>({});

  const def = COMMANDS.find((c) => c.type === type) ?? COMMANDS[0];
  const data = useMemo(() => {
    const out: Record<string, unknown> = {};
    for (const p of def.params ?? []) {
      const raw = fields[p.key];
      if (raw === undefined || raw === "") continue;
      if (p.kind === "boolean") out[p.key] = raw === "true";
      else if (p.kind === "number") out[p.key] = Number(raw);
      else out[p.key] = raw;
    }
    return out;
  }, [def, fields]);

  const cli = cliFor(type, data, connection);
  const requestJson = JSON.stringify(
    { op: 6, d: { requestType: type, requestId: "…", requestData: Object.keys(data).length ? data : undefined } },
    null,
    2,
  );

  function optionsFor(from?: "scenes" | "inputs") {
    if (from === "scenes") return scenes.map((s) => s.sceneName);
    if (from === "inputs") return inputs.map((i) => i.inputName);
    return null;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-2xs font-medium tracking-wide text-muted uppercase">Request</span>
          <select
            className="h-11 rounded-md bg-surface-2 px-3 text-sm text-fg shadow-hairline"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setFields({});
            }}
          >
            {COMMAND_GROUPS.map((g) => (
              <optgroup key={g} label={g}>
                {COMMANDS.filter((c) => c.group === g).map((c) => (
                  <option key={c.type} value={c.type}>
                    {c.type}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <p className="text-sm text-muted">{def.summary}</p>
        {(def.params ?? []).map((p) => {
          const opts = optionsFor(p.optionsFrom);
          return (
            <label key={p.key} className="flex flex-col gap-1.5">
              <span className="text-2xs font-medium tracking-wide text-muted uppercase">{p.label}</span>
              {opts ? (
                <select
                  className="h-11 rounded-md bg-surface-2 px-3 text-sm text-fg shadow-hairline"
                  value={fields[p.key] ?? ""}
                  onChange={(e) => setFields((f) => ({ ...f, [p.key]: e.target.value }))}
                >
                  <option value="">Select</option>
                  {opts.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : p.kind === "boolean" ? (
                <select
                  className="h-11 rounded-md bg-surface-2 px-3 text-sm text-fg shadow-hairline"
                  value={fields[p.key] ?? ""}
                  onChange={(e) => setFields((f) => ({ ...f, [p.key]: e.target.value }))}
                >
                  <option value="">Select</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              ) : (
                <Input
                  value={fields[p.key] ?? ""}
                  inputMode={p.kind === "number" ? "decimal" : "text"}
                  placeholder={p.placeholder ?? p.key}
                  onChange={(e) => setFields((f) => ({ ...f, [p.key]: e.target.value }))}
                />
              )}
            </label>
          );
        })}
        <Button
          type="button"
          disabled={!ready}
          onClick={() => {
            const res = send(type, data);
            toast(res.requestStatus.result ? `${type} ok` : `${type} failed`);
          }}
        >
          <Play />
          Send request
        </Button>
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <CodeBlock title="obs-websocket v5" value={requestJson} />
        <CodeBlock title="External script" value={cli} />
        <CodeBlock
          title="Response"
          value={last ? JSON.stringify(last, null, 2) : "No request yet."}
          tone={last && !last.requestStatus.result ? "bad" : "ok"}
        />
      </div>
    </div>
  );
}

function CodeBlock({ title, value, tone }: { title: string; value: string; tone?: "ok" | "bad" }) {
  return (
    <div className="min-w-0 rounded-xl bg-surface p-3 shadow-hairline">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-2xs font-medium tracking-wide text-muted uppercase">{title}</span>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label={`Copy ${title}`}
          onClick={async () => {
            await navigator.clipboard.writeText(value);
            toast("Copied");
          }}
        >
          <Copy />
        </Button>
      </div>
      <pre
        className={cn(
          "max-h-48 overflow-auto font-mono text-2xs leading-relaxed text-muted",
          tone === "bad" && "text-live",
        )}
      >
        {value}
      </pre>
    </div>
  );
}
