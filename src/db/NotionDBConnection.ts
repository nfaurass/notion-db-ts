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

    private async _request(url: string, method: string, body?: unknown): Promise<unknown> {
        const options: RequestInit = {
            method,
            headers: this._headers
        };
        if (body) options.body = JSON.stringify(body);
        const response = await fetch(url, options);
        return await response.json();
    }

    constructor(config: NotionDBConfig) {
        this._config = config;
        this._headers = {
            "Authorization": `Bearer ${config.integrationToken}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
        };
    }

    async get<T extends Record<string, NotionFieldType>>(query: NotionQuery<T>, model: NotionDBModel<T>): Promise<Record<keyof T, string>[]> {
        const endpoint = NotionDBEndpoints.query_model_for_records(model.id);
        const response = await this._request(endpoint, "POST");
        return NotionDBFormatter.formatResponse(response as NotionResponse<T>, model.schema);
    }

    async getBlocks(pageId: string): Promise<string[]> {
        const endpoint = NotionDBEndpoints.query_page_for_content(pageId);
        const response = await this._request(endpoint, "GET");
        return NotionDBFormatter.formatBlocks((response as NotionBlockResponse).results);
    }

    async patch<T extends Record<string, NotionFieldType>>(pageId: string, fields: Partial<Record<keyof T, string>>, model: NotionDBModel<T>) {
        const payload = NotionDBFormatter.formatUpdateRequest(fields, model.schema);
        const endpoint = NotionDBEndpoints.update_properties_for_page(pageId);
        return await this._request(endpoint, "PATCH", payload);
    }

    async delete(pageId: string, type: NotionDeletePageType) {
        const endpoint = NotionDBEndpoints.update_properties_for_page(pageId);
        return await this._request(endpoint, "PATCH", {[type]: true});
    }

    async restore(pageId: string) {
        const endpoint = NotionDBEndpoints.update_properties_for_page(pageId);
        return await this._request(endpoint, "PATCH", {archived: false, in_trash: false});
    }

    async post<T extends Record<string, NotionFieldType>>(record: Record<keyof T, string>, model: NotionDBModel<T>) {
        const payload = NotionDBFormatter.formatCreateRequest(record, model.schema);
        const endpoint = NotionDBEndpoints.create_page_with_properties();
        const body = {parent: {database_id: model.id.toString()}, ...payload};
        return await this._request(endpoint, "POST", body);
    }

}