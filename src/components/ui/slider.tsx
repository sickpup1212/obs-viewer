import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

function Slider({ className, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const vertical = props.orientation === "vertical";
  return (
    <SliderPrimitive.Root
      className={cn(
        "relative flex touch-none select-none items-center",
        vertical ? "h-full w-6 flex-col" : "w-full h-6",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative grow overflow-hidden rounded-full bg-surface-2 shadow-hairline",
          vertical ? "w-1.5 h-full" : "h-1.5 w-full",
        )}
      >
        <SliderPrimitive.Range
          className={cn("absolute bg-accent", vertical ? "w-full" : "h-full")}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          "block size-4 rounded-full bg-fg shadow-hairline-strong",
          "transition-[box-shadow,scale] duration-150 ease-out",
          "focus-visible:outline-none focus-visible:scale-110",
          "disabled:pointer-events-none disabled:opacity-40",
        )}
      />
    </SliderPrimitive.Root>
  );
}

export { Slider };
