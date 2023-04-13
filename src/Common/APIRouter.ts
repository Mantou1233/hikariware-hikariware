import { Requester } from "../Clients/Requester";
import { AxiosRequestConfig, AxiosResponse } from "axios";
const noop = () => {};
const methods = [
	"get",
	"post",
	"delete",
	"head",
	"options",
	"patch",
	"put"
] as const;
const reflectors = [
	"toString",
	"valueOf",
	"inspect",
	"constructor",
	Symbol.toPrimitive,
	Symbol.for("nodejs.util.inspect.custom")
] as const;

function buildRoute(requester: Requester) {
	const route = [""];
	const handler = {
		get(target, name) {
			if (reflectors.includes(name)) return () => route.join("/");
			if (methods.includes(name)) {
				const routeBucket = [...route].filter(val => val.trim() !== "");
				return (dataOrOptions, options) => {
					if (["post", "patch", "put"].includes(name)) {
						return requester.baseURLRequester[
							name as typeof methods[number]
						](route.join("/"), dataOrOptions, {
							...(options || {})
						}).then(({ data }) => data);
					}
					return requester.baseURLRequester[
						name as typeof methods[number]
					](route.join("/"), {
						...(dataOrOptions || {})
					})
						.then(({ data }) => data)
						.catch(err => {
							throw err;
						});
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

type APIRouteType = {
	[K in keyof TRequesterRaw]: TRequesterRaw[K];
} & {
	[K in keyof typeof reflectors]: () => string;
} & (((...args: string[]) => APIRouteType) & {
		[key: string]: APIRouteType;
	});

/**
 * basically a binded instance of Axios methods with URL omiited out
 */
interface TRequesterRaw {
	get(config?: AxiosRequestConfig): AxiosResponse;
	delete(config?: AxiosRequestConfig): AxiosResponse;
	head(config?: AxiosRequestConfig): AxiosResponse;
	options(config?: AxiosRequestConfig): AxiosResponse;
	post(data?: any, config?: AxiosRequestConfig): AxiosResponse;
	put(data?: any, config?: AxiosRequestConfig): AxiosResponse;
	patch(data?: any, config?: AxiosRequestConfig): AxiosResponse;
}

export { buildRoute, APIRouteType };
