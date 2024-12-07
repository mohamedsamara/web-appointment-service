import { Request, Response } from "express";
import { StaffService } from "../services/staff-service";
import { handleError } from "../utils/error-handler";

const staffService = new StaffService();

export const getStaffMembers = async (req: Request, res: Response) => {
  try {
    const staffMembers = await staffService.getAllStaff();
    res.status(200).json(staffMembers);
  } catch (error) {
    handleError(error, res);
  }
};

export const getStaffMemeber = async (req: Request, res: Response) => {
  try {
    const staffId = parseInt(req.params.id);
    const staff = await staffService.getStaffById(staffId);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.status(200).json(staff);
  } catch (error) {
    handleError(error, res);
  }
};

export const createStaffMember = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, specialty, contactNumber } = req.body;
    const newStaff = await staffService.createStaff({
      firstName,
      lastName,
      specialty,
      contactNumber,
    });
    res.status(201).json(newStaff);
  } catch (error) {
    handleError(error, res);
  }
};
