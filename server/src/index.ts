import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({}));

app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Service is healthy and running.",
    timestamp: new Date().toISOString(),
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).send("<h1>Not Found</h1>");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
