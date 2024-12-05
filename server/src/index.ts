import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";

import { AppDataSource } from "./database/data-source";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({}));
app.use(express.json());

// Connect to the database
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");

    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error("Error connecting to the database:", error);
  });

// Health check route
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Service is healthy and running.",
    timestamp: new Date().toISOString(),
  });
});

// 404 route
app.use((req: Request, res: Response) => {
  res.status(404).send("<h1>Not Found</h1>");
});
