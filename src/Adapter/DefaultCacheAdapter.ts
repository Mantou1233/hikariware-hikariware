import { snowflake } from "../Types";

export class Collection<T> extends Map<snowflake, T> {}
