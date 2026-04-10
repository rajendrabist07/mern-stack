import Task from "../models/task.js";

async function createTask(req, res) {
    try {
        const { name } = req.body;
        const { user } = req;
        const newTask = await Task.create({ name, user_id: user._id })

        res.status(201).json({ message: "task added successfully", data: newTask })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error })
    }
}

async function getTasks(req, res) {
    try {
        const { user } = req;
        const tasks = await Task.find({ user_id: user._id });
        res.status(200).json({ message: 'tasks fetched successfully', data: tasks })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error })
    }
}

export { createTask, getTasks }