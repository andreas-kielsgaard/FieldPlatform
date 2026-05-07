export function createDataLayer(options?: {}): {
    database: {
        collectionNames: () => any[];
        getSnapshot: () => any;
        replaceSnapshot: (nextSnapshot: any) => any;
        resetDatabase: (nextSeed?: null) => any;
        subscribe: (listener: any) => () => boolean;
        list: (collectionName: any, options?: {}) => any;
        get: (collectionName: any, id: any) => any;
        find: (collectionName: any, predicate: any) => any;
        create: (collectionName: any, record: any, options?: {}) => any;
        update: (collectionName: any, id: any, patchOrUpdater: any) => any;
        remove: (collectionName: any, id: any) => any;
        replaceCollection: (collectionName: any, records: any) => any;
        transaction: (mutator: any) => any;
    };
    queries: any;
    calculations: any;
    resetDatabase: (nextSeed?: null) => any;
    getSnapshot: () => any;
};
export const createMemoryAdapter: any;
export const createLocalStorageAdapter: any;
export const normalizeSnapshot: any;
