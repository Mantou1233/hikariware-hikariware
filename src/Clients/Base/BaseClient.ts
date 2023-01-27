import { GuildTextBasedChannel } from "../../DiscordTypes/GuildTextBasedChannel";
import { Message } from "../../DiscordTypes/Message";
import { ClientEvents } from "../../Types";
import { APIRouteType, buildRoute } from "../APIRequester";
import { Requester } from "../Requester";
import WebSocketManager from "../WebSocketManager";

export class BaseClient extends WebSocketManager {
	public requester = new Requester(this);
	public get api() {
		return this.requester.api;
	}

	public on<K extends keyof ClientEvents>(
		event: K,
		listener: (...args: ClientEvents[K]) => any
	): any {
		super.on(event, listener);
	}

	// in here it is that it will emits events
	// more process will be in Client.handleDispatch
	protected handleDispatch(data: any) {}
}
