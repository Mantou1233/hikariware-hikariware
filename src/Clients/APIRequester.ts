import { Requester } from "./Requester";
import { AxiosRequestConfig } from "axios";
const noop = () => {}; // eslint-disable-line no-empty-function
const methods = ["get", "post", "delete", "patch", "put"] as const;
const reflectors = [
	"toString",
	"valueOf",
	"inspect",
	"constructor",
	Symbol.toPrimitive,
	Symbol.for("nodejs.util.inspect.custom")
];

function buildRoute(requester: Requester) {
	const route = [""];
	const handler = {
		get(target, name) {
			if (reflectors.includes(name)) return () => route.join("/");
			if (methods.includes(name)) {
				const routeBucket = [];
				for (let i = 0; i < route.length; i++) {
					// Reactions routes and sub-routes all share the same bucket
					if (route[i - 1] === "reactions") break;
					// Literal ids should only be taken account if they are the Major id (the Channel/Guild id)
					if (
						/\d{16,19}/g.test(route[i]) &&
						!/channels|guilds/.test(route[i - 1])
					)
						routeBucket.push(":id");
					// All other parts of the route should be considered as part of the bucket identifier
					else routeBucket.push(route[i]);
				}
				return (dataOrOptions, options) => {
					if (["post", "patch", "put"].includes(name)) {
						return requester.baseURLRequester[
							name as (typeof methods)[number]
						](route.join("/"), dataOrOptions, {
							...(options || {})
						}).then(({ data }) => data);
					}
					return requester.baseURLRequester[
						name as (typeof methods)[number]
					](route.join("/"), {
						...(dataOrOptions || {})
					}).then(({ data }) => data);
				};
			}
			route.push(...name.split("/").filter(x => x.trim() != ""));
			return new Proxy(noop, handler);
		},
		apply(target, _, args: string[]) {
			route.push(
				...args
					.filter(x => x != null)
					.flatMap(v => v.split("/").filter(x => x.trim() != ""))
			);
			return new Proxy(noop, handler);
		}
	};
	return new Proxy(noop, handler);
}

type APIRouteType = ({
	[K in "get" | "delete"]: (options?: AxiosRequestConfig) => any;
} & {
	[K in "post" | "patch" | "put"]: (
		data?: any,
		options?: AxiosRequestConfig
	) => any;
} & {
	[key: string]: APIRouteType;
}) &
	((...args: string[]) => APIRouteType);

export { buildRoute, APIRouteType };
