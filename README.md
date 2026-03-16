# Full-devonz 

**Devonz — all in one.** Web app, desktop editor, browser editor, shared packages, infra.

## Monorepo Structure

```
Full-devonz/
├── apps/
│   ├── web/              # Next.js web app (main Devonz platform)
│   ├── desktop/          # Desktop editor (fork of Void, built on VS Code)
│   └── web-editor/       # Browser editor (fork of openvscode-server)
├── packages/
│   ├── bridge/           # @devonz/bridge — real-time WebSocket sync
│   ├── ai-core/          # @devonz/ai-core — unified AI provider abstraction
│   ├── ui/               # @devonz/ui — shared React components
│   └── devonz-sdk/       # @devonz/sdk — official JS/TS SDK
├── infra/
│   ├── docker/           # Dockerfiles + docker-compose
│   └── k8s/              # Kubernetes manifests
└── .github/
    └── workflows/        # CI/CD pipelines (build, test, release, docker)
```

## Quick Start

```bash
# Install dependencies
corepack enable
pnpm install

# Start all dev servers in parallel
pnpm dev

# Build everything
pnpm build
```

## Apps

### `apps/web` — Devonz Web App
The main Devonz platform. Built with Next.js + Tailwind.

```bash
cd apps/web && pnpm dev   # http://localhost:3000
```

### `apps/desktop` — Devonz Editor (Desktop)
A fork of [Void](https://github.com/voideditor/void) (Apache 2.0), which is itself a fork of VS Code.
Full AI-powered desktop code editor with native Devonz integration.

```bash
cd apps/desktop
npm install
npm run compile
./scripts/code.sh       # Linux/macOS
./scripts/code.bat      # Windows
```

### `apps/web-editor` — Devonz Editor (Web)
A fork of [openvscode-server](https://github.com/gitpod-io/openvscode-server) (MIT).
Self-hostable VS Code in the browser with the Devonz Bridge extension pre-installed.

```bash
cd apps/web-editor
npm install
npm run compile
node out/server/node/server-main.js --port 3030 --without-connection-token
# Open http://localhost:3030
```

### Docker (self-hosted)
```bash
cd infra/docker
docker compose up -d     # Starts web + web-editor + api
```

## Packages

| Package | Description |
|---|---|
| `@devonz/bridge` | Real-time WebSocket sync between editors and the Devonz platform |
| `@devonz/ai-core` | Unified AI abstraction — OpenAI, Anthropic, Gemini, Ollama, Mistral |
| `@devonz/ui` | Shared React components (DevonzEditorButton, AIStatusBadge, etc.) |
| `@devonz/sdk` | Official SDK — build plugins and integrations on Devonz |

## Using `@devonz/sdk`

```ts
import { DevonzClient } from "@devonz/sdk";

const client = new DevonzClient({ token: process.env.DEVONZ_API_KEY });

const projects = await client.listProjects();
const tree = await client.getFileTree(projects[0].id);
const file = await client.readFile(projects[0].id, "src/index.ts");
```

## Using `@devonz/ai-core`

```ts
import { DevonzAI, OpenAIProvider, AnthropicProvider } from "@devonz/ai-core";

const ai = new DevonzAI();
ai.register(new OpenAIProvider(process.env.OPENAI_API_KEY!));
ai.register(new AnthropicProvider(process.env.ANTHROPIC_API_KEY!));

// Use OpenAI by default, switch providers on the fly
const res = await ai.chat({ model: "gpt-4o", messages: [{ role: "user", content: "Hello!" }] });

// Stream from Claude
ai.use("anthropic");
for await (const chunk of ai.stream({ model: "claude-sonnet-4-5", messages: [{ role: "user", content: "Write a function" }] })) {
  process.stdout.write(chunk.delta);
}
```

## CI/CD

- **`ci.yml`** — lint, typecheck, test, build on every push/PR
- **`release-desktop.yml`** — builds and releases desktop binaries for Linux/macOS/Windows when a `desktop/v*` tag is pushed

## Attribution

- `apps/desktop` is forked from [voideditor/void](https://github.com/voideditor/void) (Apache 2.0)
- `apps/web-editor` is forked from [gitpod-io/openvscode-server](https://github.com/gitpod-io/openvscode-server) (MIT)
- Both are forks of [microsoft/vscode](https://github.com/microsoft/vscode) (MIT)

## License

Apache 2.0 — see [LICENSE](./LICENSE)
