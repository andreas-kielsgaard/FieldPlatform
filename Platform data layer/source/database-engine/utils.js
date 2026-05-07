const FieldPlatformDatabaseUtils = (() => {
  function clone(value) {
    if (value === null || value === undefined) return value;
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function unique(items) {
    return Array.from(new Set(items || []));
  }

  function pushUnique(items, item) {
    if (!items.includes(item)) items.push(item);
  }

  function generateId(prefix) {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  }

  function matchesFilter(record, filter) {
    if (typeof filter === "function") return filter(record);
    return Object.entries(filter).every(([key, value]) => {
      if (Array.isArray(value)) return value.includes(record[key]);
      return record[key] === value;
    });
  }

  function sortRecords(records, sortBy, direction = "asc") {
    const factor = direction === "desc" ? -1 : 1;
    return [...records].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1 * factor;
      if (a[sortBy] > b[sortBy]) return 1 * factor;
      return 0;
    });
  }

  return {
    clone,
    unique,
    pushUnique,
    generateId,
    matchesFilter,
    sortRecords
  };
})();

if (typeof window !== "undefined") {
  window.FieldPlatformDatabaseUtils = FieldPlatformDatabaseUtils;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = FieldPlatformDatabaseUtils;
}
