import { DevonzClient } from "./DevonzClient";
import { DevonzBridge, BridgeEvent } from "@devonz/bridge";

export interface PluginManifest {
  name: string;
  version: string;
  description: string;
  author?: string;
  permissions?: Array<"files:read" | "files:write" | "ai:chat" | "terminal" | "git">;
  activationEvents?: string[];
}

export interface PluginContext {
  client: DevonzClient;
  bridge: DevonzBridge | null;
  projectId: string | null;
  log: (message: string) => void;
  on: (event: BridgeEvent, handler: (payload: unknown) => void) => void;
}

export interface DevonzPlugin {
  manifest: PluginManifest;
  activate(context: PluginContext): Promise<void> | void;
  deactivate?(): Promise<void> | void;
}

export function createPlugin(plugin: DevonzPlugin): DevonzPlugin {
  return plugin;
}
