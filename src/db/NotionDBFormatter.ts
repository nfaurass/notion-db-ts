import {
    NotionFieldType, NotionFieldTypeCheckBox, NotionFieldTypeCreatedBy, NotionFieldTypeCreatedTime,
    NotionFieldTypeDate, NotionFieldTypeEmail, NotionFieldTypeFiles, NotionFieldTypeFormula,
    NotionFieldTypeLastEditedBy, NotionFieldTypeLastEditedTime, NotionFieldTypeMultiSelect,
    NotionFieldTypeNumber, NotionFieldTypePeople, NotionFieldTypePhoneNumber, NotionFieldTypeRichText,
    NotionFieldTypeSelect, NotionFieldTypeStatus, NotionFieldTypeTitle, NotionFieldTypeUrl,
    NotionPage, NotionResponse, NotionBlock, NotionBlockType
} from "../types";

export default class NotionDBFormatter {

    private static propertyMap: Partial<Record<NotionFieldType, (value: string) => unknown>> = {
        url: value => (
            {url: value}
        ),
        email: value => (
            {email: value}
        ),
        phone_number: value => (
            {phone_number: value}
        ),
        number: value => (
            {number: Number(value)}
        ),
        date: value => (
            {date: {start: value, end: null, time_zone: null}}
        ),
        checkbox: value => (
            {checkbox: Boolean(value)}
        ),
        status: value => (
            {status: {name: value}}
        ),
        select: value => (
            {select: {name: value}}
        ),
        multi_select: value => (
            {multi_select: value.split(",").map(name => ({name}))}
        ),
        rich_text: value => (
            {rich_text: [{text: {content: value}}]}
        ),
        title: value => (
            {title: [{text: {content: value}}]}
        ),
    };

    private static buildProperties<T extends Record<string, NotionFieldType>>(fields: Partial<Record<keyof T, string>>, schema: T) {
        return Object.entries(fields).reduce((acc, [field, value]) => {
            if (!value) return acc;
            const fieldType = schema[field as keyof T];
            const formatter = NotionDBFormatter.propertyMap[fieldType];
            if (formatter) {
                acc[field as keyof T] = formatter(value);
            }
            return acc;
        }, {} as Partial<Record<keyof T, unknown>>);
    }

    private static getFieldContent(field: unknown, type: NotionFieldType) {
        switch (type) {
            case "title":
                return (field as NotionFieldTypeTitle).title[0].plain_text ?? "";
            case "url":
                return (field as NotionFieldTypeUrl).url ?? "";
            case "rich_text":
                return (field as NotionFieldTypeRichText).rich_text[0].plain_text ?? "";
            case "people":
                return JSON.stringify((field as NotionFieldTypePeople).people.map(p => p.name)) ?? "";
            case "status":
                return (field as NotionFieldTypeStatus).status.name ?? "";
            case "created_time":
                return (field as NotionFieldTypeCreatedTime).created_time ?? "";
            case "created_by":
                return (field as NotionFieldTypeCreatedBy).created_by.name ?? "";
            case "last_edited_time":
                return (field as NotionFieldTypeLastEditedTime).last_edited_time ?? "";
            case "last_edited_by":
                return (field as NotionFieldTypeLastEditedBy).last_edited_by.name ?? "";
            case "number":
                return (field as NotionFieldTypeNumber).number.toString();
            case "date":
                return JSON.stringify((field as NotionFieldTypeDate).date) ?? "";
            case "email":
                return (field as NotionFieldTypeEmail).email ?? "";
            case "phone_number":
                return (field as NotionFieldTypePhoneNumber).phone_number ?? "";
            case "select":
                return (field as NotionFieldTypeSelect).select.name ?? "";
            case "multi_select":
                return (field as NotionFieldTypeMultiSelect).multi_select.map(s => s.name).join(', ') ?? "";
            case "files":
                return JSON.stringify((field as NotionFieldTypeFiles).files.map(f => ({
                    name: f.name,
                    file: {url: f.file.url, expiry_time: f.file.expiry_time}
                }))) ?? "";
            case "checkbox":
                return (field as NotionFieldTypeCheckBox).checkbox.toString() ?? "";
            case "formula":
                return (field as NotionFieldTypeFormula).formula.string.toString() ?? "";
            default:
                console.warn(`Unhandled field type: ${type}`);
                return "[undefined]";
        }
    }

    static formatResponse<T extends Record<string, NotionFieldType>>(response: NotionResponse<T>, schema: T): Record<keyof T, string>[] {
        const pages = response.results as NotionPage<T>[];
        return pages.map((page: NotionPage<T>) => {
            const record = {} as Record<keyof T, string>;
            Object.entries(schema).forEach(([field, type]: [keyof T, NotionFieldType]) => {
                const fieldValue = page.properties[field];
                if (fieldValue) record[field] = this.getFieldContent(fieldValue, type);
            });
            return record;
        });
    }

    static formatBlocks(results: NotionBlock[]): Record<NotionBlockType, unknown> {
        return results.reduce((acc: Record<NotionBlockType, string | unknown>, result) => {
            const blockType = result.type as NotionBlockType;
            const blockData = result[blockType];
            if (blockData && blockData.rich_text && blockData.rich_text[0]) acc[blockType] = blockData.rich_text[0].plain_text;
            return acc;
        }, {} as Record<NotionBlockType, unknown>);
    }

    static formatUpdateRequest<T extends Record<string, NotionFieldType>>(fields: Partial<Record<keyof T, string>>, schema: T) {
        return {properties: this.buildProperties(fields, schema)};
    }

    static formatCreateRequest<T extends Record<string, NotionFieldType>>(record: Record<keyof T, string>, schema: T) {
        return {properties: this.buildProperties(record, schema)};
    }
}