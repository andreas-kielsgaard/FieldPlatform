const FieldPlatformDatabase = (() => {
  const { DEFAULT_STORAGE_KEY, assertCollection, collectionNames } = getConfig();
  const { createDefaultAdapter, createLocalStorageAdapter, createMemoryAdapter } = getAdapters();
  const { clone, matchesFilter, sortRecords } = getUtils();
  const { withId } = getRecordFactory();
  const { normalizeSnapshot } = getSnapshotNormalizer();
  const { createQueryApi } = getQueryApi();
  const { createCalculationApi } = getCalculationApi();

  function createDataLayer(options = {}) {
    const seedFactory = options.seedFactory || getGlobalSeedFactory();
    if (!seedFactory) {
      throw new Error("FieldPlatformDatabase requires a seedFactory or FieldPlatformSeed.createInitialPlatformSnapshot.");
    }

    const calculations = options.calculations || getGlobalCalculations();
    if (!calculations) {
      throw new Error("FieldPlatformDatabase requires calculations or FieldPlatformCalculations.");
    }

    const adapter = options.adapter || createDefaultAdapter(options.storageKey || DEFAULT_STORAGE_KEY);
    let snapshot = normalizeSnapshot(adapter.read() || options.initialSnapshot || seedFactory());
    const listeners = new Set();

    const database = {
      collectionNames: () => [...collectionNames],
      getSnapshot,
      replaceSnapshot,
      resetDatabase,
      subscribe,
      list,
      get,
      find,
      create,
      update,
      remove,
      replaceCollection,
      transaction
    };

    const queries = createQueryApi(database);
    const calculationApi = createCalculationApi(database, queries, calculations);

    persist();

    return {
      database,
      queries,
      calculations: calculationApi,
      resetDatabase,
      getSnapshot
    };

    function getSnapshot() {
      return clone(snapshot);
    }

    function replaceSnapshot(nextSnapshot) {
      snapshot = normalizeSnapshot(nextSnapshot);
      persist();
      return getSnapshot();
    }

    function resetDatabase(nextSeed = null) {
      snapshot = normalizeSnapshot(nextSeed || seedFactory());
      persist();
      return getSnapshot();
    }

    function subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }

    function list(collectionName, options = {}) {
      assertCollection(collectionName);
      let records = clone(snapshot[collectionName]);
      if (options.filter) records = records.filter(record => matchesFilter(record, options.filter));
      if (options.sortBy) records = sortRecords(records, options.sortBy, options.direction);
      if (typeof options.limit === "number") records = records.slice(0, options.limit);
      return records;
    }

    function get(collectionName, id) {
      assertCollection(collectionName);
      const record = snapshot[collectionName].find(item => item && item.id === id);
      return record ? clone(record) : null;
    }

    function find(collectionName, predicate) {
      assertCollection(collectionName);
      const record = snapshot[collectionName].find(predicate);
      return record ? clone(record) : null;
    }

    function create(collectionName, record, options = {}) {
      assertCollection(collectionName);
      const nextRecord = withId(collectionName, record, options.idPrefix);
      mutate(draft => {
        ensureUniqueId(draft, collectionName, nextRecord.id);
        draft[collectionName].push(nextRecord);
      });
      return clone(nextRecord);
    }

    function update(collectionName, id, patchOrUpdater) {
      assertCollection(collectionName);
      let updated = null;
      mutate(draft => {
        const index = draft[collectionName].findIndex(item => item.id === id);
        if (index < 0) throw new Error(`Cannot update missing ${collectionName} record: ${id}`);
        const current = draft[collectionName][index];
        const patch = typeof patchOrUpdater === "function" ? patchOrUpdater(clone(current)) : patchOrUpdater;
        updated = { ...current, ...patch, id };
        draft[collectionName][index] = updated;
      });
      return clone(updated);
    }

    function remove(collectionName, id) {
      assertCollection(collectionName);
      let removed = null;
      mutate(draft => {
        const index = draft[collectionName].findIndex(item => item.id === id);
        if (index < 0) return;
        removed = draft[collectionName][index];
        draft[collectionName].splice(index, 1);
      });
      return removed ? clone(removed) : null;
    }

    function replaceCollection(collectionName, records) {
      assertCollection(collectionName);
      mutate(draft => {
        draft[collectionName] = records.map(record => withId(collectionName, record));
      });
      return list(collectionName);
    }

    function transaction(mutator) {
      const draft = clone(snapshot);
      const result = mutator(draft);
      snapshot = normalizeSnapshot(draft);
      persist();
      return result === undefined ? getSnapshot() : clone(result);
    }

    function mutate(mutator) {
      const draft = clone(snapshot);
      mutator(draft);
      snapshot = normalizeSnapshot(draft);
      persist();
    }

    function persist() {
      adapter.write(snapshot);
      listeners.forEach(listener => listener(getSnapshot()));
    }
  }

  function ensureUniqueId(snapshot, collectionName, id) {
    if (snapshot[collectionName].some(record => record.id === id)) {
      throw new Error(`Duplicate ${collectionName} id: ${id}`);
    }
  }

  function getGlobalSeedFactory() {
    if (typeof window !== "undefined" && window.FieldPlatformSeed) {
      return window.FieldPlatformSeed.createInitialPlatformSnapshot;
    }
    return null;
  }

  function getGlobalCalculations() {
    if (typeof window !== "undefined" && window.FieldPlatformCalculations) {
      return window.FieldPlatformCalculations;
    }
    return null;
  }

  function getConfig() {
    if (typeof require === "function") return require("./collectionConfig");
    return window.FieldPlatformCollectionConfig;
  }

  function getAdapters() {
    if (typeof require === "function") return require("./adapters");
    return window.FieldPlatformStorageAdapters;
  }

  function getUtils() {
    if (typeof require === "function") return require("./utils");
    return window.FieldPlatformDatabaseUtils;
  }

  function getRecordFactory() {
    if (typeof require === "function") return require("./recordFactory");
    return window.FieldPlatformRecordFactory;
  }

  function getSnapshotNormalizer() {
    if (typeof require === "function") return require("./snapshotNormalizer");
    return window.FieldPlatformSnapshotNormalizer;
  }

  function getQueryApi() {
    if (typeof require === "function") return require("./queryApi");
    return window.FieldPlatformQueryApi;
  }

  function getCalculationApi() {
    if (typeof require === "function") return require("./calculationApi");
    return window.FieldPlatformCalculationApi;
  }

  return {
    createDataLayer,
    createMemoryAdapter,
    createLocalStorageAdapter,
    normalizeSnapshot
  };
})();

if (typeof window !== "undefined") {
  window.FieldPlatformDatabase = FieldPlatformDatabase;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = FieldPlatformDatabase;
}
