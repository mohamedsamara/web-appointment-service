import { AppDataSource } from "../database/data-source";
import { User } from "../entities/user";
import { StaffService } from "./staff-service";

export class UserService {
  private staffService = new StaffService();
  private userRepository = AppDataSource.getRepository(User);

  async getAllUsers() {
    return await this.userRepository.find({ relations: ["staff"] });
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ["staff"],
    });
  }

  async createUser(data: {
    username: string;
    email: string;
    staff?: {
      firstName: string;
      lastName: string;
      specialty: string;
      contactNumber: string;
    };
  }) {
    if (data.staff) {
      // If staff is provided, create and associate a Staff entity
      const savedStaff = await this.staffService.createStaff(data.staff);

      // Create User and link with the created Staff
      const newUser = this.userRepository.create({
        username: data.username,
        email: data.email,
        staff: savedStaff,
      });

      return await this.userRepository.save(newUser);
    } else {
      const newUser = this.userRepository.create({
        username: data.username,
        email: data.email,
      });
      return await this.userRepository.save(newUser);
    }
  }
}
