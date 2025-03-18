import NotionDBConnection from "./NotionDBConnection";
import NotionDBTable from "./NotionDBTable";
import {NotionFieldType, NotionQuery, NotionQueryOrderBy} from "../types/index.types";

export default class NotionDBQueryBuilder<T extends Record<string, NotionFieldType>> {
    private readonly _table: NotionDBTable<T>;
    private _connection: NotionDBConnection;
    public query: NotionQuery<T> = {};
    private _itemToCreate: T | null = null;

    constructor(table: NotionDBTable<T>, connection: NotionDBConnection) {
        this._table = table;
        this._connection = connection;
    }

    private resetQuery() {
        this.query = {};
        this._itemToCreate = null;
    }

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

    async find(): Promise<Record<keyof T, string>[]> {
        const data = await this._connection.get<T>(this.query, this._table);
        this.resetQuery();
        return data;
    }

    async findBlocks(pageId: string): Promise<string[]> {
        return await this._connection.getBlocks(pageId);
    }
}