import NotionDBConnection from "./NotionDBConnection";
import NotionDBModel from "./NotionDBModel";
import {
    NotionDeletePageType,
    NotionFieldType,
    NotionQuery,
    NotionQueryOrderBy,
} from "../types/index.types";

export default class NotionDBQueryBuilder<T extends Record<string, NotionFieldType>> {
    public query: NotionQuery<T> = {};

    constructor(private readonly _model: NotionDBModel<T>, private _connection: NotionDBConnection) {
    }

    private resetQuery = () => this.query = {};

    public where(condition: Partial<Record<keyof T, string>>): this {
        this.query.where = condition;
        return this;
    }

    public orderBy(orderBy: NotionQueryOrderBy<T>): this {
        this.query.orderBy = orderBy;
        return this;
    }

    public select(fields: (keyof T)[]): this {
        this.query.select = fields;
        return this;
    }

    public limit(limit: number): this {
        this.query.limit = limit;
        return this;
    }

    public offset(offset: number): this {
        this.query.offset = offset;
        return this;
    }

    async findAll(): Promise<Record<keyof T, string>[]> {
        const data = await this._connection.get<T>(this.query, this._model);
        this.resetQuery();
        return data;
    }

    getPageContent = (recordId: string): Promise<string[]> => this._connection.getBlocks(recordId);

    updateRecord = (recordId: string, fields: Partial<Record<keyof T, string>>) => this._connection.patch<T>(recordId, fields, this._model);

    softDelete = (recordId: string, type: NotionDeletePageType) => this._connection.delete(recordId, type);

    restoreRecord = (recordId: string) => this._connection.restore(recordId);

    createRecord = (record: Record<keyof T, string>) => this._connection.post(record, this._model);
}