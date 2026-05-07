declare const require: any;
declare const module: any;

const seed = require("./database-definition/seed");
const calculations = require("./calculation-layer/calculations");
const database = require("./database-engine/database");

export function createPlatformDataLayer(options: Record<string, unknown> = {}) {
  return database.createDataLayer({
    seedFactory: seed.createInitialPlatformSnapshot,
    calculations,
    ...options
  });
}

export const createInitialPlatformSnapshot = seed.createInitialPlatformSnapshot;
export { calculations, database };
export { createPlatformDomain, PlatformDomain } from "./access-layer/domain";
export * from "./access-layer/domain";

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    createPlatformDataLayer,
    createInitialPlatformSnapshot: seed.createInitialPlatformSnapshot,
    calculations,
    database,
    get domain() {
      return require("./access-layer/domain");
    }
  };
}
