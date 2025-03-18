import {
    NotionFieldType, NotionFieldTypeCheckBox, NotionFieldTypeCreatedBy, NotionFieldTypeCreatedTime,
    NotionFieldTypeDate, NotionFieldTypeEmail, NotionFieldTypeFiles, NotionFieldTypeFormula,
    NotionFieldTypeLastEditedBy, NotionFieldTypeLastEditedTime, NotionFieldTypeMultiSelect,
    NotionFieldTypeNumber, NotionFieldTypePeople, NotionFieldTypePhoneNumber, NotionFieldTypeRichText,
    NotionFieldTypeSelect, NotionFieldTypeStatus, NotionFieldTypeTitle, NotionFieldTypeUrl,
    NotionPage, NotionResponse, NotionBlock
} from "../types/index.types";

export default class NotionDBFormatter {

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
        const records = new Array<(Record<keyof T, string>)>();

        pages.forEach((page: NotionPage<T>) => {
            const record = {} as Record<keyof T, string>;
            Object.entries(schema).forEach(
                ([field, type]: [keyof T, NotionFieldType]) => {
                    const fieldValue = page.properties[field];
                    record[field] = this.getFieldContent(fieldValue, type);
                }
            );
            records.push(record);
        })

        return records;
    }

    static formatBlocks(results: NotionBlock[]): string[] {
        const blocks: string[] = [];

        results.forEach((result) => {
            const blockType = result.type;
            const blockData = result[blockType];
            if (blockData && blockData.rich_text)
                blocks.push(`${blockType}: ${blockData.rich_text[0].plain_text.toString()}`);
        });

        return blocks;
    }

}