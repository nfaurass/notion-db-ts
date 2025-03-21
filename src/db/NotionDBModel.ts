import {NotionFieldType} from "../types/index.types";

export default class NotionDBModel<T extends Record<string, NotionFieldType>> {
    public readonly name: string;
    public readonly id: string;
    public readonly schema: T;

    constructor(name: string, id: string, schema: T) {
        this.name = name;
        this.id = id;
        this.schema = schema;
    }
}