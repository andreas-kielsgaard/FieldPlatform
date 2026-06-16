"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadLowLevelModule = loadLowLevelModule;
function loadLowLevelModule() {
    if (typeof window !== "undefined" && window.FieldPlatformDatabase && window.FieldPlatformSeed && window.FieldPlatformCalculations) {
        return {
            createPlatformDataLayer: (options = {}) => window.FieldPlatformDatabase.createDataLayer({
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
