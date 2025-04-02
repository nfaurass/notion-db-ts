import NotionDB from "../src/NotionDB";
import {NotionDBConfigCapabilities, NotionFieldType} from "../src/types/index.types";
import NotionDBModel from "../src/db/NotionDBModel";

const myIntegrationToken: string = "ntn_60483456333LYN...";
const myCapabilities: NotionDBConfigCapabilities = {
    comment: ["read", "insert"],
    content: ["read", "insert", "update"],
    user: "no",
};
const myDatabase: string = "1b7e1518...";

const notion = new NotionDB(
    {
        integrationToken: myIntegrationToken,
        capabilities: myCapabilities,
        database: myDatabase,
    }
);

const Dogs = notion.defineModel("dogs", "...19e447d6",
    {
        name: "title",
        image: "url",
    }
);

const Articles = notion.defineModel("articles", "...febdff3a",
    {
        date: "date",
        title: "title",
        content: "rich_text",
        author: "people",
        isPublished: "status",
        createdAt: "created_time",
        createdBy: "created_by",
        lastEditedTime: "last_edited_time",
        lastEditedBy: "last_edited_by",
    }
);

async function fetchData<T extends Record<string, NotionFieldType>>(model: NotionDBModel<T>, message: string) {
    try {
        const query = notion.model(model);
        const results = await query.findAll();
        console.log(message, results);
        return results;
    } catch (error) {
        console.error(`Error fetching ${message}:`, error);
        return null;
    }
}

async function getDogs() {
    return await fetchData(Dogs, "Dogs retrieved:");
}

async function getArticles() {
    return await fetchData(Articles, "Articles retrieved:");
}

async function getArticlePage(articleId: string) {
    try {
        const query = notion.model(Articles);
        const results = await query.getPageContent(articleId);
        console.log("Article Page Blocks:", results);
        return results;
    } catch (error) {
        console.error("Error fetching article page:", error);
        return null;
    }
}

async function updateDog(dogId: string, newImageUrl: string) {
    try {
        const query = notion.model(Dogs);
        const result = await query.updateRecord(dogId, {image: newImageUrl});
        console.log("Updated Dog:", result);
        return result;
    } catch (error) {
        console.error("Error updating dog:", error);
    }
}

async function updateArticle(articleId: string, updates: Record<string, unknown>) {
    try {
        const query = notion.model(Articles);
        const result = await query.updateRecord(articleId, updates);
        console.log("Updated Article:", result);
        return result;
    } catch (error) {
        console.error("Error updating article:", error);
    }
}

async function createDog(data: Record<string, string>) {
    try {
        const query = notion.model(Dogs);
        const result = await query.createRecord(data);
        console.log("Created Dog:", result);
        return result;
    } catch (error) {
        console.error("Error creating dog:", error);
    }
}

async function deleteDog(dogId: string, deleteType: "in_trash" | "archived") {
    try {
        const query = notion.model(Dogs);
        const result = await query.softDelete(dogId, deleteType);
        console.log(`Dog moved to ${deleteType}:`, result);
        return result;
    } catch (error) {
        console.error("Error deleting dog:", error);
    }
}

async function restoreDog(dogId: string) {
    try {
        const query = notion.model(Dogs);
        const result = await query.restoreRecord(dogId);
        console.log("Restored Dog:", result);
        return result;
    } catch (error) {
        console.error("Error restoring dog:", error);
    }
}

(async () => {
    await getDogs();
    await getArticles();
    await getArticlePage("...86218917");
    await updateDog("...0bb235c3", "https://example.com/new_dog_image.png");
    await updateArticle("...e5888237", {
        email: "updatedemail@example.com",
        phone: "+123456789",
        isPublished: "Live",
        lastEditedTime: new Date().toISOString(),
    });
    await createDog({
        name: "Pitbull",
        image: "https://pitbull.com/image.png"
    });
    await deleteDog("...912d9fc4", "in_trash");
    await restoreDog("...912d9fc4");
})();