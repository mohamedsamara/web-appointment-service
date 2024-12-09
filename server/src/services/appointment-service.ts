import { LessThan, MoreThan, Not } from "typeorm";
import { DateTime, Interval } from "luxon";

import { AppDataSource } from "../database/data-source";
import { Appointment } from "../entities/appointment";
import {
  AppointmentRequest,
  AppointmentRequestStatus,
} from "../entities/appointment-request";
import { StaffService } from "./staff-service";
import { UserService } from "./user-service";
import { Availability } from "../entities/availability";

export class AppointmentService {
  private userService = new UserService();
  private staffService = new StaffService();
  private appointmentRequestRepository =
    AppDataSource.getRepository(AppointmentRequest);
  private appointmenRepository = AppDataSource.getRepository(Appointment);
  private availabilityRepository = AppDataSource.getRepository(Availability);

  private MAX_AVAILABILITY_SLOT_TIME_RANGE = 24 * 60 * 60 * 1000; // Example: 24 hours in milliseconds

  async getAppointmentsByStaff(staffId: number) {
    return await this.appointmenRepository.find({
      where: { staff: { id: staffId } },
      relations: ["staff", "user", "request"],
    });
  }

  async getAppointmentById(id: number) {
    return await this.appointmenRepository.findOne({
      where: { id },
      relations: ["staff", "user", "request"],
    });
  }

  async getAppointmentSlotsByStaff(data: {
    staffId: number;
    startTime: number;
    endTime: number;
    durationInMinutes: number;
  }) {
    const { staffId, startTime, endTime, durationInMinutes } = data;

    const duration = durationInMinutes * 60 * 1000;
    const slots = await this.getValidSlots(
      staffId,
      startTime,
      endTime,
      duration
    );

    if (slots.length === 0) {
      throw new Error("No available slots for the specified time range.");
    }

    return slots;
  }

  async createAppointment(data: {
    userId: number;
    staffId: number;
    startTime: number; // Epoch time (milliseconds)
    endTime: number; // Epoch time (milliseconds)
  }) {
    const { userId, staffId, startTime, endTime } = data;

    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const staff = await this.staffService.getStaffById(staffId);
    if (!staff) {
      throw new Error("Staff not found");
    }

    // Create and save the new appointment with epoch timestamps
    const newAppointment = this.appointmenRepository.create({
      user,
      staff,
      startTime: startTime, // Store as epoch time
      endTime: endTime, // Store as epoch time
    });

    return await this.appointmenRepository.save(newAppointment);
  }

  async updateAppointment(data: {
    appointmentId: number;
    userId: number;
    staffId: number;
    startTime: number; // Epoch time (milliseconds)
    endTime: number; // Epoch time (milliseconds)
  }) {
    const { appointmentId, userId, staffId, startTime, endTime } = data;

    const appointment = await this.appointmenRepository.findOne({
      where: {
        id: appointmentId,
      },
    });
    if (!appointment) {
      throw new Error("Appointment not found");
    }

    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const staff = await this.staffService.getStaffById(staffId);
    if (!staff) {
      throw new Error("Staff not found");
    }

    // Update the availability times
    appointment.user = user;
    appointment.staff = staff;
    appointment.startTime = startTime;
    appointment.endTime = endTime;
    return await this.appointmenRepository.save(appointment);
  }

  async deleteAppointment(data: { appointmentId: number }) {
    const appointment = await this.appointmenRepository.findOne({
      where: {
        id: data.appointmentId,
      },
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    await this.appointmenRepository.remove(appointment);
  }

  async getAppointmentRequestsByStaff(staffId: number) {
    return await this.appointmentRequestRepository.find({
      where: { staff: { id: staffId } },
      relations: ["staff", "user"],
    });
  }

  async createAppointmentRequest(data: {
    userId: number;
    staffId: number;
    startTime: number; // Epoch time (milliseconds)
    durationInMinutes: number;
  }) {
    const { userId, staffId, startTime, durationInMinutes } = data;

    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const staff = await this.staffService.getStaffById(staffId);
    if (!staff) {
      throw new Error("Staff not found");
    }

    const duration = durationInMinutes * 60 * 1000;
    const endTime = startTime + duration;
    const slots = await this.getValidSlots(
      staffId,
      startTime,
      endTime,
      duration
    );

    if (slots.length === 0) {
      throw new Error("No available slots for the specified time range.");
    }

    console.log("slots", slots);

    // Create and save the new appointment request with epoch timestamps
    const newAppointment = this.appointmentRequestRepository.create({
      user,
      staff,
      startTime: startTime, // Store as epoch time
      endTime: endTime, // Store as epoch time
      status: AppointmentRequestStatus.Pending,
    });

    return await this.appointmentRequestRepository.save(newAppointment);
  }

  async approveAppointmentRequest(data: { appointmentRequestId: number }) {
    const { appointmentRequestId } = data;

    const appointmentRequest = await this.appointmentRequestRepository.findOne({
      where: {
        id: appointmentRequestId,
      },
      relations: ["staff", "user"],
    });

    if (!appointmentRequest) {
      throw new Error("Appointment request not found");
    }
    // Create and save the new appointment with epoch timestamps
    const newAppointment = this.appointmenRepository.create({
      user: appointmentRequest.user,
      staff: appointmentRequest.staff,
      request: appointmentRequest,
      startTime: appointmentRequest.startTime,
      endTime: appointmentRequest.endTime,
    });

    await this.appointmenRepository.save(newAppointment);

    appointmentRequest.status = AppointmentRequestStatus.Approved;
    return await this.appointmentRequestRepository.save(appointmentRequest);
  }

  async rejectAppointmentRequest(data: { appointmentRequestId: number }) {
    const { appointmentRequestId } = data;

    const appointmentRequest = await this.appointmentRequestRepository.findOne({
      where: {
        id: appointmentRequestId,
      },
      relations: ["staff", "user"],
    });

    if (!appointmentRequest) {
      throw new Error("Appointment request not found");
    }

    appointmentRequest.status = AppointmentRequestStatus.Rejected;
    return await this.appointmentRequestRepository.save(appointmentRequest);
  }

  async getValidSlots(
    staffId: number,
    startTime: number,
    endTime: number,
    duration: number
  ): Promise<number[][]> {
    const timeRange = endTime - startTime;
    if (timeRange <= 0 || timeRange > this.MAX_AVAILABILITY_SLOT_TIME_RANGE) {
      throw new Error("Invalid time range");
    }
    const TIMEZONE = "America/Los_Angeles"; // TODO Replace with actual timezone fetching logic if needed

    const dayOfWeek =
      DateTime.fromMillis(startTime).setZone(TIMEZONE).weekday % 7;

    // Fetch the availabilities for the staff member
    const availabilities = await this.availabilityRepository.find({
      where: { staff: { id: staffId }, dayOfWeek },
      relations: ["schedule", "slots"],
    });

    if (!availabilities || availabilities.length === 0) return [];

    const generatedSlots: number[][] = [];

    // Iterate through availabilities and generate slots for the specific day
    for (const availability of availabilities) {
      for (const slot of availability.slots) {
        const slotStartTimestamp = DateTime.fromObject({
          year: DateTime.fromMillis(startTime).year,
          month: DateTime.fromMillis(startTime).month,
          day: DateTime.fromMillis(startTime).day,
          hour: parseInt(slot.startTime.split(":")[0], 10),
          minute: parseInt(slot.startTime.split(":")[1], 10),
        })
          .setZone(TIMEZONE)
          .toMillis();

        const slotEndTimestamp = DateTime.fromObject({
          year: DateTime.fromMillis(startTime).year,
          month: DateTime.fromMillis(startTime).month,
          day: DateTime.fromMillis(startTime).day,
          hour: parseInt(slot.endTime.split(":")[0], 10),
          minute: parseInt(slot.endTime.split(":")[1], 10),
        })
          .setZone(TIMEZONE)
          .toMillis();

        generatedSlots.push([slotStartTimestamp, slotEndTimestamp]);
      }
    }

    // Filter out slots that don't match the requested duration
    const filteredSlots = generatedSlots.filter(
      ([start, end]) => end - start === duration
    );

    // Fetch existing appointments and pending requests
    const pendingRequests = await this.appointmentRequestRepository.find({
      where: {
        startTime: LessThan(endTime), // Checks that the start of the appointment is not after the end of the requested time range.
        endTime: MoreThan(startTime), // Checks that the end of the appointment is not before the start of the requested time range.
        staff: { id: staffId },
        status: Not(AppointmentRequestStatus.Rejected),
      },
    });

    // Retrieves all appointments that overlap with the given time range.
    const bookedAppointments = await this.appointmenRepository.find({
      where: {
        startTime: LessThan(endTime), // Checks that the start of the appointment is not after the end of the requested time range.
        endTime: MoreThan(startTime), // Checks that the end of the appointment is not before the start of the requested time range.
        staff: { id: staffId },
      },
    });

    const existingBlocks = [...pendingRequests, ...bookedAppointments];

    // Check for overlaps between generated slots and existing blocks
    const validSlots: number[][] = [];

    for (const [start, end] of filteredSlots) {
      // Create the slot interval
      const slotStartDateTime = DateTime.fromMillis(start);
      const slotEndDateTime = DateTime.fromMillis(end);
      const slotInterval = Interval.fromDateTimes(
        slotStartDateTime,
        slotEndDateTime
      );

      // Create the requested interval using the input timestamps
      const requestedStartDateTime = DateTime.fromMillis(startTime);
      const requestedEndDateTime = DateTime.fromMillis(endTime);
      const requestedInterval = Interval.fromDateTimes(
        requestedStartDateTime,
        requestedEndDateTime
      );

      let conflict = false;

      for (const block of existingBlocks) {
        const blockStartDateTime = DateTime.fromMillis(block.startTime);
        const blockEndDateTime = DateTime.fromMillis(block.endTime);

        // Create the block interval
        const blockInterval = Interval.fromDateTimes(
          blockStartDateTime,
          blockEndDateTime
        );

        console.log("Block Interval:", blockInterval);
        console.log("Slot Interval:", slotInterval);
        console.log("Do they overlap?", slotInterval.overlaps(blockInterval));

        if (blockInterval.overlaps(slotInterval)) {
          conflict = true;
          break;
        }
      }

      // Check if the requested interval overlaps with the slot interval and no conflict exists
      if (requestedInterval.overlaps(slotInterval) && !conflict) {
        validSlots.push([start, end]);
      }
    }

    return validSlots;
  }
}
