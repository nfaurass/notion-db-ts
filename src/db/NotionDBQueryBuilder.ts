import NotionDBConnection from "./NotionDBConnection";
import NotionDBModel from "./NotionDBModel";
import {
    NotionDBConfig, NotionDeletePageType, NotionFieldType, NotionQuery, NotionQueryOrderBy, NotionSafeResponse,
} from "../types/index.types";

export default class NotionDBQueryBuilder<T extends Record<string, NotionFieldType>> {
    public query: NotionQuery<T> = {};

    constructor(private readonly _model: NotionDBModel<T>, private _connection: NotionDBConnection, private readonly _config: NotionDBConfig) {
    }

    private resetQuery = () => this.query = {};

    private async withCapability<T>(operation: "read" | "update" | "insert", fn: () => Promise<NotionSafeResponse<T>>):
        Promise<NotionSafeResponse<T> | { status: "error"; errors: string }> {
        if (!this._config.capabilities.content.includes(operation)) return {
            status: "error",
            errors: `${operation} capability is not enabled in this configuration.`
        };
        return await fn();
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

    async findAll(): Promise<NotionSafeResponse<Record<keyof T, string>[]>> {
        return this.withCapability("read", async () => {
            const data = await this._connection.get<T>(this.query, this._model);
            this.resetQuery();
            return data;
        });
    }

    getPageContent = async (recordId: string) => {
        return this.withCapability("read", async () => {
            return await this._connection.getBlocks(recordId)
        });
    }

    updateRecord = async (recordId: string, fields: Partial<Record<keyof T, string>>) => {
        return this.withCapability("update", async () => {
            return await this._connection.patch<T>(recordId, fields, this._model)
        });
    }

    deleteRecord = async (recordId: string, type: NotionDeletePageType) => {
        return this.withCapability("update", async () => {
            return await this._connection.delete(recordId, type)
        });
    }

    restoreRecord = async (recordId: string) => {
        return this.withCapability("update", async () => {
            return await this._connection.restore(recordId)
        });
    }

    createRecord = async (record: Record<keyof T, string>) => {
        return this.withCapability("insert", async () => {
            return await this._connection.post(record, this._model)
        });
    }
}