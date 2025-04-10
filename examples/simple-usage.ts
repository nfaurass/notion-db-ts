// Import main NotionDB class from the package.
import NotionDB from "../src/NotionDB";
// import NotionDB from "notion-db-ts" // Use this for production.

// Import the configuration interface for NotionDB.
import {NotionDBConfig} from "../src/types/index.types";

// Define the Notion Database configuration.
const config: NotionDBConfig = {
    integrationToken: "ntn_6048....", // Set integration token.
    capabilities: { // Specify allowed operations.
        comment: ["read", "insert"], // Allow comment read and insert.
        content: ["read", "insert", "update"], // Allow content read, insert, and update.
        user: "no", // Disable user operations.
    },
    database: "1b7e15184d4d8004abe9ffcc33d9fda6", // Define associated database id.
}

// Create an instance of NotionDB using the configuration.
const notion = new NotionDB(config); // Instantiate main NotionDB class.

// Define the "Dogs" model with its database id and schema.
const Dogs = notion.defineModel("dogs", "1b7e15184d4d80cb9494fab219e447d6",
    {
        name: "title", // Field 'name' of type 'title'.
        image: "url", // Field 'image' of type 'url'.
    }
);

// Define the "Articles" model with its database id and schema.
const Articles = notion.defineModel("articles", "1b7e15184d4d80a29b93e434febdff3a",
    {
        date: "date", // Field 'date' of type 'date'.
        title: "title", // Field 'title' of type 'title'.
        content: "rich_text", // Field 'content' of type 'rich_text'.
        author: "people", // Field 'author' of type 'people'.
        isPublished: "status", // Field 'isPublished' of type 'status'.
        createdAt: "created_time", // Field 'createdAt' of type 'created_time'.
        createdBy: "created_by", // Field 'createdBy' of type 'created_by'.
        lastEditedTime: "last_edited_time", // Field 'lastEditedTime' of type 'last_edited_time'.
        lastEditedBy: "last_edited_by", // Field 'lastEditedBy' of type 'last_edited_by'.
    }
);

// Self-invoking async function to demonstrate usage of the package.
(async () => {
    // Retrieve all records from the Dogs model.
    const dogs = await notion.model(Dogs).findAll(); // Fetch all dog records.
    console.log("Dogs:", dogs); // Output fetched dog records.

    // Retrieve all records from the Articles model.
    const articles = await notion.model(Articles).findAll(); // Fetch all article records.
    console.log("Articles:", articles); // Output fetched article records.

    // Retrieve content blocks from a specific Article page.
    const articleContent = await notion.model(Articles).getPageContent("1b7e15184d4d81e689afce8e86218917"); // Fetch article page content.
    console.log("Article Page Blocks:", articleContent); // Output article content blocks.

    // Update a specific Dog record with new details.
    const updatedDog = await notion.model(Dogs).updateRecord("1d1e15184d4d817ab024fa780495f3b3", {
        name: "New Dog Name", // New name for the dog.
        image: "https://images.com/newdog" // New image URL for the dog.
    });
    console.log("Updated Dog:", updatedDog); // Output the updated dog record.

    // Update a specific Article record with new details.
    const updatedArticle = await notion.model(Articles).updateRecord("1b7e15184d4d81ecb3b0f754bf47538e", {
        title: "New Article Name", // New title for the article.
        isPublished: "Live" // New publication status for the article.
    });
    console.log("Updated Article:", updatedArticle); // Output the updated article record.

    // Create a new Dog record.
    const createdDog = await notion.model(Dogs).createRecord({
        name: "My New Dog", // Name of the new dog.
        image: "https://newdog.com/image.png" // Image URL for the new dog.
    });
    console.log("Created Dog:", createdDog); // Output the created dog record.

    // Uncomment to create a new Article record (example provided).
    // const createdArticle = await notion.model(Articles).createRecord({
    //     title: "My New Article", // Title for the new article.
    //     isPublished: "Draft", // Set publication status as 'Draft'.
    // })

    // Soft delete a Dog record by moving it to archive.
    const archivedDog = await notion.model(Dogs).softDelete("1b7e15184d4d80b59e28f1d1f333aea2", "archived"); // Archive a dog record.
    console.log(`Dog moved to archive:`, archivedDog); // Output archived dog record.

    // Soft delete a Dog record by moving it to trash.
    const trashedDog = await notion.model(Dogs).softDelete("1b7e15184d4d8030b7c4ea0a3574ffbe", "in_trash"); // Move a dog record to trash.
    console.log(`Dog moved to trash:`, trashedDog); // Output trashed dog record.

    // Restore a previously soft-deleted Dog record.
    const restoredDog = await notion.model(Dogs).restoreRecord("1b7e15184d4d80b59e28f1d1f333aea2"); // Restore an archived/trash dog record.
    console.log("Restored Dog:", restoredDog); // Output restored dog record.
})();