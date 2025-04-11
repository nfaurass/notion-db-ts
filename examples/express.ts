import express, {Request, Response} from "express";

import NotionDB from "../src/NotionDB";
// Alternatively for production import with package name:
// import NotionDB from "notion-db-ts";

// Import the configuration interface for NotionDB.
import {NotionDBConfig} from "../src/types";

const app = express();
app.use(express.json());

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

/**
 * GET /api/dogs
 * Retrieves all dog records.
 */
app.get("/api/dogs", async (req: Request, res: Response) => {
    try {
        const dogs = await notion.model(Dogs).findAll();
        res.json({dogs});
    } catch (error) {
        res.status(500).json({error: String(error)});
    }
});

/**
 * GET /api/articles
 * Retrieves all article records.
 */
app.get("/api/articles", async (req: Request, res: Response) => {
    try {
        const articles = await notion.model(Articles).findAll();
        res.json({articles});
    } catch (error) {
        res.status(500).json({error: String(error)});
    }
});

/**
 * GET /api/articles/content/:pageId
 * Retrieves content blocks from a specific article page.
 */
app.get("/api/articles/content/:pageId", async (req: Request, res: Response) => {
    try {
        const {pageId} = req.params;
        const articleContent = await notion.model(Articles).getPageContent(pageId);
        res.json({articleContent});
    } catch (error) {
        res.status(500).json({error: String(error)});
    }
});

/**
 * PUT /api/dogs/:id
 * Update a dog record with new details.
 */
app.put("/api/dogs/:id", async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {name, image} = req.body;
        const updatedDog = await notion.model(Dogs).updateRecord(id, {name, image});
        res.json({updatedDog});
    } catch (error) {
        res.status(500).json({error: String(error)});
    }
});

/**
 * PUT /api/articles/:id
 * Update an article record with new details.
 */
app.put("/api/articles/:id", async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {title, isPublished} = req.body;
        const updatedArticle = await notion.model(Articles).updateRecord(id, {title, isPublished});
        res.json({updatedArticle});
    } catch (error) {
        res.status(500).json({error: String(error)});
    }
});

/**
 * POST /api/dogs
 * Create a new dog record.
 */
app.post("/api/dogs", async (req: Request, res: Response) => {
    try {
        const {name, image} = req.body;
        const createdDog = await notion.model(Dogs).createRecord({name, image});
        res.json({createdDog});
    } catch (error) {
        res.status(500).json({error: String(error)});
    }
});

/**
 * DELETE /api/dogs/archive/:id
 * Soft delete (archive) a dog record.
 */
app.delete("/api/dogs/archive/:id", async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const archivedDog = await notion.model(Dogs).deleteRecord(id, "archived");
        res.json({archivedDog});
    } catch (error) {
        res.status(500).json({error: String(error)});
    }
});

/**
 * DELETE /api/dogs/trash/:id
 * Soft delete (move to trash) a dog record.
 */
app.delete("/api/dogs/trash/:id", async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const trashedDog = await notion.model(Dogs).deleteRecord(id, "in_trash");
        res.json({trashedDog});
    } catch (error) {
        res.status(500).json({error: String(error)});
    }
});

/**
 * POST /api/dogs/restore/:id
 * Restore a previously soft-deleted dog record.
 */
app.post("/api/dogs/restore/:id", async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const restoredDog = await notion.model(Dogs).restoreRecord(id);
        res.json({restoredDog});
    } catch (error) {
        res.status(500).json({error: String(error)});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express API server running on http://localhost:${PORT}`);
});