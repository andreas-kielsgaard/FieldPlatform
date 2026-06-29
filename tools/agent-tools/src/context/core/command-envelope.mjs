export const COMMAND_ENVELOPE_SCHEMA_VERSION = "agent-os.context.command-envelope@0.1.0";
export const CONTEXT_COMMAND_NAMESPACE = "agent-os context";

export function createCommandEnvelope({
  name,
  generatedAt,
  adapterId = null,
  status = "ok",
  data,
  warnings = [],
  limitations = [],
}) {
  const command = {
    namespace: CONTEXT_COMMAND_NAMESPACE,
    name,
    generatedAt,
  };

  if (adapterId) {
    command.adapterId = adapterId;
  }

  return {
    schemaVersion: COMMAND_ENVELOPE_SCHEMA_VERSION,
    command,
    status,
    data,
    warnings,
    limitations,
  };
}
