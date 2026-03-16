export interface DevonzClientOptions {
  apiUrl?: string;
  token?: string;
  projectId?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  plan: "free" | "pro" | "team" | "enterprise";
}

export interface ProjectInfo {
  id: string;
  name: string;
  description?: string;
  framework?: string;
  language?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FileTree {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileTree[];
  size?: number;
  lastModified?: string;
}

export interface DevonzFile {
  path: string;
  content: string;
  language?: string;
  encoding?: "utf8" | "base64";
}
