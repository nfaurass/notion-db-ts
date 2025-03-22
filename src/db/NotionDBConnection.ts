import {
    NotionBlockResponse,
    NotionDBConfig,
    NotionDeletePageType,
    NotionFieldType,
    NotionQuery,
    NotionResponse
} from "../types/index.types";
import NotionDBModel from "./NotionDBModel";
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

    async get<T extends Record<string, NotionFieldType>>(query: NotionQuery<T>, model: NotionDBModel<T>): Promise<Record<keyof T, string>[]> {
        const request = await fetch(
            NotionDBEndpoints.query_model_for_records(model.id) as string,
            {
                method: "POST",
                headers: this._headers,
            }
        );
        const response = await request.json();
        return NotionDBFormatter.formatResponse(response as NotionResponse<T>, model.schema);
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

    async patch<T extends Record<string, NotionFieldType>>(pageId: string, fields: Partial<Record<keyof T, string>>, model: NotionDBModel<T>) {
        const payload = NotionDBFormatter.formatUpdateRequest(fields, model.schema);
        const request = await fetch(
            NotionDBEndpoints.update_properties_for_page(pageId) as string,
            {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify(payload)
            }
        );
        return await request.json();
    }

    async delete(pageId: string, type: NotionDeletePageType) {
        const request = await fetch(
            NotionDBEndpoints.update_properties_for_page(pageId) as string,
            {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({[type]: true})
            }
        );
        return await request.json();
    }

    async restore(pageId: string) {
        const request = await fetch(
            NotionDBEndpoints.update_properties_for_page(pageId) as string,
            {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({archived: false, in_trash: false})
            }
        );
        return await request.json();
    }


    async post<T extends Record<string, NotionFieldType>>(record: Record<keyof T, string>, model: NotionDBModel<T>) {
        const payload = NotionDBFormatter.formatCreateRequest(record, model.schema);
        console.log(payload);
        const request = await fetch(
            NotionDBEndpoints.create_page_with_properties() as string,
            {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({parent: {database_id: model.id.toString()}, ...payload})
            }
        );
        return await request.json();
    }

}