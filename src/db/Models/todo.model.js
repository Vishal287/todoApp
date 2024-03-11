import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: false,
    },
    items: [
      {
        title: {
          type: String,
          require: true,
        },
        isCompeleted: {
          type: Boolean,
          require: true,
          default: false,
        },
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    isCompeleted: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true },
);

const Todo = new mongoose.model("Todo", todoSchema);
