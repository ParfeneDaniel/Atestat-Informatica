import mongoose from "mongoose";

const attributeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Attribute = mongoose.model("Attribute", attributeSchema);

export default Attribute;
