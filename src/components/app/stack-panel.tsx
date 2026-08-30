import { useState } from "react";
import { toast } from "sonner";
import { Copy, Download } from "lucide-react";
import { STACK_FILES, STACK_README } from "@/lib/obs/stack-files";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function StackPanel() {
  const [active, setActive] = useState(STACK_FILES[0].name);
  const file = STACK_FILES.find((f) => f.name === active) ?? STACK_FILES[0];

  function download(name: string, body: string) {
    const blob = new Blob([body], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="max-w-2xl text-sm leading-relaxed text-muted whitespace-pre-wrap">{STACK_README}</p>
      <div className="flex flex-wrap gap-1.5">
        {STACK_FILES.map((f) => (
          <button
            key={f.name}
            type="button"
            onClick={() => setActive(f.name)}
            className={cn(
              "h-9 rounded-md px-3 text-xs font-medium transition-[background-color,color] duration-150 ease-out",
              f.name === active ? "bg-surface-2 text-fg shadow-hairline" : "text-muted hover:text-fg",
            )}
          >
            {f.name}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-surface p-3 shadow-hairline sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-muted">{file.name}</span>
          <div className="flex gap-1">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={async () => {
                await navigator.clipboard.writeText(file.body);
                toast(`Copied ${file.name}`);
              }}
            >
              <Copy />
              Copy
            </Button>
            <Button type="button" size="sm" variant="secondary" onClick={() => download(file.name, file.body)}>
              <Download />
              Download
            </Button>
          </div>
        </div>
        <pre className="max-h-96 overflow-auto font-mono text-2xs leading-relaxed text-muted">{file.body}</pre>
      </div>
    </div>
  );
}
