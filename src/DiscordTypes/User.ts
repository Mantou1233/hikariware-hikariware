import { snowflake } from "./../Types";
import { Client } from "../Clients/Client";

export class User {
	public id: snowflake;
	public username: string;
	public avatar: string;
	public avatar_decoration?: string;
	public discriminator: string;
	public bot: boolean;
	public public_flags?: number;
	public banner?: string;
	public banner_color?: string;
	public accent_color?: string;
	public client: Client;

	public constructor(client: Client, data: any) {
		this.id = data.id;
		this.username = data.username;
		this.avatar = data.avatar;
		this.avatar_decoration = data.avatar_decoration;
		this.discriminator = data.discriminator;
		this.bot = data.bot ?? false;
		this.public_flags = data.public_flags;
		this.banner = data.banner;
		this.banner_color = data.banner_color;
		this.accent_color = data.accent_color;
	}

	public get tag() {
		return `${this.username}#${this.discriminator}`;
	}
}

/*
this.display_name = data.display_name
this.flags = data.flags
this.bot = data.bot
this.bio = data.bio
this.locale = data.locale
this.mfa_enabled = data.mfa_enabled
this.premium_type = data.premium_type
this.email = data.email
this.verified = data.verified
*/
