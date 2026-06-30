import { fieldPlatformContextAdapterConfig } from "./field-platform-adapter-config.mjs";

export const DEFAULT_CONTEXT_ADAPTER_CONFIG_SOURCE =
  "tools/agent-tools/src/context/adapters/field-platform-adapter-config.mjs";

export const defaultContextAdapter = Object.freeze({
  adapterConfig: fieldPlatformContextAdapterConfig,
  configSource: DEFAULT_CONTEXT_ADAPTER_CONFIG_SOURCE,
});

export function resolveContextAdapter({ adapterConfig, configSource } = {}) {
  if (adapterConfig) {
    return Object.freeze({
      adapterConfig,
      configSource: configSource ?? null,
    });
  }

  return defaultContextAdapter;
}

export function resolveDefaultContextAdapterConfig() {
  return defaultContextAdapter.adapterConfig;
}
