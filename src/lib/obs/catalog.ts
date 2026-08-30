import type { CommandDef } from "./types";

export const COMMANDS: CommandDef[] = [
  { type: "GetVersion", group: "General", summary: "OBS build, platform, and websocket version" },
  { type: "GetStats", group: "General", summary: "CPU, FPS, memory, skipped frames" },
  { type: "GetSceneList", group: "Scenes", summary: "All scenes and the current program scene" },
  {
    type: "SetCurrentProgramScene",
    group: "Scenes",
    summary: "Cut the program bus to a scene",
    params: [{ key: "sceneName", label: "Scene", kind: "string", optionsFrom: "scenes" }],
  },
  { type: "GetCurrentProgramScene", group: "Scenes", summary: "Name of the scene on program" },
  {
    type: "GetSceneItemList",
    group: "Sources",
    summary: "Items in a scene",
    params: [{ key: "sceneName", label: "Scene", kind: "string", optionsFrom: "scenes" }],
  },
  {
    type: "SetSceneItemEnabled",
    group: "Sources",
    summary: "Show or hide a scene item",
    params: [
      { key: "sceneName", label: "Scene", kind: "string", optionsFrom: "scenes" },
      { key: "sceneItemId", label: "Item id", kind: "number" },
      { key: "sceneItemEnabled", label: "Enabled", kind: "boolean" },
    ],
  },
  { type: "GetInputList", group: "Inputs", summary: "All inputs (audio and video)" },
  { type: "GetSpecialInputs", group: "Inputs", summary: "Desktop and mic special inputs" },
  {
    type: "SetInputMute",
    group: "Inputs",
    summary: "Mute or unmute an input",
    params: [
      { key: "inputName", label: "Input", kind: "string", optionsFrom: "inputs" },
      { key: "inputMuted", label: "Muted", kind: "boolean" },
    ],
  },
  {
    type: "ToggleInputMute",
    group: "Inputs",
    summary: "Flip mute on an input",
    params: [{ key: "inputName", label: "Input", kind: "string", optionsFrom: "inputs" }],
  },
  {
    type: "SetInputVolume",
    group: "Inputs",
    summary: "Set input volume (multiplier 0–1)",
    params: [
      { key: "inputName", label: "Input", kind: "string", optionsFrom: "inputs" },
      { key: "inputVolumeMul", label: "Volume mul", kind: "number" },
    ],
  },
  { type: "GetStreamStatus", group: "Stream", summary: "Live state, timecode, bytes, skipped" },
  { type: "StartStream", group: "Stream", summary: "Go live" },
  { type: "StopStream", group: "Stream", summary: "End the stream" },
  { type: "ToggleStream", group: "Stream", summary: "Toggle streaming" },
  { type: "GetRecordStatus", group: "Record", summary: "Recording state and timecode" },
  { type: "StartRecord", group: "Record", summary: "Start recording" },
  { type: "StopRecord", group: "Record", summary: "Stop recording" },
  { type: "ToggleRecord", group: "Record", summary: "Toggle recording" },
  { type: "PauseRecord", group: "Record", summary: "Pause the recording" },
  { type: "ResumeRecord", group: "Record", summary: "Resume the recording" },
  { type: "GetVirtualCamStatus", group: "Virtual Cam", summary: "Virtual camera state" },
  { type: "StartVirtualCam", group: "Virtual Cam", summary: "Start the virtual camera" },
  { type: "StopVirtualCam", group: "Virtual Cam", summary: "Stop the virtual camera" },
  { type: "ToggleVirtualCam", group: "Virtual Cam", summary: "Toggle virtual camera" },
  { type: "GetStudioModeEnabled", group: "Studio", summary: "Whether studio mode is on" },
  {
    type: "SetStudioModeEnabled",
    group: "Studio",
    summary: "Enable or disable studio mode",
    params: [{ key: "studioModeEnabled", label: "Enabled", kind: "boolean" }],
  },
  { type: "TriggerStudioModeTransition", group: "Studio", summary: "Cut preview to program" },
];

export const COMMAND_GROUPS = [
  "General",
  "Scenes",
  "Sources",
  "Inputs",
  "Stream",
  "Record",
  "Virtual Cam",
  "Studio",
] as const;

export function cliFor(
  type: string,
  data: Record<string, unknown>,
  conn: { host: string; port: number; password: string },
): string {
  const args = Object.entries(data)
    .filter(([, v]) => v !== "" && v !== undefined)
    .map(([k, v]) => `${k}=${String(v)}`)
    .join(" ");
  const base = `node obs-call.mjs --host ${conn.host} --port ${conn.port} --password ${conn.password} ${type}`;
  return args ? `${base} ${args}` : base;
}
