import { AIProvider, ChatOptions, ChatResponse, EmbeddingOptions, EmbeddingResponse, StreamChunk } from "./types";

export class DevonzAI {
  private providers = new Map<string, AIProvider>();
  private defaultProvider: string | null = null;

  register(provider: AIProvider): this {
    this.providers.set(provider.name, provider);
    if (!this.defaultProvider) this.defaultProvider = provider.name;
    return this;
  }

  use(providerName: string): this {
    if (!this.providers.has(providerName)) {
      throw new Error(`Provider "${providerName}" not registered`);
    }
    this.defaultProvider = providerName;
    return this;
  }

  private get provider(): AIProvider {
    if (!this.defaultProvider) throw new Error("No AI provider registered");
    return this.providers.get(this.defaultProvider)!;
  }

  async chat(options: ChatOptions): Promise<ChatResponse> {
    return this.provider.chat(options);
  }

  async *stream(options: ChatOptions): AsyncGenerator<StreamChunk> {
    yield* this.provider.stream({ ...options, stream: true });
  }

  async embed(options: EmbeddingOptions): Promise<EmbeddingResponse> {
    return this.provider.embed(options);
  }

  async listModels(providerName?: string) {
    const p = providerName ? this.providers.get(providerName) : this.provider;
    if (!p) throw new Error(`Provider not found`);
    return p.listModels();
  }

  listProviders(): string[] {
    return Array.from(this.providers.keys());
  }
}
