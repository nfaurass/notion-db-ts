/**
 * The configuration for a Notion database integration.
 * @typedef {Object} NotionDBConfig
 * @property {string} integrationToken - The integration token for authentication.
 * @property {NotionDBConfigCapabilities} capabilities - The capabilities for the integration.
 * @property {string} database - The target database identifier.
 */
export type NotionDBConfig = {
    integrationToken: string;
    capabilities: NotionDBConfigCapabilities;
    database: string;
};

/**
 * Capabilities for a Notion database configuration.
 * @typedef {Object} NotionDBConfigCapabilities
 * @property {("read" | "update" | "insert")[]} content - Content capabilities: "read", "update", or "insert".
 * @property {("read" | "insert")[]} comment - Comment capabilities: "read" for reading comments and "insert" to add new ones.
 * @property {"no" | "read_without_email" | "read_with_email"} user - User info access: "no" for none, "read_without_email" excludes email, "read_with_email" includes email.
 */
export type NotionDBConfigCapabilities = {
    content: ("read" | "update" | "insert")[];
    comment: ("read" | "insert")[];
    user: "no" | "read_without_email" | "read_with_email";
};

/**
 * Represents a supported field type in Notion.
 * @typedef {"checkbox" | "created_by" | "created_time" | "date" | "email" |
 *           "files" | "formula" | "last_edited_by" | "last_edited_time" |
 *           "multi_select" | "number" | "people" | "phone_number" | "rich_text" |
 *           "select" | "status" | "title" | "url"} NotionFieldType
 */
export type NotionFieldType =
    "checkbox"
    | "created_by"
    | "created_time"
    | "date"
    | "email"
    | "files"
    | "formula"
    | "last_edited_by"
    | "last_edited_time"
    | "multi_select"
    | "number"
    | "people"
    | "phone_number"
    | "rich_text"
    | "select"
    | "status"
    | "title"
    | "url";
// | "relation" // To be implemented
// | "rollup" // To be implemented

/**
 * Represents a field with a number value.
 * @typedef {Object} NotionFieldTypeNumber
 * @property {string} id - Unique identifier of the field.
 * @property {string} type - Field type description.
 * @property {number} number - The numeric value.
 */
export type NotionFieldTypeNumber = {
    id: string;
    type: string;
    number: number;
};

/**
 * Represents a field with a formula value.
 * @typedef {Object} NotionFieldTypeFormula
 * @property {string} id - Unique identifier.
 * @property {string} type - Field type description.
 * @property {Object} formula - Formula details.
 * @property {string} formula.type - Type of the formula.
 * @property {string} formula.string - Formula result as a string.
 */
export type NotionFieldTypeFormula = {
    id: string;
    type: string;
    formula: {
        type: string;
        string: string;
    };
};

/**
 * Represents a field with a date value.
 * @typedef {Object} NotionFieldTypeDate
 * @property {string} id - Unique field identifier.
 * @property {string} type - Field type.
 * @property {Object} date - Date details.
 * @property {string} date.start - Start date in ISO format.
 * @property {string} date.end - End date in ISO format.
 * @property {string} date.time_zone - The time zone of the date.
 */
export type NotionFieldTypeDate = {
    id: string;
    type: string;
    date: {
        start: string;
        end: string;
        time_zone: string;
    };
};

/**
 * Represents a field with a checkbox value.
 * @typedef {Object} NotionFieldTypeCheckBox
 * @property {string} id - The field identifier.
 * @property {string} type - Type of the field.
 * @property {boolean} checkbox - Checkbox state.
 */
export type NotionFieldTypeCheckBox = {
    id: string;
    type: string;
    checkbox: boolean;
};

/**
 * Represents a field recording the last edited time.
 * @typedef {Object} NotionFieldTypeLastEditedTime
 * @property {string} id - Field identifier.
 * @property {string} type - Field type.
 * @property {string} last_edited_time - ISO date string of the last edit.
 */
export type NotionFieldTypeLastEditedTime = {
    id: string;
    type: string;
    last_edited_time: string;
};

/**
 * Represents a field recording the last editor’s details.
 * @typedef {Object} NotionFieldTypeLastEditedBy
 * @property {string} id - Unique field id.
 * @property {string} type - Field type.
 * @property {Object} last_edited_by - Details about the last editor.
 * @property {string} last_edited_by.object - The object type.
 * @property {string} last_edited_by.id - Editor's id.
 * @property {string} last_edited_by.name - Editor's name.
 * @property {(string|null)} last_edited_by.avatar_url - URL of the avatar image.
 * @property {string} last_edited_by.type - Editor type.
 * @property {Object} last_edited_by.person - Person details.
 * @property {string} last_edited_by.person.email - The email of the person.
 */
export type NotionFieldTypeLastEditedBy = {
    id: string;
    type: string;
    last_edited_by: {
        object: string;
        id: string;
        name: string;
        avatar_url: string | null;
        type: string;
        person: {
            email: string;
        };
    };
};

/**
 * Represents a status field.
 * @typedef {Object} NotionFieldTypeStatus
 * @property {string} id - Field identifier.
 * @property {string} type - Field type.
 * @property {Object} status - Status details.
 * @property {string} status.id - Status identifier.
 * @property {string} status.name - Status name.
 * @property {string} status.color - Associated color.
 */
export type NotionFieldTypeStatus = {
    id: string;
    type: string;
    status: {
        id: string;
        name: string;
        color: string;
    };
};

/**
 * Represents a field with people.
 * @typedef {Object} NotionFieldTypePeople
 * @property {string} id - Unique identifier.
 * @property {string} type - Field type.
 * @property {Array<Object>} people - Array of people objects.
 */
export type NotionFieldTypePeople = {
    id: string;
    type: string;
    people: {
        object: string;
        id: string;
        name: string;
        avatar_url: string;
        type: string;
        person: {
            email: string;
        };
    }[];
};

/**
 * Represents a field with a button.
 * @typedef {Object} NotionFieldTypeButton
 * @property {string} id - Unique button identifier.
 * @property {string} type - Field type.
 * @property {unknown} button - Button payload.
 */
export type NotionFieldTypeButton = {
    id: string;
    type: string;
    button: unknown;
};

/**
 * Represents a field with a phone number.
 * @typedef {Object} NotionFieldTypePhoneNumber
 * @property {string} id - Field identifier.
 * @property {string} type - Field type.
 * @property {string} phone_number - Phone number string.
 */
export type NotionFieldTypePhoneNumber = {
    id: string;
    type: string;
    phone_number: string;
};

/**
 * Represents a field with an email.
 * @typedef {Object} NotionFieldTypeEmail
 * @property {string} id - Field identifier.
 * @property {string} type - Field type.
 * @property {string} email - Email address string.
 */
export type NotionFieldTypeEmail = {
    id: string;
    type: string;
    email: string;
};

/**
 * Represents a field with creation time.
 * @typedef {Object} NotionFieldTypeCreatedTime
 * @property {string} id - Unique identifier.
 * @property {string} type - Field type.
 * @property {string} created_time - ISO date string when created.
 */
export type NotionFieldTypeCreatedTime = {
    id: string;
    type: string;
    created_time: string;
};

/**
 * Represents a field with creator details.
 * @typedef {Object} NotionFieldTypeCreatedBy
 * @property {string} id - Field identifier.
 * @property {string} type - Field type.
 * @property {Object} created_by - Creator details.
 * @property {string} created_by.object - Object type.
 * @property {string} created_by.id - Creator's id.
 * @property {string} created_by.name - Creator's name.
 * @property {string} created_by.avatar_url - Creator's avatar URL.
 * @property {string} created_by.type - Creator type.
 * @property {Object} created_by.person - Person details.
 * @property {string} created_by.person.email - Email of the creator.
 */
export type NotionFieldTypeCreatedBy = {
    id: string;
    type: string;
    created_by: {
        object: string;
        id: string;
        name: string;
        avatar_url: string;
        type: string;
        person: {
            email: string;
        };
    };
};

/**
 * Represents a multi-select field.
 * @typedef {Object} NotionFieldTypeMultiSelect
 * @property {string} id - Field identifier.
 * @property {string} type - Field type.
 * @property {Array<Object>} multi_select - Array of select options.
 */
export type NotionFieldTypeMultiSelect = {
    id: string;
    type: string;
    multi_select: {
        id: string;
        name: string;
        color: string;
    }[];
};

/**
 * Represents a single select field.
 * @typedef {Object} NotionFieldTypeSelect
 * @property {string} id - Field identifier.
 * @property {string} type - Field type.
 * @property {Object} select - Selected option.
 * @property {string} select.id - Option id.
 * @property {string} select.name - Option name.
 * @property {string} select.color - Option color.
 */
export type NotionFieldTypeSelect = {
    id: string;
    type: string;
    select: {
        id: string;
        name: string;
        color: string;
    };
};

/**
 * Represents a URL field.
 * @typedef {Object} NotionFieldTypeUrl
 * @property {string} id - Field identifier.
 * @property {string} type - Field type.
 * @property {string} url - URL string.
 */
export type NotionFieldTypeUrl = {
    id: string;
    type: string;
    url: string;
};

/**
 * Represents a title field with rich text.
 * @typedef {Object} NotionFieldTypeTitle
 * @property {string} id - Field identifier.
 * @property {string} type - Field type.
 * @property {Array<Object>} title - Array of rich text objects.
 */
export type NotionFieldTypeTitle = {
    id: string;
    type: string;
    title: {
        type: string;
        text: {
            content: string;
            link: string | null;
        };
        annotations: {
            bold: string | boolean;
            italic: string | boolean;
            strikethrough: string | boolean;
            underline: string | boolean;
            code: string | boolean;
            color: string;
        };
        plain_text: string;
        href: string | null;
    }[];
};

/**
 * Represents a rich text field.
 * @typedef {Object} NotionFieldTypeRichText
 * @property {string} id - Field identifier.
 * @property {string} type - Field type.
 * @property {Array<Object>} rich_text - Array of rich text content.
 */
export type NotionFieldTypeRichText = {
    id: string;
    type: string;
    rich_text: {
        type: string;
        text: {
            content: string;
            link: string | null;
        };
        annotations: {
            bold: string | boolean;
            italic: string | boolean;
            strikethrough: string | boolean;
            underline: string | boolean;
            code: string | boolean;
            color: string;
        };
        plain_text: string;
        href: string | null;
    }[];
};

/**
 * Represents a field for files.
 * @typedef {Object} NotionFieldTypeFiles
 * @property {string} id - Field identifier.
 * @property {string} type - Field type.
 * @property {Array<Object>} files - Array of file objects.
 * @property {string} files.name - File name.
 * @property {string} files.type - File type.
 * @property {Object} files.file - File metadata.
 * @property {string} files.file.url - URL to the file.
 * @property {string} files.file.expiry_time - Expiry time of the file URL.
 */
export type NotionFieldTypeFiles = {
    id: string;
    type: string;
    files: {
        name: string;
        type: string;
        file: {
            url: string;
            expiry_time: string;
        }
    }[];
};

/**
 * Represents a generic Notion query structure.
 * @template T
 * @typedef {Object} NotionQuery
 * @property {Partial<Record<keyof T, string>>} [where] - Optional filter where keys match field names.
 * @property {(keyof T)[]} [select] - Fields to select.
 * @property {NotionQueryOrderBy<T>} [orderBy] - Field and direction to order the results.
 * @property {number} [limit] - Maximum number of records to return.
 * @property {number} [offset] - Offset for pagination.
 * @property {Partial<Record<keyof T, string>>} [update] - Fields to update.
 * @property {boolean} [delete] - Flag to delete matching records.
 */
export type NotionQuery<T> = {
    where?: NotionFilterObject<Partial<T>>;
    select?: (keyof T)[];
    orderBy?: NotionQueryOrderBy<T>;
    limit?: number;
    offset?: number;
    update?: Partial<Record<keyof T, string>>;
    delete?: boolean;
};

/**
 * Specifies ordering for a Notion query.
 * @template T
 * @typedef {Object} NotionQueryOrderBy
 * @property {keyof T} field - The field to sort by.
 * @property {"asc" | "desc"} direction - The sort direction.
 */
export type NotionQueryOrderBy<T> = {
    field: keyof T;
    direction: "asc" | "desc";
};

/**
 * Represents the different block types available in Notion.
 * @typedef {"bookmark" | "breadcrumb" | "bulleted_list_item" | "callout" | "child_database" |
 *           "child_page" | "column" | "column_list" | "divider" | "embed" | "equation" | "file" |
 *           "heading_1" | "heading_2" | "heading_3" | "image" | "link_preview" | "link_to_page" |
 *           "numbered_list_item" | "paragraph" | "pdf" | "quote" | "synced_block" | "table" |
 *           "table_of_contents" | "table_row" | "template" | "to_do" | "toggle" | "unsupported" | "video"} NotionBlockType
 */
export type NotionBlockType =
    "bookmark"
    | "breadcrumb"
    | "bulleted_list_item"
    | "callout"
    | "child_database"
    | "child_page"
    | "column"
    | "column_list"
    | "divider"
    | "embed"
    | "equation"
    | "file"
    | "heading_1"
    | "heading_2"
    | "heading_3"
    | "image"
    | "link_preview"
    | "link_to_page"
    | "numbered_list_item"
    | "paragraph"
    | "pdf"
    | "quote"
    | "synced_block"
    | "table"
    | "table_of_contents"
    | "table_row"
    | "template"
    | "to_do"
    | "toggle"
    | "unsupported"
    | "video";

/**
 * Represents a Notion page.
 * @template T
 * @typedef {Object} NotionPage
 * @property {"page"} object - Always "page".
 * @property {string} id - Page identifier.
 * @property {string} created_time - ISO string when the page was created.
 * @property {string} last_edited_time - ISO string when last edited.
 * @property {Record<string, string>} created_by - Creator info.
 * @property {Record<string, string>} last_edited_by - Last editor info.
 * @property {(string|null)} cover - URL for the cover image.
 * @property {(string|null)} icon - URL for the icon.
 * @property {Record<string, string>} parent - Parent information.
 * @property {boolean} archived - Archival status.
 * @property {boolean} in_trash - Trash status.
 * @property {Record<keyof T, string>} properties - Page properties.
 * @property {string} url - Page URL.
 * @property {(string|null)} public_url - Public URL if available.
 */
export type NotionPage<T> = {
    object: "page";
    id: string;
    created_time: string;
    last_edited_time: string;
    created_by: Record<string, string>;
    last_edited_by: Record<string, string>;
    cover: string | null;
    icon: string | null;
    parent: Record<string, string>;
    archived: boolean;
    in_trash: boolean;
    properties: Record<keyof T, string>;
    url: string;
    public_url: string | null;
};

/**
 * Represents a Notion block.
 * @typedef {Object} NotionBlock
 * @property {"block"} object - Always "block".
 * @property {string} id - Block identifier.
 * @property {string} created_time - Creation time in ISO format.
 * @property {string} last_edited_time - Last edit time in ISO.
 * @property {Record<string, string>} created_by - Creator info.
 * @property {Record<string, string>} last_edited_by - Last editor info.
 * @property {Record<string, string>} parent - Parent info.
 * @property {boolean} archived - Whether the block is archived.
 * @property {boolean} in_trash - Trash status.
 * @property {(boolean|string)} has_children - Indicates if block contains children.
 * @property {NotionBlockType} type - The type of block.
 * @property {Object} [<block type>] - Optional field data for the block type.
 */
export type NotionBlock = {
    object: "block";
    id: string;
    created_time: string;
    last_edited_time: string;
    created_by: Record<string, string>;
    last_edited_by: Record<string, string>;
    parent: Record<string, string>;
    archived: boolean;
    in_trash: boolean;
    has_children: string | boolean;
    type: NotionBlockType;
} & {
    [key in NotionBlockType]?: Omit<NotionFieldTypeRichText, "id" | "type">;
};

/**
 * Represents a generic Notion API response.
 * @template T
 * @typedef {Object} NotionResponse
 * @property {"list"} object - The type of the response.
 * @property {(NotionPage<T>[] | NotionBlock[])} results - Array of page or block results.
 * @property {(string|null)} next_cursor - Cursor for pagination.
 * @property {boolean} has_more - Indicates if more results are available.
 * @property {string} type - Type descriptor.
 * @property {Record<string, unknown>} [page_or_database] - Additional page or database metadata.
 * @property {string} developer_survey - Developer survey info.
 * @property {string} request_id - Identifier for the request.
 */
export type NotionResponse<T> = {
    object: "list";
    results: NotionPage<T>[] | NotionBlock[];
    next_cursor: string | null;
    has_more: boolean;
    type: string;
    page_or_database?: Record<string, unknown>;
    block?: string;
    developer_survey: string;
    request_id: string;
};

/**
 * Response structure specifically for Notion block queries.
 * @typedef {Object} NotionBlockResponse
 * @property {NotionBlock[]} results - Array of block objects.
 */
export type NotionBlockResponse = Omit<NotionResponse<unknown>, "results"> & {
    results: NotionBlock[];
};

/**
 * Response structure specifically for Notion page queries.
 * @template T
 * @typedef {Object} NotionPageResponse
 * @property {NotionPage<T>[]} results - Array of page objects.
 */
export type NotionPageResponse<T> = Omit<NotionResponse<unknown>, "results"> & {
    results: NotionPage<T>[];
};

/**
 * Types representing deletion state.
 * @typedef {"in_trash" | "archived"} NotionDeletePageType
 */
export type NotionDeletePageType = "in_trash" | "archived";

/**
 * Represents an error response from the Notion API.
 * @typedef {Object} NotionErrorResponse
 * @property {"error"} object - Always "error".
 * @property {number} status - HTTP status code.
 * @property {string} code - Error code.
 * @property {string} message - Detailed error message.
 * @property {string} request_id - Identifier for the request.
 */
export type NotionErrorResponse = {
    object: "error";
    status: number;
    code: string;
    message: string;
    request_id: string;
};

/**
 * Wraps a safe response from Notion with either success or error.
 * @template T
 * @typedef {Object} NotionSafeResponse
 * @property {"success"} [status] - "success" if the call succeeded.
 * @property {T} [data] - Returned data if successful.
 * @property {"error"} [status] - "error" if the call failed.
 * @property {unknown} [errors] - Error details if failed.
 */
export type NotionSafeResponse<T = unknown> = | { status: "success"; data: T; } | { status: "error"; errors: unknown; };

/**
 * Represents HTTP headers required for Notion API requests.
 * @typedef {Object} NotionHeaders
 * @property {string} Authorization - Authorization token.
 * @property {string} ["Notion-Version"] - Notion API version.
 * @property {string} ["Content-Type"] - Content type header.
 */
export type NotionHeaders = {
    "Authorization": string;
    "Notion-Version": string;
    "Content-Type": string;
};

type NotionFilterTypeEmptyObject = Record<string, never>;

type NotionFilterTypeDate = {
    "after"?: string,
    "before"?: string,
    "next_month"?: NotionFilterTypeEmptyObject,
    "next_week"?: NotionFilterTypeEmptyObject,
    "next_year"?: NotionFilterTypeEmptyObject,
    "on_or_after"?: string,
    "on_or_before"?: string,
    "past_month"?: NotionFilterTypeEmptyObject,
    "past_week"?: NotionFilterTypeEmptyObject,
    "past_year"?: NotionFilterTypeEmptyObject,
    "this_week"?: NotionFilterTypeEmptyObject,
    "is_empty"?: boolean,
    "is_not_empty"?: boolean,
    "equals"?: string,
    "does_not_equal"?: string,
}

type NotionFilterTypeFiles = {
    "is_empty"?: boolean,
    "is_not_empty"?: boolean,
}

type NotionFilterTypeStatus = {
    "is_empty"?: boolean,
    "is_not_empty"?: boolean,
    "equals"?: string,
    "does_not_equal"?: string,
}

type NotionFilterTypeSelect = {
    "is_empty"?: boolean,
    "is_not_empty"?: boolean,
    "equals"?: string,
    "does_not_equal"?: string,
}

type NotionFilterTypeNumber = {
    "is_empty"?: boolean,
    "is_not_empty"?: boolean,
    "equals"?: string,
    "does_not_equal"?: string,
    "greater_than"?: string,
    "less_than"?: string,
    "greater_than_or_equal_to"?: string,
    "less_than_or_equal_to"?: string,
}

type NotionFilterTypeRelation = {
    "is_empty"?: boolean,
    "is_not_empty"?: boolean,
    "contains"?: string,
    "does_not_contain"?: string,
}

type NotionFilterTypePeople = {
    "is_empty"?: boolean,
    "is_not_empty"?: boolean,
    "contains"?: string,
    "does_not_contain"?: string,
}

type NotionFilterTypeRichText = {
    "is_empty"?: boolean,
    "is_not_empty"?: boolean,
    "equals"?: string,
    "does_not_equal"?: string,
    "contains"?: string,
    "does_not_contain"?: string,
    "ends_with"?: string,
    "starts_with"?: string,
}

type NotionFilterTypeMultiSelect = {
    "is_empty"?: boolean,
    "is_not_empty"?: boolean,
    "contains"?: string,
    "does_not_contain"?: string,
}

type NotionFilterTypeId = {
    "equals"?: string,
    "does_not_equal"?: string,
    "greater_than"?: number,
    "less_than"?: number,
    "greater_than_or_equal_to"?: number,
    "less_than_or_equal_to"?: number,
}

export type NotionFilterType<Value> =
    Value extends NotionFieldType ? (
            Value extends "date" ? NotionFilterTypeDate :
                Value extends "status" ? NotionFilterTypeStatus :
                    Value extends "select" ? NotionFilterTypeSelect :
                        Value extends "file" ? NotionFilterTypeFiles :
                            Value extends "number" ? NotionFilterTypeNumber :
                                Value extends "relation" ? NotionFilterTypeRelation :
                                    Value extends "people" ? NotionFilterTypePeople :
                                        Value extends "rich_text" | "title" | "url" ? NotionFilterTypeRichText :
                                            Value extends "multi_select" ? NotionFilterTypeMultiSelect :
                                                Value extends "id" ? NotionFilterTypeId :
                                                    NotionFilterTypeEmptyObject) :
        NotionFilterTypeEmptyObject;


export type NotionFilterObject<T> = {
    [K in keyof T]?: NotionFilterType<T[K]>;
}