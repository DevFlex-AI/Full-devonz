export type MessageRole = "system" | "user" | "assistant" | "tool";

export interface ChatMessage {
  role: MessageRole;
  content: string;
  name?: string;
  toolCallId?: string;
}

export interface AIModel {
  id: string;
  name: string;
  contextWindow: number;
  supportsVision: boolean;
  supportsTools: boolean;
  inputCostPer1kTokens: number;
  outputCostPer1kTokens: number;
}

export interface ChatOptions {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  systemPrompt?: string;
  tools?: ToolDefinition[];
}

export interface ChatResponse {
  id: string;
  model: string;
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    estimatedCostUsd: number;
  };
  finishReason: "stop" | "length" | "tool_calls" | "content_filter";
}

export interface StreamChunk {
  delta: string;
  done: boolean;
  usage?: ChatResponse["usage"];
}

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

export interface EmbeddingOptions {
  model: string;
  input: string | string[];
}

export interface EmbeddingResponse {
  embeddings: number[][];
  usage: { totalTokens: number };
}

export interface AIProvider {
  name: string;
  models: AIModel[];
  chat(options: ChatOptions): Promise<ChatResponse>;
  stream(options: ChatOptions): AsyncGenerator<StreamChunk>;
  embed(options: EmbeddingOptions): Promise<EmbeddingResponse>;
  listModels(): Promise<AIModel[]>;
}
