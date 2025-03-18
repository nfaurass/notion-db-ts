import {NotionBlockResponse, NotionDBConfig, NotionFieldType, NotionQuery, NotionResponse} from "../types/index.types";
import NotionDBTable from "./NotionDBTable";
import NotionDBEndpoints from "./NotionDBEndpoints";
import NotionDBFormatter from "./NotionDBFormatter";

export default class NotionDBConnection {
    private readonly _config: NotionDBConfig;
    private readonly _headers;

    constructor(config: NotionDBConfig) {
        this._config = config;
        this._headers = {
            "Authorization": `Bearer ${config.integrationToken}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
        };
    }

    async get<T extends Record<string, NotionFieldType>>(query: NotionQuery<T>, table: NotionDBTable<T>): Promise<Record<keyof T, string>[]> {
        const request = await fetch(
            NotionDBEndpoints.query_table_for_records(table.id) as string,
            {
                method: "POST",
                headers: this._headers,
            }
        );
        const response = await request.json();
        return NotionDBFormatter.formatResponse(response as NotionResponse<T>, table.schema);
    }

    async getBlocks(pageId: string): Promise<string[]> {
        const request = await fetch(
            NotionDBEndpoints.query_page_for_content(pageId) as string,
            {
                method: "GET",
                headers: this._headers,
            }
        );
        const response = await request.json();
        return NotionDBFormatter.formatBlocks((response as NotionBlockResponse).results);
    }
}