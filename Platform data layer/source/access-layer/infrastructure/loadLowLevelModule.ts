import type { DomainOptions } from "../types";

declare const require: any;
declare const window: any;

export function loadLowLevelModule(): any {
  if (typeof window !== "undefined" && window.FieldPlatformDatabase && window.FieldPlatformSeed && window.FieldPlatformCalculations) {
    return {
      createPlatformDataLayer: (options: DomainOptions = {}) => window.FieldPlatformDatabase.createDataLayer({
        seedFactory: window.FieldPlatformSeed.createInitialPlatformSnapshot,
        calculations: window.FieldPlatformCalculations,
        ...options
      })
    };
  }

  if (typeof require === "function") {
    return require("../../index");
  }

  return null;
}
