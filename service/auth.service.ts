import { UserRepository } from "../repositories/user.repository";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

export class AuthService {
  constructor(private readonly userRepository = new UserRepository()) {}

  async register(name: string, email: string, password: string) {
    const existingUser = await this.userRepository.findUserByEmail(email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
    });

    return {
      user,
      token,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
    });

    return {
      user,
      token,
    };
  }

  async logout() {

    return {
      message: "Logged out successfully",
    };
  }

  async getCurrentUser(userId: string) {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}