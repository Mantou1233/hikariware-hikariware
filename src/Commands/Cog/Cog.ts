import { BaseClient } from "../../Clients/Base/BaseClient";
import { CommandClient } from "../../Clients/CommandsClient";
import { ICategory } from "../Interfaces";

export class Cog<T extends BaseClient> {
	public client: T;
	public cogInfo: ICategory;

	public constructor(client: T, cogInfo?: ICategory) {
		this.client = client;
		this.cogInfo = cogInfo;
	}
}
