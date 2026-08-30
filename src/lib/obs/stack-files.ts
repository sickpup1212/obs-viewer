export const STACK_FILES: { name: string; language: string; body: string }[] = [
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
`,
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
`,
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
`,
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
`,
  },
];

export const STACK_README = `Stagehand talks obs-websocket v5 — the same protocol OBS 28+ exposes
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
