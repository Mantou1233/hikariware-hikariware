export interface ISerializable {
	toJson(): any;
}

export function serialize(arg) {
	if (arg.toJSON && typeof arg.toJSON == "function") return arg.toJSON();
	else return arg;
}
