import User from "../models/user.js";
import jwt from "jsonwebtoken";

const authorization = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const data = jwt.verify(authorization, "my_secret")

        const user = await User.findById(data.id)
        req.user = user

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        next();

    } catch (error) {
        console.log(error)
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Unauthorized" })
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default authorization;