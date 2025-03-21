import NotionDBConnection from "./NotionDBConnection";
import NotionDBModel from "./NotionDBModel";
import {NotionDeletePageType, NotionFieldType, NotionQuery, NotionQueryOrderBy} from "../types/index.types";

export default class NotionDBQueryBuilder<T extends Record<string, NotionFieldType>> {
    private readonly _model: NotionDBModel<T>;
    private _connection: NotionDBConnection;
    public query: NotionQuery<T> = {};
    private _itemToCreate: T | null = null;

    constructor(model: NotionDBModel<T>, connection: NotionDBConnection) {
        this._model = model;
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

    async findAll(): Promise<Record<keyof T, string>[]> {
        const data = await this._connection.get<T>(this.query, this._model);
        this.resetQuery();
        return data;
    }

    async getPageContent(recordId: string): Promise<string[]> {
        return await this._connection.getBlocks(recordId);
    }

    async updateRecord(recordId: string, fields: Partial<Record<keyof T, string>>) {
        return await this._connection.patch<T>(recordId, fields, this._model);
    }

    async softDelete(recordId: string, type: NotionDeletePageType) {
        return await this._connection.delete(recordId, type);
    }

    async restoreRecord(recordId: string) {
        return await this._connection.restore(recordId);
    }

}