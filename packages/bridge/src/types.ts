export enum BridgeEvent {
  Connected = "connected",
  Disconnected = "disconnected",
  FileChanged = "file:changed",
  FileSaved = "file:saved",
  FileCreated = "file:created",
  FileDeleted = "file:deleted",
  CursorMoved = "cursor:moved",
  SelectionChanged = "selection:changed",
  AiRequest = "ai:request",
  AiResponse = "ai:response",
  ProjectOpened = "project:opened",
  ProjectClosed = "project:closed",
  TerminalOutput = "terminal:output",
  BuildStarted = "build:started",
  BuildFinished = "build:finished",
  Error = "error",
}

export interface BridgeOptions {
  apiUrl: string;
  projectId: string;
  sessionToken: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export interface BridgeMessage {
  event: BridgeEvent;
  payload: unknown;
  timestamp: number;
  sessionId: string;
}

export interface FileChangeEvent {
  path: string;
  content?: string;
  language?: string;
  cursor?: { line: number; column: number };
}

export interface SessionInfo {
  sessionId: string;
  projectId: string;
  userId: string;
  startedAt: string;
  editorType: "desktop" | "web";
}
