import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDirectory, "../../..");
const config = require(path.join(workspaceRoot, "dependency-cruiser.config.cjs"));

const cases = [
  {
    name: "route imports module public index",
    from: "apps/web/app/routes/communities.$slug.tsx",
    to: "apps/web/src/modules/communities/index.ts",
    violations: [],
  },
  {
    name: "route imports shared ui public index",
    from: "apps/web/app/routes/communities.$slug.tsx",
    to: "apps/web/src/shared/ui/index.ts",
    violations: [],
  },
  {
    name: "route imports generated React Router route types",
    from: "apps/web/app/routes/communities.$slug.tsx",
    to: "./+types/communities.$slug",
    couldNotResolve: true,
    violations: [],
  },
  {
    name: "route config imports React Router route helper",
    from: "apps/web/app/routes.ts",
    to: "@react-router/dev/routes",
    couldNotResolve: true,
    violations: [],
  },
  {
    name: "route cannot import shared policy",
    from: "apps/web/app/routes/communities.$slug.tsx",
    to: "apps/web/src/shared/policy/index.ts",
    violations: ["routes-import-only-approved-boundaries"],
  },
  {
    name: "route cannot import shared db",
    from: "apps/web/app/routes/communities.$slug.tsx",
    to: "apps/web/src/shared/db/index.ts",
    violations: ["routes-import-only-approved-boundaries", "routes-do-not-import-db"],
  },
  {
    name: "route cannot deep import module domain",
    from: "apps/web/app/routes/communities.$slug.tsx",
    to: "apps/web/src/modules/communities/domain/community.ts",
    violations: ["routes-import-only-approved-boundaries", "routes-do-not-deep-import-modules"],
  },
  {
    name: "domain cannot import persistence",
    from: "apps/web/src/modules/communities/domain/community.ts",
    to: "apps/web/src/modules/communities/persistence/community-repository.ts",
    violations: ["domain-layer-stays-pure"],
  },
  {
    name: "contracts cannot import db",
    from: "apps/web/src/modules/communities/contracts/community-contract.ts",
    to: "apps/web/src/shared/db/index.ts",
    violations: ["contracts-layer-stays-boundary-only"],
  },
  {
    name: "application cannot import db directly",
    from: "apps/web/src/modules/communities/application/get-community.ts",
    to: "apps/web/src/shared/db/index.ts",
    violations: ["application-layer-uses-ports-not-delivery-or-db"],
  },
  {
    name: "persistence can import shared db",
    from: "apps/web/src/modules/communities/persistence/community-repository.ts",
    to: "apps/web/src/shared/db/index.ts",
    violations: [],
  },
  {
    name: "persistence cannot import UI",
    from: "apps/web/src/modules/communities/persistence/community-repository.ts",
    to: "apps/web/src/modules/communities/ui/community-card.tsx",
    violations: ["persistence-layer-stays-behind-application"],
  },
  {
    name: "UI can import React",
    from: "apps/web/src/modules/communities/ui/community-card.tsx",
    to: "node_modules/.pnpm/react@19.2.7/node_modules/react/index.js",
    violations: [],
  },
  {
    name: "UI cannot import policy",
    from: "apps/web/src/modules/communities/ui/community-card.tsx",
    to: "apps/web/src/shared/policy/index.ts",
    violations: ["ui-does-not-import-policy-engines"],
  },
  {
    name: "UI cannot import server auth internals",
    from: "apps/web/src/modules/communities/ui/community-card.tsx",
    to: "apps/web/src/shared/auth/session.server.ts",
    violations: ["ui-does-not-import-server-auth"],
  },
  {
    name: "module can import another module public index",
    from: "apps/web/src/modules/communities/application/get-community.ts",
    to: "apps/web/src/modules/visibility/index.ts",
    violations: [],
  },
  {
    name: "module cannot deep import another module",
    from: "apps/web/src/modules/communities/application/get-community.ts",
    to: "apps/web/src/modules/visibility/domain/scope.ts",
    violations: ["modules-do-not-deep-import-other-modules"],
  },
  {
    name: "runtime cannot import generated Agent OS artifacts",
    from: "apps/web/src/modules/communities/index.ts",
    to: "Agent OS/tool-maintained-files/indexes/path-index.json",
    violations: ["runtime-does-not-import-agent-os-generated-artifacts"],
  },
  {
    name: "ordinary unresolved imports are blocked",
    from: "apps/web/src/modules/communities/index.ts",
    to: "missing-package",
    couldNotResolve: true,
    violations: ["not-to-unresolvable"],
  },
];

const forbiddenRules = config.forbidden.filter((rule) => rule.severity === "error");
const failures = [];

for (const testCase of cases) {
  const actualViolations = violationsFor(testCase);
  const unexpectedViolations = actualViolations.filter(
    (violation) => !testCase.violations.includes(violation),
  );
  const missingViolations = testCase.violations.filter(
    (violation) => !actualViolations.includes(violation),
  );

  if (unexpectedViolations.length > 0 || missingViolations.length > 0) {
    failures.push({
      name: testCase.name,
      expected: testCase.violations,
      actual: actualViolations,
      unexpected: unexpectedViolations,
      missing: missingViolations,
    });
  }
}

if (failures.length > 0) {
  console.error("Boundary rule validation failed.");
  for (const failure of failures) {
    console.error(`\n${failure.name}`);
    console.error(`  expected: ${formatList(failure.expected)}`);
    console.error(`  actual:   ${formatList(failure.actual)}`);
    if (failure.missing.length > 0) {
      console.error(`  missing:  ${formatList(failure.missing)}`);
    }
    if (failure.unexpected.length > 0) {
      console.error(`  extra:    ${formatList(failure.unexpected)}`);
    }
  }
  process.exitCode = 1;
} else {
  console.log(`Boundary rule validation passed (${cases.length} cases).`);
}

function violationsFor(testCase) {
  return forbiddenRules
    .filter((rule) => ruleMatches(rule, testCase))
    .map((rule) => rule.name)
    .sort();
}

function ruleMatches(rule, testCase) {
  const fromMatch = endpointMatches(
    rule.from ?? {},
    {
      path: normalizePath(testCase.from),
      circular: Boolean(testCase.circular),
      couldNotResolve: Boolean(testCase.fromCouldNotResolve),
    },
    [],
    true,
  );

  if (!fromMatch.matches) {
    return false;
  }

  const toMatch = endpointMatches(
    rule.to ?? {},
    {
      path: normalizePath(testCase.to),
      circular: Boolean(testCase.circular),
      couldNotResolve: Boolean(testCase.couldNotResolve),
    },
    fromMatch.captures,
  );

  return toMatch.matches;
}

function endpointMatches(criteria, endpoint, captures = [], collectCaptures = false) {
  if (criteria.path !== undefined) {
    const match = patternMatch(criteria.path, endpoint.path, captures);
    if (!match) {
      return { matches: false, captures: [] };
    }
    if (collectCaptures) {
      captures = match.slice(1);
    }
  }

  if (criteria.pathNot !== undefined && patternMatch(criteria.pathNot, endpoint.path, captures)) {
    return { matches: false, captures: [] };
  }

  if (criteria.circular !== undefined && criteria.circular !== endpoint.circular) {
    return { matches: false, captures: [] };
  }

  if (
    criteria.couldNotResolve !== undefined &&
    criteria.couldNotResolve !== endpoint.couldNotResolve
  ) {
    return { matches: false, captures: [] };
  }

  return { matches: true, captures };
}

function patternMatch(pattern, value, captures) {
  return new RegExp(substituteCaptures(pattern, captures)).exec(value);
}

function substituteCaptures(pattern, captures) {
  return pattern.replaceAll(/\$(\d+)/g, (_match, index) =>
    escapeRegExp(captures[Number(index) - 1] ?? ""),
  );
}

function escapeRegExp(value) {
  return value.replaceAll(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}

function normalizePath(value) {
  return value.replaceAll("\\", "/");
}

function formatList(values) {
  return values.length > 0 ? values.join(", ") : "(none)";
}
