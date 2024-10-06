import { Request, Response } from "express";
import { register, login, fetchAvailableMoney } from "../services/authServices";
import { UserErrors } from "../common/error";

// Controller for registering a user
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const result = await register(username, password);
    if (result === UserErrors.USERNAME_ALREADY_EXISTS) {
      return res.status(400).json({ type: result });
    }
    res.json({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(500).json({ type: err });
  }
};

// Controller for user login
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const { token, userID, error } = await login(username, password);
    if (error) {
      return res.status(400).json({ type: error });
    }
    res.json({ token, userID });
  } catch (err) {
    res.status(500).json({ type: err });
  }
};

// Controller for fetching available money
export const getAvailableMoney = async (req: Request, res: Response) => {
  const { userID } = req.params;
  try {
    const availableMoney = await fetchAvailableMoney(userID);
    if (!availableMoney) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }
    res.json({ availableMoney });
  } catch (err) {
    res.status(500).json({ type: err });
  }
};
