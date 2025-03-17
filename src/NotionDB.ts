import {NotionDBConfig, NotionFieldType} from "./types/index.types";
import NotionDBConnection from "./db/NotionDBConnection";
import NotionDBTable from "./db/NotionDBTable";
import NotionDBQueryBuilder from "./db/NotionDBQueryBuilder";

export default class NotionDB {
    private readonly _config: NotionDBConfig;
    private readonly _tables: Set<NotionDBTable<Record<string, NotionFieldType>>> = new Set();
    private readonly _connection: NotionDBConnection;

    constructor(config: NotionDBConfig) {
        this._config = config;
        this._connection = new NotionDBConnection(config);
    }

    public get config(): NotionDBConfig {
        return this._config;
    }

    public get tables() {
        return this._tables;
    };

    defineTable<T extends Record<string, NotionFieldType>>(name: string, id: string, schema: T): NotionDBTable<T> {
        const table = new NotionDBTable<T>(name, id, schema);
        this._tables.add(table as NotionDBTable<Record<string, NotionFieldType>>);
        return table;
    }

    table<T extends Record<string, NotionFieldType>>(notionTable: NotionDBTable<T>): NotionDBQueryBuilder<T> {
        return new NotionDBQueryBuilder<T>(notionTable, this._connection);
    }
}
