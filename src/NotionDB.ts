import {NotionDBConfig, NotionFieldType} from "./types/index.types";
import NotionDBConnection from "./db/NotionDBConnection";
import NotionDBModel from "./db/NotionDBModel";
import NotionDBQueryBuilder from "./db/NotionDBQueryBuilder";

export default class NotionDB {
    private readonly _config: NotionDBConfig;
    private readonly _models: Set<NotionDBModel<Record<string, NotionFieldType>>> = new Set();
    private readonly _connection: NotionDBConnection;

    constructor(config: NotionDBConfig) {
        this._config = config;
        this._connection = new NotionDBConnection(config);
    }

    public get config(): NotionDBConfig {
        return this._config;
    }

    public get models() {
        return this._models;
    };

    defineModel<T extends Record<string, NotionFieldType>>(name: string, id: string, schema: T): NotionDBModel<T> {
        const model = new NotionDBModel<T>(name, id, schema);
        this._models.add(model as NotionDBModel<Record<string, NotionFieldType>>);
        return model;
    }

    model<T extends Record<string, NotionFieldType>>(notionModel: NotionDBModel<T>): NotionDBQueryBuilder<T> {
        return new NotionDBQueryBuilder<T>(notionModel, this._connection, this._config);
    }
}
