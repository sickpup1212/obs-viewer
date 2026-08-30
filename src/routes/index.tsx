import { createFileRoute } from "@tanstack/react-router";
import { ControlRoom } from "@/components/app/control-room";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <ControlRoom />;
}
