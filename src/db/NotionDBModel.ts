import {NotionFieldType} from "../types/index.types";

export default class NotionDBModel<T extends Record<string, NotionFieldType>> {
    constructor(public readonly name: string, public readonly id: string, public readonly schema: T) {
    }
}