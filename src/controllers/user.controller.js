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

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      throw new ApiError(500, "Something want wrong");
    }

    res.status(201).send(createdUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

const loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required!");
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      throw new ApiError(400, "Invalid username and password");
    }
    const isCorrectPassword = await user.isPasswordCorrect(password);

    if (!user || !isCorrectPassword) {
      throw new ApiError(401, "Unauthorized");
    }

    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    user.refreshToken = refreshToken;
    user.accessToken = accessToken;
    user.save();

    const loginedUser = await User.findOne(user._id).select(
      "-password -refreshToken",
    );

    res
      .cookie("Authorization", accessToken, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .send(loginedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};
export { registerUser, loginUser };
