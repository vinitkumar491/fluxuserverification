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

    const { letterNo } = req.body;

    if (!letterNo || !String(letterNo).trim()) {
      return res.status(400).json({
        success: false,
        message: "Letter No. is required",
      });
    }

    const user = await User.findOne({
      letterNo: {
        $regex: `^${escapeRegex(String(letterNo).trim())}$`,
        $options: "i",
      },
    }).select("name letterNo program issueDate");

    console.log("Matched User:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No certificate found for this Letter No.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Certificate verified",
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
