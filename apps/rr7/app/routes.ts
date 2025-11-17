import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	layout("routes/layout.tsx", [
		index("routes/home.tsx"),
		route("protected", "routes/protected.tsx"),
	]),
	route("sign-in", "routes/sign-in.tsx"),
	route("api/auth/*", "routes/api.auth.$.ts"),
] satisfies RouteConfig;
