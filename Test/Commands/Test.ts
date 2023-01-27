import { CommandClient } from "../../src/Clients/CommandsClient";
import { Cog } from "../../src/Commands/Cog/Cog";
import { command, on, once } from "../../src/Commands/Cog/Decorator";
import { Embed } from "../../src/DiscordTypes/Embed";
import { GuildTextBasedChannel } from "../../src/DiscordTypes/GuildTextBasedChannel";
import { Message } from "../../src/DiscordTypes/Message";

export default class Test extends Cog<CommandClient> {
	public constructor(client: CommandClient) {
		super(client, {
			name: "Test",
			description: "Test Category"
		});
	}

	@command({
		alias: ["kk"]
	})
	public async hi(message: Message, args: string) {
		return message.reply(new Embed().setTitle("w").setColor("#C8F4FB"));
	}

	@once
	public async ready() {
		console.log(`Logged in as ${this.client.user.tag}!`);
	}

	@on
	public async messageCreate(msg) {
		console.log(msg.author);
	}
}
