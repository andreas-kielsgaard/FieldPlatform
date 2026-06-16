"use strict";
const FieldPlatformStorageAdapters = (() => {
    const { clone } = getUtils();
    const { DEFAULT_STORAGE_KEY } = getConfig();
    function createDefaultAdapter(storageKey) {
        if (typeof window !== "undefined" && window.localStorage) {
            return createLocalStorageAdapter(storageKey);
        }
        return createMemoryAdapter();
    }
    function createMemoryAdapter(initialSnapshot = null) {
        let value = initialSnapshot ? clone(initialSnapshot) : null;
        return {
            read: () => clone(value),
            write: snapshot => {
                value = clone(snapshot);
            },
            clear: () => {
                value = null;
            }
        };
    }
    function createLocalStorageAdapter(storageKey = DEFAULT_STORAGE_KEY) {
        return {
            read: () => {
                const stored = window.localStorage.getItem(storageKey);
                return stored ? JSON.parse(stored) : null;
            },
            write: snapshot => {
                window.localStorage.setItem(storageKey, JSON.stringify(snapshot));
            },
            clear: () => {
                window.localStorage.removeItem(storageKey);
            }
        };
    }
    function getUtils() {
        if (typeof require === "function")
            return require("./utils");
        return window.FieldPlatformDatabaseUtils;
    }
    function getConfig() {
        if (typeof require === "function")
            return require("./collectionConfig");
        return window.FieldPlatformCollectionConfig;
    }
    return {
        createDefaultAdapter,
        createMemoryAdapter,
        createLocalStorageAdapter
    };
})();
if (typeof window !== "undefined") {
    window.FieldPlatformStorageAdapters = FieldPlatformStorageAdapters;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = FieldPlatformStorageAdapters;
}
