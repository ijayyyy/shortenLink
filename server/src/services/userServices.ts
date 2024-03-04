import User from "../models/userModels";
import {
  UserRegisterPayloadType,
  UserType,
  UserLogInPayloadType,
} from "../types/userTypes";
import { compareHash, createHash } from "../util/hash";

export const createUser = async (
  payload: UserRegisterPayloadType
): Promise<UserType> => {
  try {
    //hash passsword
    const user = await User.create({
      ...payload,
      password: createHash(payload.password),
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const logInUser = async (
  payload: UserLogInPayloadType
): Promise<UserType | boolean> => {
  try {
    const user = await User.findOne({ email: payload.email });
    if (!user) return false;
    //compare passwords
    const passswordMatch = compareHash(payload.password, user.password);
    if (!passswordMatch) {
      return false;
    }
    return user;
  } catch (error) {
    throw new Error("something is wrong");
  }
};

export const getUserById = async (id: string): Promise<Partial<UserType>> => {
  const user = await User.findById(id);
  if (!user) throw new Error("User does not exist");
  return {
    id: user.id,
    fullName: user.fullName,
    avatar: user.avatar,
    email: user.email,
  };
};

export const updateUser = async (
  userId: string,
  payload: Partial<UserType>
) => {
  try {
    let data = await User.findById(userId);

    if (!data) {
      throw new Error("User not found");
    }

    // Editable column restriction
    const editableColumns: Array<keyof UserType> = ["fullName", "avatar"];

    // Update the fields specified in the payload
    editableColumns.forEach((key) => {
      if (payload[key] !== undefined) {
        // Check for undefined before updating
        data![key] = payload[key] as UserType[keyof UserType];
      }
    });

    // Save the updated document
    await data.save();

    return "updated";
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error
  }
};
