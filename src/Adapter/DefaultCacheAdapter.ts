import { Snowflake } from "../Types";

export class Collection<T> extends Map<Snowflake, T> {}
