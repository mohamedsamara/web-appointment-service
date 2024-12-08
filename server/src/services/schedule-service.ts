import { AppDataSource } from "../database/data-source";
import { Schedule } from "../entities/schedule";
import { Availability } from "../entities/availability";
import { Slot } from "../entities/slot";
import { Staff } from "../entities/staff";

export class ScheduleService {
  private scheduleRepository = AppDataSource.getRepository(Schedule);
  private availabilityRepository = AppDataSource.getRepository(Availability);
  private slotRepository = AppDataSource.getRepository(Slot);
  private staffRepository = AppDataSource.getRepository(Staff);

  // Get the schedule for a specific staff member
  async getScheduleByStaff(staffId: number) {
    const schedule = await this.scheduleRepository.findOne({
      where: { staff: { id: staffId } },
      relations: ["staff", "availabilities.slots"],
    });
    if (!schedule) {
      throw new Error("Schedule not found");
    }
    return schedule;
  }

  // Create a new schedule for a staff member
  async createSchedule(data: { staffId: number; name?: string }) {
    const staff = await this.staffRepository.findOne({
      where: { id: data.staffId },
    });
    if (!staff) {
      throw new Error("Staff member not found");
    }

    const newSchedule = this.scheduleRepository.create({
      staff,
      startDate: new Date(),
      name: data.name,
    });

    const savedSchedule = await this.scheduleRepository.save(newSchedule);
    return savedSchedule;
  }
  // Create a new availability within a schedule
  async createAvailability(data: {
    scheduleId: number;
    dayOfWeek: number; // Day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    startTime: string;
    endTime: string;
  }) {
    // Check if the schedule exists
    const schedule = await this.scheduleRepository.findOne({
      where: { id: data.scheduleId },
    });
    if (!schedule) {
      throw new Error("Schedule not found");
    }

    // Create a new Availability record
    const newAvailability = this.availabilityRepository.create({
      schedule,
      staff: schedule.staff,
      dayOfWeek: data.dayOfWeek,
      startTime: data.startTime,
      endTime: data.endTime,
    });

    // Save the Availability record to the database
    return await this.availabilityRepository.save(newAvailability);
  }

  // Update an availability within a schedule
  async updateAvailability(data: {
    availabilityId: number;
    dayOfWeek: number; // Day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    startTime: string;
    endTime: string;
  }) {
    // Find the availability record by ID within a schedule
    const availability = await this.availabilityRepository.findOne({
      where: {
        id: data.availabilityId,
      },
    });
    if (!availability) {
      throw new Error("Availability not found");
    }

    // Update the availability times
    availability.startTime = data.startTime;
    availability.endTime = data.endTime;
    availability.dayOfWeek = data.dayOfWeek;
    return await this.availabilityRepository.save(availability);
  }

  // Delete an availability within a schedule
  async deleteAvailability(data: { availabilityId: number }) {
    const availability = await this.availabilityRepository.findOne({
      where: {
        id: data.availabilityId,
      },
    });

    if (!availability) {
      throw new Error("Availability not found");
    }

    // Delete all slots related to this availability
    await this.slotRepository.delete({ availability: { id: availability.id } });

    // Delete the availability itself
    await this.availabilityRepository.remove(availability);
  }

  // Create slots for a specific availability
  async createSlots(data: {
    availabilityId: number;
    slots: { startTime: string; endTime: string }[];
  }) {
    const availability = await this.availabilityRepository.findOne({
      where: {
        id: data.availabilityId,
      },
    });

    if (!availability) {
      throw new Error("Availability not found");
    }

    const newSlots: Slot[] = data.slots.map((slot) => {
      return this.slotRepository.create({
        availability,
        startTime: slot.startTime,
        endTime: slot.endTime,
      });
    });

    await this.slotRepository.save(newSlots);
    return newSlots;
  }

  // Delete a specific slot from an availability
  async deleteSlot(data: { slotId: number }) {
    const slot = await this.slotRepository.findOne({
      where: {
        id: data.slotId,
      },
    });

    if (!slot) {
      throw new Error("Slot not found");
    }

    await this.slotRepository.remove(slot);
  }
}
