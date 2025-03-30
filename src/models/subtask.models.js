import mongoose, {Schema} from "mongoose";
import { User } from "./user.models";

const subaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

export const SubTask = mongoose.model("SubTask", subaskSchema)