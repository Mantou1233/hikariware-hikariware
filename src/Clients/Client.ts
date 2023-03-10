import { GuildTextBasedChannel } from "../DiscordTypes/GuildTextBasedChannel";
import { Message } from "../DiscordTypes/Message";
import { ChannelManager } from "../Manager/ChannelManager";
import { ClientUser } from "./../DiscordTypes/ClientUser";
import { BaseClient } from "./Base/BaseClient";

export class Client extends BaseClient {
	public user: ClientUser;
	public channels = new ChannelManager(this);
	protected async handleDispatch(data: any): Promise<void> {
		switch (data.t) {
			case "READY":
				super.setS(data.s);
				this.user = new ClientUser(
					this,
					await this.requester.fetchClientUser()
				);
				this.emit("ready");
				break;
			case "GUILD_CREATE":
				for (const channelObj of data.d.channels) {
					//TODO generate other types of object
					const channel = new GuildTextBasedChannel(this, channelObj);
					this.channels.set(channel.id, channel);
				}
				this.emit("guildCreate", data.d);
				break;
			case "MESSAGE_CREATE":
				const message = new Message(this, data.d);
				this.emit("messageCreate", message);
				break;
			case "INTERACTION_CREATE":
				this.emit("interactionCreate", data.d);
				break;
		}
	}
}
