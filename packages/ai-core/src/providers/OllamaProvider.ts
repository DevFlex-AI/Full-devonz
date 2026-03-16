import { Ollama } from "ollama";
import { AIModel, AIProvider, ChatOptions, ChatResponse, EmbeddingOptions, EmbeddingResponse, StreamChunk } from "../types";

export class OllamaProvider implements AIProvider {
  readonly name = "ollama";
  private client: Ollama;

  readonly models: AIModel[] = [
    { id: "llama3.3", name: "Llama 3.3 (70B)", contextWindow: 128000, supportsVision: false, supportsTools: true, inputCostPer1kTokens: 0, outputCostPer1kTokens: 0 },
    { id: "qwen2.5-coder:32b", name: "Qwen 2.5 Coder 32B", contextWindow: 131072, supportsVision: false, supportsTools: true, inputCostPer1kTokens: 0, outputCostPer1kTokens: 0 },
    { id: "deepseek-r1:32b", name: "DeepSeek R1 32B", contextWindow: 131072, supportsVision: false, supportsTools: false, inputCostPer1kTokens: 0, outputCostPer1kTokens: 0 },
    { id: "phi4", name: "Phi 4 (14B)", contextWindow: 16000, supportsVision: false, supportsTools: true, inputCostPer1kTokens: 0, outputCostPer1kTokens: 0 },
  ];

  constructor(host = "http://localhost:11434") {
    this.client = new Ollama({ host });
  }

  async chat(options: ChatOptions): Promise<ChatResponse> {
    const res = await this.client.chat({
      model: options.model,
      messages: options.messages,
      stream: false,
    });
    return {
      id: crypto.randomUUID(),
      model: options.model,
      content: res.message.content,
      usage: {
        promptTokens: res.prompt_eval_count ?? 0,
        completionTokens: res.eval_count ?? 0,
        totalTokens: (res.prompt_eval_count ?? 0) + (res.eval_count ?? 0),
        estimatedCostUsd: 0,
      },
      finishReason: "stop",
    };
  }

  async *stream(options: ChatOptions): AsyncGenerator<StreamChunk> {
    const stream = await this.client.chat({ model: options.model, messages: options.messages, stream: true });
    for await (const chunk of stream) {
      yield { delta: chunk.message.content, done: chunk.done };
    }
  }

  async embed(options: EmbeddingOptions): Promise<EmbeddingResponse> {
    const inputs = Array.isArray(options.input) ? options.input : [options.input];
    const results = await Promise.all(inputs.map(i => this.client.embeddings({ model: options.model || "nomic-embed-text", prompt: i })));
    return { embeddings: results.map(r => r.embedding), usage: { totalTokens: 0 } };
  }

  async listModels(): Promise<AIModel[]> {
    try {
      const res = await this.client.list();
      return res.models.map(m => ({
        id: m.name,
        name: m.name,
        contextWindow: 128000,
        supportsVision: false,
        supportsTools: false,
        inputCostPer1kTokens: 0,
        outputCostPer1kTokens: 0,
      }));
    } catch {
      return this.models;
    }
  }
}
