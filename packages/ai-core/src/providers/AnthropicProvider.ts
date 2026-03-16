import Anthropic from "@anthropic-ai/sdk";
import { AIModel, AIProvider, ChatOptions, ChatResponse, EmbeddingOptions, EmbeddingResponse, StreamChunk } from "../types";

export class AnthropicProvider implements AIProvider {
  readonly name = "anthropic";
  private client: Anthropic;

  readonly models: AIModel[] = [
    { id: "claude-opus-4-5", name: "Claude Opus 4.5", contextWindow: 200000, supportsVision: true, supportsTools: true, inputCostPer1kTokens: 0.015, outputCostPer1kTokens: 0.075 },
    { id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5", contextWindow: 200000, supportsVision: true, supportsTools: true, inputCostPer1kTokens: 0.003, outputCostPer1kTokens: 0.015 },
    { id: "claude-3-5-haiku-latest", name: "Claude 3.5 Haiku", contextWindow: 200000, supportsVision: true, supportsTools: true, inputCostPer1kTokens: 0.00025, outputCostPer1kTokens: 0.00125 },
  ];

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async chat(options: ChatOptions): Promise<ChatResponse> {
    const system = options.systemPrompt || options.messages.find(m => m.role === "system")?.content;
    const messages = options.messages.filter(m => m.role !== "system") as Anthropic.MessageParam[];
    const res = await this.client.messages.create({
      model: options.model,
      max_tokens: options.maxTokens ?? 4096,
      temperature: options.temperature,
      system,
      messages,
    });
    const content = res.content.filter(b => b.type === "text").map(b => (b as Anthropic.TextBlock).text).join("");
    const model = this.models.find(m => m.id === options.model);
    return {
      id: res.id,
      model: res.model,
      content,
      usage: {
        promptTokens: res.usage.input_tokens,
        completionTokens: res.usage.output_tokens,
        totalTokens: res.usage.input_tokens + res.usage.output_tokens,
        estimatedCostUsd: (res.usage.input_tokens / 1000) * (model?.inputCostPer1kTokens ?? 0) + (res.usage.output_tokens / 1000) * (model?.outputCostPer1kTokens ?? 0),
      },
      finishReason: res.stop_reason === "end_turn" ? "stop" : "length",
    };
  }

  async *stream(options: ChatOptions): AsyncGenerator<StreamChunk> {
    const system = options.systemPrompt || options.messages.find(m => m.role === "system")?.content;
    const messages = options.messages.filter(m => m.role !== "system") as Anthropic.MessageParam[];
    const stream = this.client.messages.stream({
      model: options.model,
      max_tokens: options.maxTokens ?? 4096,
      temperature: options.temperature,
      system,
      messages,
    });
    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        yield { delta: event.delta.text, done: false };
      } else if (event.type === "message_stop") {
        yield { delta: "", done: true };
      }
    }
  }

  async embed(_options: EmbeddingOptions): Promise<EmbeddingResponse> {
    throw new Error("Anthropic does not support embeddings. Use OpenAI or Gemini instead.");
  }

  async listModels(): Promise<AIModel[]> {
    return this.models;
  }
}
