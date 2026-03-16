import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIModel, AIProvider, ChatOptions, ChatResponse, EmbeddingOptions, EmbeddingResponse, StreamChunk } from "../types";

export class GeminiProvider implements AIProvider {
  readonly name = "gemini";
  private client: GoogleGenerativeAI;

  readonly models: AIModel[] = [
    { id: "gemini-2.5-pro-preview-05-06", name: "Gemini 2.5 Pro", contextWindow: 1048576, supportsVision: true, supportsTools: true, inputCostPer1kTokens: 0.00125, outputCostPer1kTokens: 0.01 },
    { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", contextWindow: 1048576, supportsVision: true, supportsTools: true, inputCostPer1kTokens: 0.0001, outputCostPer1kTokens: 0.0004 },
    { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", contextWindow: 1048576, supportsVision: true, supportsTools: true, inputCostPer1kTokens: 0.000075, outputCostPer1kTokens: 0.0003 },
  ];

  constructor(apiKey: string) {
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async chat(options: ChatOptions): Promise<ChatResponse> {
    const model = this.client.getGenerativeModel({ model: options.model });
    const history = options.messages.slice(0, -1).filter(m => m.role !== "system").map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
    const last = options.messages[options.messages.length - 1];
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(last.content);
    const text = result.response.text();
    return {
      id: crypto.randomUUID(),
      model: options.model,
      content: text,
      usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0, estimatedCostUsd: 0 },
      finishReason: "stop",
    };
  }

  async *stream(options: ChatOptions): AsyncGenerator<StreamChunk> {
    const model = this.client.getGenerativeModel({ model: options.model });
    const last = options.messages[options.messages.length - 1];
    const result = await model.generateContentStream(last.content);
    for await (const chunk of result.stream) {
      yield { delta: chunk.text(), done: false };
    }
    yield { delta: "", done: true };
  }

  async embed(options: EmbeddingOptions): Promise<EmbeddingResponse> {
    const model = this.client.getGenerativeModel({ model: options.model || "text-embedding-004" });
    const inputs = Array.isArray(options.input) ? options.input : [options.input];
    const embeddings = await Promise.all(inputs.map(i => model.embedContent(i)));
    return {
      embeddings: embeddings.map(e => e.embedding.values),
      usage: { totalTokens: 0 },
    };
  }

  async listModels(): Promise<AIModel[]> {
    return this.models;
  }
}
