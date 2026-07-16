import User from "../model/User.js";

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const verifyUser = async (req, res) => {
  try {
    console.log("Received:", req.body);

    const { name, email, phone } = req.body;

    const user = await User.findOne({
      name: { $regex: `^${escapeRegex(String(name).trim())}$`, $options: "i" },
      email: { $regex: `^${escapeRegex(String(email).trim())}$`, $options: "i" },
      phone,
    });

    console.log("Matched User:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User verified",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
