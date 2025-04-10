export type NotionDBConfigCapabilities = {
    /**
     * Capabilities for content.
     * - "read": Request to read content.
     * - "update": Request to update existing content.
     * - "insert": Request to create new content.
     */
    content: ("read" | "update" | "insert")[];
    /**
     * Capabilities for comments.
     * - "read": Read comments on blocks and pages.
     * - "insert": Create comments on blocks and pages.
     */
    comment: ("read" | "insert")[];
    /**
     * Capability for user information access.
     * - "no": Do not request any user information access.
     * - "read_without_email": Request access to user information, excluding email addresses.
     * - "read_with_email": Request access to user information, including email addresses.
     */
    user: "no" | "read_without_email" | "read_with_email";
};

export type NotionDBConfig = {
    integrationToken: string;
    capabilities: NotionDBConfigCapabilities;
    database: string;
}

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

export type NotionFieldTypeNumber = {
    id: string;
    type: string;
    number: number;
}

export type NotionFieldTypeFormula = {
    id: string;
    type: string;
    formula: {
        type: string;
        string: string;
    };
}

export type NotionFieldTypeDate = {
    id: string;
    type: string;
    date: {
        start: string;
        end: string;
        time_zone: string;
    };
}

export type NotionFieldTypeCheckBox = {
    id: string;
    type: string;
    checkbox: boolean;
}

export type NotionFieldTypeLastEditedTime = {
    id: string;
    type: string;
    last_edited_time: string;
}

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
}

export type NotionFieldTypeStatus = {
    id: string;
    type: string;
    status: {
        id: string;
        name: string;
        color: string;
    };
}

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
}

export type NotionFieldTypeButton = {
    id: string;
    type: string;
    button: unknown;
}

export type NotionFieldTypePhoneNumber = {
    id: string;
    type: string;
    phone_number: string;
}

export type NotionFieldTypeEmail = {
    id: string;
    type: string;
    email: string;
}

export type NotionFieldTypeCreatedTime = {
    id: string;
    type: string;
    created_time: string;
}

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
}

export type NotionFieldTypeMultiSelect = {
    id: string;
    type: string;
    multi_select: {
        id: string;
        name: string;
        color: string;
    }[];
}

export type NotionFieldTypeSelect = {
    id: string;
    type: string;
    select: {
        id: string;
        name: string;
        color: string;
    };
}

export type NotionFieldTypeUrl = {
    id: string;
    type: string;
    url: string;
}

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
}

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
}

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
}

export type NotionQuery<T> = {
    where?: Partial<Record<keyof T, string>>;
    select?: (keyof T)[];
    orderBy?: NotionQueryOrderBy<T>;
    limit?: number;
    offset?: number;
    update?: Partial<Record<keyof T, string>>;
    delete?: boolean;
}

export type NotionQueryOrderBy<T> = {
    field: keyof T;
    direction: "asc" | "desc";
}

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
}

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
}

export type NotionBlockResponse = Omit<NotionResponse<unknown>, "results"> & {
    results: NotionBlock[];
};

export type NotionPageResponse<T> = Omit<NotionResponse<unknown>, "results"> & {
    results: NotionPage<T>[];
};

export type NotionDeletePageType = "in_trash" | "archived";

export type NotionErrorResponse = {
    object: "error";
    status: number;
    code: string;
    message: string;
    request_id: string;
}

export type NotionSafeResponse<T = unknown> = | { status: "success"; data: T; } | { status: "error"; errors: unknown; };