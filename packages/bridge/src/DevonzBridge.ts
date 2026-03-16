import EventEmitter from "eventemitter3";
import WebSocket from "ws";
import { BridgeEvent, BridgeMessage, BridgeOptions } from "./types";

export class DevonzBridge extends EventEmitter {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private sessionId: string;
  private readonly options: Required<BridgeOptions>;

  constructor(options: BridgeOptions) {
    super();
    this.options = {
      reconnectInterval: 3000,
      maxReconnectAttempts: 10,
      ...options,
    };
    this.sessionId = `${options.projectId}-${Date.now()}`;
  }

  connect(): void {
    const url = `${this.options.apiUrl.replace(/^http/, "ws")}/ws/editor?` +
      `token=${this.options.sessionToken}&project=${this.options.projectId}`;

    this.ws = new WebSocket(url);

    this.ws.on("open", () => {
      this.reconnectAttempts = 0;
      this.emit(BridgeEvent.Connected, { sessionId: this.sessionId });
    });

    this.ws.on("message", (raw) => {
      try {
        const msg: BridgeMessage = JSON.parse(raw.toString());
        this.emit(msg.event, msg.payload);
      } catch {
        // malformed message — ignore
      }
    });

    this.ws.on("close", () => {
      this.emit(BridgeEvent.Disconnected);
      this._scheduleReconnect();
    });

    this.ws.on("error", (err) => {
      this.emit(BridgeEvent.Error, err);
    });
  }

  send(event: BridgeEvent, payload: unknown): void {
    if (this.ws?.readyState !== WebSocket.OPEN) return;
    const msg: BridgeMessage = {
      event,
      payload,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };
    this.ws.send(JSON.stringify(msg));
  }

  disconnect(): void {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.ws?.close();
    this.ws = null;
  }

  private _scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.options.maxReconnectAttempts) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, this.options.reconnectInterval);
  }
}
