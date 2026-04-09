import { a, body } from "framer-motion/client";
import User from "../models/user.js";
import { compareHash, generateAuthToken, genrateHash } from "../application.js";
import jwt from "jsonwebtoken";

async function getUsers(req, res) {
    try {
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const users = await User.find().skip(skip).limit(limit);
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);

        res.status(500).json({ meassage: 'Internal server error' });
    }
}


async function createUser(req, res) {
    try {
        const { name, about, field } = req.body;
        const user = await User.create({
            name,
            about,
            field
        })
        res.status(201).json({ message: 'User created successfully', user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function patchUser(req, res) {
    try {
        const { id } = req.params;
        const { name, about, field } = req.body;

        const updatedUser = await User.findOneAndReplace(
            { _id: id },
            { name, about, field },
            { new: true, runValidators: true }
        )
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function putUser(req, res) {
    try {
        const { id } = req.params;
        const { name, phone_number, course } = req.body;

        if (!name || !phone_number || !course) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, about, field },
            { new: true, runValidators: true }
        )
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function signup(req, res) {
    try {
        let { name, email, password } = req.body;

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedpassword = await genrateHash(password);
        let newuser = await User.create({ name, email, password: hashedpassword })

        let auth_token = generateAuthToken(newuser)

        let data = {
            id: newuser._id,
            name: newuser.name,
            email: newuser.email,
            auth_token
        }

        res.status(201).json({ message: "Signup successful", data })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function login(req, res) {
    try {
        let { email, password } = req.body;

        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        let isCorrect = await compareHash(password, user.password)

        if (!isCorrect) {
            return res.status(400).json({ message: "Invalid creadential password" })
        }



        const auth_token = generateAuthToken(user)

        let data = {
            id: user._id,
            name: user.name,
            email: user.email,
            auth_token
        }

        res.status(200).json({
            data
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}





export { getUsers, createUser, deleteUser, patchUser, putUser, signup, login };


