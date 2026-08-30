export type BootPhase = "idle" | "booting" | "ready" | "stopped";

export type SceneItemKind =
  | "game"
  | "camera"
  | "overlay"
  | "text"
  | "browser"
  | "image"
  | "color"
  | "chat"
  | "lower";

export type SceneItem = {
  id: string;
  sourceName: string;
  kind: SceneItemKind;
  enabled: boolean;
};

export type Scene = {
  sceneName: string;
  sceneIndex: number;
  items: SceneItem[];
};

export type AudioInput = {
  inputName: string;
  inputKind: string;
  inputMuted: boolean;
  inputVolumeMul: number;
  special: "mic" | "desktop" | "aux";
};

export type LogEvent = {
  id: string;
  at: number;
  kind: "request" | "response" | "event" | "system";
  name: string;
  detail?: string;
  ok?: boolean;
};

export type ObsResponse = {
  requestType: string;
  requestStatus: { result: boolean; code: number; comment?: string };
  responseData?: Record<string, unknown>;
};

export type CommandParam = {
  key: string;
  label: string;
  kind: "string" | "boolean" | "number";
  placeholder?: string;
  optionsFrom?: "scenes" | "inputs";
};

export type CommandDef = {
  type: string;
  group: string;
  summary: string;
  params?: CommandParam[];
};

export type ContainerStatus = {
  xvfb: "down" | "starting" | "up";
  obs: "down" | "starting" | "up";
  websocket: "down" | "starting" | "up";
};
