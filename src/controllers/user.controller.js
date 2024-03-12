import { ApiError } from "../utils/error.js";
import { User } from "../db/Models/user.model.js";

const registerUser = async function (req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      throw new ApiError(400, "All fields are required!", false, [
        "All fields are required!",
      ]);
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    return user;
  } catch (error) {
    return error;
  }
};

export { registerUser };
