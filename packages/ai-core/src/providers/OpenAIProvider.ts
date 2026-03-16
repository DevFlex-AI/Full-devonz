import OpenAI from "openai";
import { AIModel, AIProvider, ChatOptions, ChatResponse, EmbeddingOptions, EmbeddingResponse, StreamChunk } from "../types";

export class OpenAIProvider implements AIProvider {
  readonly name = "openai";
  private client: OpenAI;

  readonly models: AIModel[] = [
    { id: "gpt-4o", name: "GPT-4o", contextWindow: 128000, supportsVision: true, supportsTools: true, inputCostPer1kTokens: 0.005, outputCostPer1kTokens: 0.015 },
    { id: "gpt-4o-mini", name: "GPT-4o Mini", contextWindow: 128000, supportsVision: true, supportsTools: true, inputCostPer1kTokens: 0.00015, outputCostPer1kTokens: 0.0006 },
    { id: "gpt-4-turbo", name: "GPT-4 Turbo", contextWindow: 128000, supportsVision: true, supportsTools: true, inputCostPer1kTokens: 0.01, outputCostPer1kTokens: 0.03 },
    { id: "o1", name: "o1", contextWindow: 200000, supportsVision: true, supportsTools: false, inputCostPer1kTokens: 0.015, outputCostPer1kTokens: 0.06 },
    { id: "o3-mini", name: "o3 mini", contextWindow: 200000, supportsVision: false, supportsTools: true, inputCostPer1kTokens: 0.0011, outputCostPer1kTokens: 0.0044 },
  ];

  constructor(apiKey: string, baseURL?: string) {
    this.client = new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) });
  }

  async chat(options: ChatOptions): Promise<ChatResponse> {
    const res = await this.client.chat.completions.create({
      model: options.model,
      messages: options.messages as OpenAI.Chat.ChatCompletionMessageParam[],
      temperature: options.temperature,
      max_tokens: options.maxTokens,
      stream: false,
    });
    const msg = res.choices[0];
    const usage = res.usage!;
    const inputCost = (usage.prompt_tokens / 1000) * (this.models.find(m => m.id === options.model)?.inputCostPer1kTokens ?? 0);
    const outputCost = (usage.completion_tokens / 1000) * (this.models.find(m => m.id === options.model)?.outputCostPer1kTokens ?? 0);
    return {
      id: res.id,
      model: res.model,
      content: msg.message.content ?? "",
      usage: {
        promptTokens: usage.prompt_tokens,
        completionTokens: usage.completion_tokens,
        totalTokens: usage.total_tokens,
        estimatedCostUsd: inputCost + outputCost,
      },
      finishReason: (msg.finish_reason as ChatResponse["finishReason"]) ?? "stop",
    };
  }

  async *stream(options: ChatOptions): AsyncGenerator<StreamChunk> {
    const stream = await this.client.chat.completions.create({
      model: options.model,
      messages: options.messages as OpenAI.Chat.ChatCompletionMessageParam[],
      temperature: options.temperature,
      max_tokens: options.maxTokens,
      stream: true,
      stream_options: { include_usage: true },
    });
    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content ?? "";
      const done = chunk.choices[0]?.finish_reason === "stop";
      yield { delta, done, usage: done && chunk.usage ? {
        promptTokens: chunk.usage.prompt_tokens,
        completionTokens: chunk.usage.completion_tokens,
        totalTokens: chunk.usage.total_tokens,
        estimatedCostUsd: 0,
      } : undefined };
    }
  }

  async embed(options: EmbeddingOptions): Promise<EmbeddingResponse> {
    const res = await this.client.embeddings.create({
      model: options.model || "text-embedding-3-small",
      input: options.input,
    });
    return {
      embeddings: res.data.map(d => d.embedding),
      usage: { totalTokens: res.usage.total_tokens },
    };
  }

  async listModels(): Promise<AIModel[]> {
    return this.models;
  }
}
