import { Request, Response } from "express";

import { ScheduleService } from "../services/schedule-service";
import { handleError } from "../utils/error-handler";

const scheduleService = new ScheduleService();

export const getSchedule = async (req: Request, res: Response) => {
  try {
    const staffId = parseInt(req.params.staffId);
    const schedule = await scheduleService.getScheduleByStaff(staffId);

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    handleError(error, res);
  }
};

export const createSchedule = async (req: Request, res: Response) => {
  try {
    const { staffId, name } = req.body;
    const newSchedule = await scheduleService.createSchedule({
      staffId,
      name,
    });
    res.status(201).json(newSchedule);
  } catch (error) {
    handleError(error, res);
  }
};

export const createDayAvailability = async (req: Request, res: Response) => {
  try {
    const { scheduleId, dayOfWeek, startTime, endTime } = req.body;
    const newAvailability = await scheduleService.createAvailability({
      scheduleId,
      dayOfWeek,
      startTime,
      endTime,
    });
    res.status(201).json(newAvailability);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateDayAvailability = async (req: Request, res: Response) => {
  try {
    const availabilityId = parseInt(req.params.availabilityId);
    const { dayOfWeek, startTime, endTime } = req.body;

    if (!startTime || !endTime) {
      return res
        .status(400)
        .json({ message: "Start time and end time are required" });
    }

    const updatedAvailability = await scheduleService.updateAvailability({
      availabilityId,
      dayOfWeek,
      startTime,
      endTime,
    });
    res.status(200).json(updatedAvailability);
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteDayAvailability = async (req: Request, res: Response) => {
  try {
    const availabilityId = parseInt(req.params.availabilityId);

    await scheduleService.deleteAvailability({
      availabilityId,
    });
    res.status(204).send();
  } catch (error) {
    handleError(error, res);
  }
};

// Slot Management
export const createSlots = async (req: Request, res: Response) => {
  try {
    const availabilityId = parseInt(req.params.availabilityId);
    const { slots } = req.body;

    const newSlots = await scheduleService.createSlots({
      availabilityId,
      slots,
    });
    res.status(201).json(newSlots);
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteSlot = async (req: Request, res: Response) => {
  try {
    const slotId = parseInt(req.params.slotId);

    await scheduleService.deleteSlot({
      slotId,
    });
    res.status(204).send();
  } catch (error) {
    handleError(error, res);
  }
};
