import { Request, Response } from "express";

import { AppointmentService } from "../services/appointment-service";
import { handleError } from "../utils/error-handler";

const appointmentService = new AppointmentService();

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const staffId = parseInt(req.params.staffId);
    const appointments = await appointmentService.getAppointmentsByStaff(
      staffId
    );
    res.status(200).json(appointments);
  } catch (error) {
    handleError(error, res);
  }
};

export const getAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentId = parseInt(req.params.id);
    const appointment = await appointmentService.getAppointmentById(
      appointmentId
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    handleError(error, res);
  }
};

export const getAppointmentSlots = async (req: Request, res: Response) => {
  try {
    const { staffId, startTime, endTime, durationInMinutes } = req.query;

    const appointment = await appointmentService.getAppointmentSlotsByStaff({
      staffId: parseInt(staffId as string, 10),
      startTime: parseInt(startTime as string, 10),
      endTime: parseInt(endTime as string, 10),
      durationInMinutes: parseInt(durationInMinutes as string, 10),
    });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    handleError(error, res);
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { userId, staffId, startTime, endTime } = req.body;
    const newAppointment = await appointmentService.createAppointment({
      userId,
      staffId,
      startTime,
      endTime,
    });
    res.status(201).json(newAppointment);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentId = parseInt(req.params.id);
    const { userId, staffId, startTime, endTime } = req.body;

    const updatedAvailability = await appointmentService.updateAppointment({
      appointmentId,
      userId,
      staffId,
      startTime,
      endTime,
    });
    res.status(200).json(updatedAvailability);
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentId = parseInt(req.params.id);

    await appointmentService.deleteAppointment({
      appointmentId,
    });
    res.status(204).send();
  } catch (error) {
    handleError(error, res);
  }
};

export const getAppointmentRequests = async (req: Request, res: Response) => {
  try {
    const staffId = parseInt(req.params.staffId);
    const appointmentRequests =
      await appointmentService.getAppointmentRequestsByStaff(staffId);
    res.status(200).json(appointmentRequests);
  } catch (error) {
    handleError(error, res);
  }
};

export const createAppointmentRequest = async (req: Request, res: Response) => {
  try {
    const { userId, staffId, startTime, durationInMinutes } = req.body;
    const newAppointment = await appointmentService.createAppointmentRequest({
      userId,
      staffId,
      startTime,
      durationInMinutes,
    });
    res.status(201).json(newAppointment);
  } catch (error) {
    handleError(error, res);
  }
};

export const approveAppointmentRequest = async (
  req: Request,
  res: Response
) => {
  try {
    const appointmentRequestId = parseInt(req.params.requestId);

    await appointmentService.approveAppointmentRequest({
      appointmentRequestId,
    });
    res.status(204).send();
  } catch (error) {
    handleError(error, res);
  }
};

export const rejectAppointmentRequest = async (req: Request, res: Response) => {
  try {
    const appointmentRequestId = parseInt(req.params.requestId);

    await appointmentService.rejectAppointmentRequest({
      appointmentRequestId,
    });
    res.status(204).send();
  } catch (error) {
    handleError(error, res);
  }
};
