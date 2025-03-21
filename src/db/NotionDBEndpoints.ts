const baseUrl = "https://api.notion.com/v1";

const NotionDBEndpoints = {
    query_model_for_records: (modelId: string) => `${baseUrl}/databases/${modelId}/query`,
    query_page_for_content: (pageId: string) => `${baseUrl}/blocks/${pageId}/children`,
    update_properties_for_page: (pageId: string) => `${baseUrl}/pages/${pageId}`,
};

export default NotionDBEndpoints;