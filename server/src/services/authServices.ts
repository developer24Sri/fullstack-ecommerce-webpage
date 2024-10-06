import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel, IUser } from "../models/user";
import { UserErrors } from "../common/error";

// Service for registering a user
export const register = async (username: string, password: string) => {
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    return UserErrors.USERNAME_ALREADY_EXISTS;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();

  return null; // Success
};

// Service for logging in a user
export const login = async (username: string, password: string) => {
  const user: IUser | null = await UserModel.findOne({ username });
  if (!user) {
    return { error: UserErrors.NO_USER_FOUND };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { error: UserErrors.WRONG_CREDENTIALS };
  }

  const token = jwt.sign({ id: user._id }, "secret");
  return { token, userID: user._id };
};

// Service for fetching user's available money
export const fetchAvailableMoney = async (userID: string) => {
  const user = await UserModel.findById(userID);
  return user ? user.availableMoney : null;
};
