import { Response } from "express";

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    return res.status(500).json({ message: error.message });
  }
  // If error is not an instance of Error, return a generic error message
  return res.status(500).json({ message: "An unexpected error occurred." });
};
