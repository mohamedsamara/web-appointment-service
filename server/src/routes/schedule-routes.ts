//

import express from "express";

import * as scheduleController from "../controllers/schedule-controller";

const router = express.Router();

// Schedule Management Routes

// Create a new staff schedule
router.post("/", scheduleController.createSchedule);

// Get the schedule for a specific staff member
router.get("/staff/:staffId", scheduleController.getSchedule);

// Day Availability Management Routes

// Create a new day availability for a schedule
router.post("/day-availability", scheduleController.createDayAvailability);

// Update a specific day availability for a schedule
router.put(
  "/day-availability/:availabilityId",
  scheduleController.updateDayAvailability
);

// Delete a specific day availability from a schedule
router.delete(
  "/day-availability/:availabilityId",
  scheduleController.deleteDayAvailability
);

// Slot Management Routes

// Create slots for a specific day availability
router.post(
  "/day-availability/:availabilityId/slots",
  scheduleController.createSlots
);

// Delete a specific slot from a day availability
router.delete("/day-availability/slots/:slotId", scheduleController.deleteSlot);

export default router;
