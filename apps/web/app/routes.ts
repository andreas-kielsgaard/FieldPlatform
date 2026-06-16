import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("./routes/_index.tsx"),
  route("communities", "./routes/communities._index.tsx"),
  route("communities/:slug", "./routes/communities.$slug.tsx"),
  route("events/:slug", "./routes/events.$slug.tsx"),
  route("signals", "./routes/signals._index.tsx"),
  route("profile/:handle", "./routes/profile.$handle.tsx"),
  route("steward/dashboard", "./routes/steward/dashboard.tsx"),
] satisfies RouteConfig;
