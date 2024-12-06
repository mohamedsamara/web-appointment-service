import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { AppDataSource } from "./database/data-source";
import routes from "./routes";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({}));
app.use(express.json());

// Connect to the database
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");

    app.use(routes);

    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error("Error connecting to the database:", error);
  });
