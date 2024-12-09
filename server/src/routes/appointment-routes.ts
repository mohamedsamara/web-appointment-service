import { Router } from "express";

import * as appointmentController from "../controllers/appointment-controller";

const router = Router();

// Appointment Routes

// Get appointments by staff
router.get("/staff/:staffId", appointmentController.getAppointments);

// Get appointment slots
router.get("/slots", appointmentController.getAppointmentSlots);

// Get appointment by id
router.get("/:id", appointmentController.getAppointment);

// Create appointment
router.post("/", appointmentController.createAppointment);

// Update appointment
router.put("/:id", appointmentController.updateAppointment);

// DELETE appointment
router.delete("/:id", appointmentController.deleteAppointment);

// Appointment Request Routes

// Get appointment requests by staff
router.get(
  "/request/staff/:staffId",
  appointmentController.getAppointmentRequests
);
router.post("/request", appointmentController.createAppointmentRequest);

router.put(
  "/request/:requestId/approve",
  appointmentController.approveAppointmentRequest
);
router.put(
  "/request/:requestId/reject",
  appointmentController.rejectAppointmentRequest
);

export default router;
