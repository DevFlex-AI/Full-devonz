# Devonz Architecture

## Overview

```
                         ┌─────────────────────────────────────┐
                         │          Devonz Web App             │
                         │         (apps/web, Next.js)         │
                         └──────────┬──────────────────────────┘
                                    │ @devonz/sdk / REST API
                         ┌──────────▼──────────────────────────┐
                         │          Devonz API Server          │
                         │        (REST + WebSocket)           │
                         └──────────┬──────────────────────────┘
                                    │ WebSocket (ws://)
              ┌─────────────────────┴──────────────────────────┐
              │                @devonz/bridge                  │
              ├─────────────────────┬──────────────────────────┤
              │                     │                          │
   ┌──────────▼──────┐   ┌──────────▼──────┐        future...
   │  Desktop Editor  │   │   Web Editor    │
   │  (apps/desktop)  │   │ (apps/web-editor│
   │  Void fork +     │   │ openvscode +    │
   │  BridgeService   │   │ devonz-bridge   │
   └──────────────────┘   │  extension)     │
                          └─────────────────┘
```

## Data Flow

1. User opens a project in the Devonz web app
2. Clicks "Open in Devonz Editor" (DevonzEditorButton)
3. Passes `projectId` + `sessionToken` to the editor URL
4. Editor (desktop or web) initializes DevonzBridgeService / devonz-bridge extension
5. Bridge opens WebSocket connection to Devonz API
6. File saves / cursor moves / AI requests stream bidirectionally in real time
7. Web app reflects changes live (project file tree, history, etc.)

## AI Flow

```
User prompt in editor
      ↓
@devonz/ai-core → DevonzAI.chat()
      ↓
Provider selector (OpenAI / Anthropic / Gemini / Ollama)
      ↓
Streaming response → editor diff UI
```
