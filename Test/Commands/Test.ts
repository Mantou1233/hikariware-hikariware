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
	public async messageCreate(msg: Message) {
		if (msg.author.bot) return;
		msg.reply(<any>{
			content: "This is a message with components",
			components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							label: "Click me!",
							style: 1,
							custom_id: "click_one"
						}
					]
				}
			]
		});
	}
	@on
	public interactionCreate(arg) {
		console.log(arg);
		// prettier-ignore
		this.client
			.api
			.interactions[arg.id][arg.token]
			.callback
			.post({
				"type": 4,
				"data": {
					"content": "yo wassup my guy :sunglasses: respo FUCK the design HEYO sus!?"
				}
			});
	}
}
