import { Client } from "../Clients/Client";
import { User } from "./User";

export class ClientUser extends User {
	public display_name: any;
	public flags: any;
	public locale: string;
	public mfa_enabled: any;
	public premium_type: any;
	public email: string;
	public verified: boolean;
	public constructor(client: Client, data: any) {
		super(client, data);
		this.display_name = data.display_name;
		this.flags = data.flags;
		this.bot = data.bot;
		this.locale = data.locale;
		this.mfa_enabled = data.mfa_enabled;
		this.premium_type = data.premium_type;
		this.email = data.email;
		this.verified = Boolean(data.verified);
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
