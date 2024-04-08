import Attribute from "../models/attribute.model.js";

export const taskOwner = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const isUserOwner = await Attribute.findOne({
      $and: [{ user: userId }, { tasks: id }],
    });
    if (!isUserOwner) {
      return res.status(403).json({ message: "Task is not yours" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errors: error.message });
  }
};
