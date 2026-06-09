export function createDefaultAdapter(storageKey: any): {
    read: () => any;
    write: (snapshot: any) => void;
    clear: () => void;
};
export function createMemoryAdapter(initialSnapshot?: null): {
    read: () => any;
    write: (snapshot: any) => void;
    clear: () => void;
};
export function createLocalStorageAdapter(storageKey?: any): {
    read: () => any;
    write: (snapshot: any) => void;
    clear: () => void;
};
