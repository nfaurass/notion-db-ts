const baseUrl = "https://api.notion.com/v1";

const NotionDBEndpoints = {
    query_table_for_records: (tableId: string) => `${baseUrl}/databases/${tableId}/query`,
    query_page_for_content: (pageId: string) => `${baseUrl}/blocks/${pageId}/children`,
    update_properties_for_page: (pageId: string) => `${baseUrl}/pages/${pageId}`,
};

export default NotionDBEndpoints;