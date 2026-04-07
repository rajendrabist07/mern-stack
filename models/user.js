import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    // about: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // field: {
    //     type: String,
    //     required: true,
    //     enum: ["Full-Stack Developer", "MERN Stack Developer", "Node.js Developer", "React.js Developer", "Angular Developer", "Vue.js Developer", "Express.js Developer", "MongoDB Specialist", "JavaScript Expert"]
    // }
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
export default User;