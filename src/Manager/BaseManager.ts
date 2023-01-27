import { IManager } from "../Types";
import { Collection } from "../Adapter/DefaultCacheAdapter";
import { Client } from "../Clients/Client";

export abstract class BaseManager<T> implements IManager<T> {
	public client: Client;
	public cache = new Collection<T>();

	public constructor(client: Client) {
		this.client = client;
	}
	public set(key: string, data: T) {
		return void this.cache.set(key, data);
	}
	public get(key: string) {
		return this.cache.get(key);
	}
	public delete(key: string) {
		return this.cache.delete(key);
	}
	public abstract fetch(key: string): Promise<void>;
}
