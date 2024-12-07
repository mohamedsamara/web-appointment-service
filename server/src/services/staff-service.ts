import { AppDataSource } from "../database/data-source";
import { Staff } from "../entities/staff";

export class StaffService {
  private staffRepository = AppDataSource.getRepository(Staff);

  async getAllStaff() {
    return await this.staffRepository.find({
      relations: ["user"],
    });
  }

  async getStaffById(id: number) {
    return await this.staffRepository.findOne({
      where: { id },
      relations: ["user"],
    });
  }

  async createStaff(data: {
    firstName: string;
    lastName: string;
    specialty: string;
    contactNumber: string;
  }) {
    const newStaff = this.staffRepository.create(data);
    return await this.staffRepository.save(newStaff);
  }
}
