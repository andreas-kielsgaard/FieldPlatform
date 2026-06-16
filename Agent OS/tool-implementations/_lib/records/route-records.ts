import type { FileRecord } from "../types.ts";

export function buildRouteRecords(files: FileRecord[]): Record<string, unknown>[] {
  return files
    .filter((file) => /(^|\/)(app|pages|routes?)\//.test(file.path) || /(^|\/)(page|layout|route)\.[jt]sx?$/.test(file.path))
    .map((file) => {
      const segments = file.path.split("/");
      const fileName = segments.pop() || "";
      const routeSegments = segments
        .filter((segment) => !["src", "app", "pages", "routes", "route"].includes(segment))
        .filter((segment) => !segment.startsWith("("))
        .map((segment) => {
          if (segment.startsWith("[") && segment.endsWith("]")) {
            return `:${segment.slice(1, -1).replace("...", "")}`;
          }
          return segment;
        });
      const routePath = `/${routeSegments.join("/")}`.replace(/\/+/g, "/");
      return {
        file: file.path,
        route: routePath === "/" ? "/" : routePath.replace(/\/$/, ""),
        kind: fileName.split(".")[0] || "route",
        params: routeSegments.filter((segment) => segment.startsWith(":")),
        family: routeSegments[0] || "root",
      };
    });
}
