const routeModulePath = "^apps/web/app/routes/.+[.][cm]?[jt]sx?$";
const moduleLayerPath =
  "^apps/web/src/modules/[^/]+/(application|contracts|domain|persistence|ui)/";
const moduleUiPath = "^apps/web/src/modules/[^/]+/ui/";
const runtimePath = "^apps/web/(app|src)/";
const sharedUiOrModuleUiPath = "^apps/web/src/(shared/ui|modules/[^/]+/ui)/";
const sharedDbPath = "^apps/web/src/shared/db/";
const sharedPolicyPath = "^apps/web/src/shared/policy/";
const sharedServerAuthPath = "^apps/web/src/shared/auth/(.+[.]server[.]|server/)";
const modulePersistencePath = "^apps/web/src/modules/[^/]+/persistence/";
const reactPackagesPath =
  "^(react|react-dom|react-router|@react-router/)|^node_modules/[.]pnpm/(react|react-dom|react-router)@|^node_modules/[.]pnpm/@react-router[+]|^node_modules/(react|react-dom|react-router|@react-router)(/|$)";
const reactRouterPackagesPath =
  "^(react-router|@react-router/)|^node_modules/[.]pnpm/react-router@|^node_modules/[.]pnpm/@react-router[+]|^node_modules/(react-router|@react-router)(/|$)";

const routeAllowedTargetPath =
  "^(apps/web/src/modules/[^/]+/index[.]ts|apps/web/src/shared/(auth|contracts|config|ui)/index[.]ts|[.]/[+]types/.+)$";

/** @type {import("dependency-cruiser").IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: "not-to-unresolvable",
      comment:
        "Every import should resolve, except React Router generated route types and the route config helper that dependency-cruiser cannot resolve from source.",
      severity: "error",
      from: {},
      to: {
        couldNotResolve: true,
        pathNot: "^([.]/[+]types/.+|@react-router/dev/routes)$",
      },
    },
    {
      name: "routes-import-only-approved-boundaries",
      comment:
        "Route modules stay delivery-only: generated route types, module public entrypoints, and approved shared public boundaries only.",
      severity: "error",
      from: {
        path: routeModulePath,
      },
      to: {
        pathNot: routeAllowedTargetPath,
      },
    },
    {
      name: "routes-do-not-import-db",
      comment: "Route modules stay delivery-only and must not reach into the database boundary.",
      severity: "error",
      from: {
        path: routeModulePath,
      },
      to: {
        path: sharedDbPath,
      },
    },
    {
      name: "routes-do-not-import-persistence",
      comment: "Routes call module public entrypoints, not persistence internals.",
      severity: "error",
      from: {
        path: routeModulePath,
      },
      to: {
        path: modulePersistencePath,
      },
    },
    {
      name: "routes-do-not-deep-import-modules",
      comment: "Routes consume module index files as the public interface.",
      severity: "error",
      from: {
        path: routeModulePath,
      },
      to: {
        path: moduleLayerPath,
      },
    },
    {
      name: "domain-layer-stays-pure",
      comment:
        "Domain code owns invariants and must not depend on routes, persistence, UI, auth, policy, database, or framework runtime.",
      severity: "error",
      from: {
        path: "^apps/web/src/modules/[^/]+/domain/",
      },
      to: {
        path: "^(apps/web/app/|apps/web/src/shared/(db|auth|policy)/|apps/web/src/modules/[^/]+/(application|persistence|ui)/)",
      },
    },
    {
      name: "contracts-layer-stays-boundary-only",
      comment:
        "Contracts can use validation and stable shared contract helpers, not routes, UI, persistence, database, auth, policy, domain, application, or framework runtime.",
      severity: "error",
      from: {
        path: "^apps/web/src/modules/[^/]+/contracts/",
      },
      to: {
        path: "^(apps/web/app/|apps/web/src/shared/(db|auth|policy|ui)/|apps/web/src/modules/[^/]+/(application|domain|persistence|ui)/)",
      },
    },
    {
      name: "application-layer-uses-ports-not-delivery-or-db",
      comment:
        "Application code coordinates module behavior through domain, contracts, persistence interfaces, and policy, without route, UI, direct database, auth-provider, or framework coupling.",
      severity: "error",
      from: {
        path: "^apps/web/src/modules/[^/]+/application/",
      },
      to: {
        path: `^(apps/web/app/|${sharedDbPath}|${sharedServerAuthPath}|${moduleUiPath})`,
      },
    },
    {
      name: "persistence-layer-stays-behind-application",
      comment:
        "Persistence code may use shared db and same-module domain/contracts, but must not depend on delivery, UI, or application orchestration.",
      severity: "error",
      from: {
        path: "^apps/web/src/modules/[^/]+/persistence/",
      },
      to: {
        path: "^(apps/web/app/|apps/web/src/modules/[^/]+/(application|ui)/)",
      },
    },
    {
      name: "ui-does-not-import-db",
      comment: "UI remains presentation-only and must not import database clients or schema.",
      severity: "error",
      from: {
        path: sharedUiOrModuleUiPath,
      },
      to: {
        path: sharedDbPath,
      },
    },
    {
      name: "ui-does-not-import-persistence",
      comment: "UI must not bypass application services by importing persistence internals.",
      severity: "error",
      from: {
        path: sharedUiOrModuleUiPath,
      },
      to: {
        path: modulePersistencePath,
      },
    },
    {
      name: "ui-does-not-import-server-auth",
      comment: "UI can consume view state but not server-only auth internals.",
      severity: "error",
      from: {
        path: sharedUiOrModuleUiPath,
      },
      to: {
        path: sharedServerAuthPath,
      },
    },
    {
      name: "ui-does-not-import-policy-engines",
      comment:
        "Visibility and authorization decisions belong behind policy/application boundaries.",
      severity: "error",
      from: {
        path: sharedUiOrModuleUiPath,
      },
      to: {
        path: sharedPolicyPath,
      },
    },
    {
      name: "ui-does-not-import-routes-or-router-primitives",
      comment: "Reusable UI must not couple itself to route files or React Router primitives.",
      severity: "error",
      from: {
        path: sharedUiOrModuleUiPath,
      },
      to: {
        path: `^(apps/web/app/|${reactRouterPackagesPath})`,
      },
    },
    {
      name: "modules-do-not-import-route-files",
      comment: "Module code must not depend on React Router delivery files.",
      severity: "error",
      from: {
        path: "^apps/web/src/modules/",
      },
      to: {
        path: "^apps/web/app/",
      },
    },
    {
      name: "modules-do-not-import-react-router-primitives",
      comment:
        "React Router request, response, and navigation primitives stay in route or shared delivery boundaries.",
      severity: "error",
      from: {
        path: "^apps/web/src/modules/",
      },
      to: {
        path: reactRouterPackagesPath,
      },
    },
    {
      name: "non-ui-module-layers-do-not-import-react",
      comment: "React component runtime belongs in module UI, shared UI, or route components.",
      severity: "error",
      from: {
        path: "^apps/web/src/modules/[^/]+/(application|contracts|domain|persistence)/",
      },
      to: {
        path: reactPackagesPath,
      },
    },
    {
      name: "modules-do-not-deep-import-other-modules",
      comment: "Cross-module imports must go through each module's public index.",
      severity: "error",
      from: {
        path: "^apps/web/src/modules/([^/]+)/.+",
      },
      to: {
        path: "^apps/web/src/modules/[^/]+/",
        pathNot: "^apps/web/src/modules/$1/|^apps/web/src/modules/[^/]+/index[.]ts$",
      },
    },
    {
      name: "runtime-does-not-import-agent-os",
      comment: "Agent OS is operating guidance and must not become product runtime source.",
      severity: "error",
      from: {
        path: runtimePath,
      },
      to: {
        path: "(^|/)(Agent OS|[.]agent-os)/(?:upstream|adapter)/",
      },
    },
  ],
  options: {
    doNotFollow: {
      path: "node_modules|apps/web/build|apps/web/.react-router",
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: "tsconfig.depcruise.json",
    },
    enhancedResolveOptions: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    reporterOptions: {
      dot: {
        collapsePattern: "node_modules/[^/]+",
      },
    },
  },
};
