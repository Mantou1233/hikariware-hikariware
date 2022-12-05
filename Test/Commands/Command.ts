import { CommandClient } from "../../src/Clients/CommandsClient";
import { Command } from "../../src/Commands/Command";
import { command, once } from "../../src/Commands/Cog/Decorator";
import { Embed } from "../../src/DiscordTypes/Embed";
import { GuildTextBasedChannel } from "../../src/DiscordTypes/GuildTextBasedChannel";
import { Message } from "../../src/DiscordTypes/Message";

export default class Test extends Command {
	public constructor(client: CommandClient) {
		super(client, {
			name: "Test",
			description: "Test Category"
		});
	}

	async handle(msg: Message, args: string[]){
        if(msg.referencedMessage){
            return msg.reply("sbsb")
        }
        return (msg.channel as GuildTextBasedChannel).send("notsb!");
    }
}
