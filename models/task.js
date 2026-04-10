import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;