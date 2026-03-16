import { DevonzClientOptions, DevonzFile, FileTree, ProjectInfo, UserProfile } from "./types";

const DEFAULT_API_URL = "https://api.devonz.ai";

export class DevonzClient {
  private readonly apiUrl: string;
  private readonly token: string | undefined;

  constructor(options: DevonzClientOptions = {}) {
    this.apiUrl = options.apiUrl ?? DEFAULT_API_URL;
    this.token = options.token ?? (typeof process !== "undefined" ? process.env.DEVONZ_API_KEY : undefined);
  }

  private async fetch<T>(path: string, init: RequestInit = {}): Promise<T> {
    const url = `${this.apiUrl}${path}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...(init.headers as Record<string, string> ?? {}),
    };
    const res = await fetch(url, { ...init, headers });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Devonz API error ${res.status}: ${text}`);
    }
    return res.json() as Promise<T>;
  }

  // Auth
  async getProfile(): Promise<UserProfile> {
    return this.fetch("/v1/me");
  }

  // Projects
  async listProjects(): Promise<ProjectInfo[]> {
    return this.fetch("/v1/projects");
  }

  async getProject(id: string): Promise<ProjectInfo> {
    return this.fetch(`/v1/projects/${id}`);
  }

  async createProject(data: Partial<ProjectInfo>): Promise<ProjectInfo> {
    return this.fetch("/v1/projects", { method: "POST", body: JSON.stringify(data) });
  }

  // Files
  async readFile(projectId: string, path: string): Promise<DevonzFile> {
    return this.fetch(`/v1/projects/${projectId}/files/${encodeURIComponent(path)}`);
  }

  async writeFile(projectId: string, file: DevonzFile): Promise<void> {
    await this.fetch(`/v1/projects/${projectId}/files/${encodeURIComponent(file.path)}`, {
      method: "PUT",
      body: JSON.stringify(file),
    });
  }

  async deleteFile(projectId: string, path: string): Promise<void> {
    await this.fetch(`/v1/projects/${projectId}/files/${encodeURIComponent(path)}`, { method: "DELETE" });
  }

  async getFileTree(projectId: string): Promise<FileTree> {
    return this.fetch(`/v1/projects/${projectId}/tree`);
  }

  // AI
  async aiChat(projectId: string, message: string, model?: string): Promise<string> {
    const res = await this.fetch<{ content: string }>(`/v1/projects/${projectId}/ai/chat`, {
      method: "POST",
      body: JSON.stringify({ message, model }),
    });
    return res.content;
  }
}
