import {
    NotionBlockResponse, NotionDBConfig, NotionDeletePageType, NotionFieldType, NotionQuery,
    NotionErrorResponse, NotionSafeResponse, NotionResponse, NotionPage, NotionBlockType, NotionHeaders
} from "../types";
import NotionDBModel, {NotionDBError} from "./NotionDBModel";
import NotionDBEndpoints from "./NotionDBEndpoints";
import NotionDBFormatter from "./NotionDBFormatter";

export default class NotionDBConnection {
    private readonly _config: NotionDBConfig;
    private readonly _headers: NotionHeaders;

    private createListPayload<T>(item: NotionPage<T>) {
        return {
            object: "list",
            results: [item],
            next_cursor: null,
            has_more: false,
            type: "",
            developer_survey: "",
            request_id: "",
        };
    }

    private async safeExecute<T>(fn: () => Promise<T>): Promise<NotionSafeResponse<T>> {
        try {
            const data = await fn();
            return {status: "success", data};
        } catch (e: unknown) {
            return {status: "error", errors: e instanceof Error ? e.message : "Unknown error occurred."};
        }
    }

    private async _request<T>(url: string, method: string, body?: unknown): Promise<T> {
        const options: RequestInit = {
            method,
            headers: this._headers
        };
        if (body) options.body = JSON.stringify(body);
        const response = await fetch(url, options);
        let responseJson: unknown;
        try {
            responseJson = await response.json();
        } catch {
            throw new NotionDBError("Failed to parse JSON response", response.status);
        }
        if (!response.ok) {
            const errorMessage = (responseJson as NotionErrorResponse)?.message || `Request failed with status ${response.status}`;
            throw new NotionDBError(errorMessage, response.status);
        }
        if (responseJson && typeof responseJson === "object" && "object" in responseJson
            && (responseJson as { object: string }).object === "error") {
            const errorResponse = responseJson as NotionErrorResponse;
            throw new NotionDBError(errorResponse.message, response.status);
        }
        return responseJson as T;
    }

    constructor(config: NotionDBConfig) {
        this._config = config;
        this._headers = {
            "Authorization": `Bearer ${config.integrationToken}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
        } as NotionHeaders;
    }

    async get<T extends Record<string, NotionFieldType>>(query: NotionQuery<T>, model: NotionDBModel<T>): Promise<NotionSafeResponse<Record<keyof T, string>[]>> {
        const endpoint = NotionDBEndpoints.query_model_for_records(model.id);
        return this.safeExecute(async () => {
            const response = await this._request<NotionResponse<T>>(endpoint, "POST");
            return NotionDBFormatter.formatResponse(response as NotionResponse<T>, model.schema) as Record<keyof T, string>[]
        });
    }

    async getBlocks(pageId: string): Promise<NotionSafeResponse<Record<NotionBlockType, unknown>>> {
        const endpoint = NotionDBEndpoints.query_page_for_content(pageId);
        return this.safeExecute(async () => {
            const response = await this._request<NotionBlockResponse>(endpoint, "GET");
            return NotionDBFormatter.formatBlocks((response as NotionBlockResponse).results);
        });
    }

    async patch<T extends Record<string, NotionFieldType>>(pageId: string, fields: Partial<Record<keyof T, string>>, model: NotionDBModel<T>) {
        const payload = NotionDBFormatter.formatUpdateRequest(fields, model.schema);
        const endpoint = NotionDBEndpoints.update_properties_for_page(pageId);
        return this.safeExecute(async () => {
            const updatedPage = await this._request<NotionPage<T>>(endpoint, "PATCH", payload);
            const responsePayload = this.createListPayload<T>(updatedPage);
            return NotionDBFormatter.formatResponse(responsePayload as NotionResponse<T>, model.schema) as Record<keyof T, string>[]
        });
    }

    async delete(pageId: string, type: NotionDeletePageType) {
        const endpoint = NotionDBEndpoints.update_properties_for_page(pageId);
        return this.safeExecute(async () => {
            await this._request(endpoint, "PATCH", {[type]: true});
            return `${pageId} was deleted successfully`;
        });
    }

    async restore(pageId: string) {
        const endpoint = NotionDBEndpoints.update_properties_for_page(pageId);
        return this.safeExecute(async () => {
            await this._request(endpoint, "PATCH", {archived: false, in_trash: false});
            return `${pageId} was restored successfully`;
        });
    }

    async post<T extends Record<string, NotionFieldType>>(record: Record<keyof T, string>, model: NotionDBModel<T>) {
        const payload = NotionDBFormatter.formatCreateRequest(record, model.schema);
        const endpoint = NotionDBEndpoints.create_page_with_properties();
        const body = {parent: {database_id: model.id.toString()}, ...payload};
        return this.safeExecute(async () => {
            const createdItem = await this._request<NotionPage<T>>(endpoint, "POST", body);
            const responsePayload = this.createListPayload<T>(createdItem);
            return NotionDBFormatter.formatResponse(responsePayload as NotionResponse<T>, model.schema) as Record<keyof T, string>[]
        });
    }

}