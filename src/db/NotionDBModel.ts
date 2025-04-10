import {NotionFieldType} from "../types/index.types";

export default class NotionDBModel<T extends Record<string, NotionFieldType>> {
    constructor(public readonly name: string, public readonly id: string, public readonly schema: T) {
    }
}

export class NotionDBError extends Error {
    constructor(message: string, public readonly statusCode: number = 500) {
        super(message);
        this.name = "NotionDBError";
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, NotionDBError.prototype);
    }
}