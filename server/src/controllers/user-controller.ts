import { NextFunction, Request, Response } from "express";

import { UserService } from "../services/user-service";
import { handleError } from "../utils/error-handler";

const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    handleError(error, res);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    handleError(error, res);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, staff } = req.body;
    const newUser = await userService.createUser({ username, email, staff });
    res.status(201).json(newUser);
  } catch (error) {
    handleError(error, res);
  }
};
