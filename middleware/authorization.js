import User from "../models/user.js";
import jwt from "jsonwebtoken";

const authorization = async (req, res, next) => {
    try {
        const { auth_token } = req.headers;

        if (!auth_token) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const data = jwt.verify(auth_token, "my_secret")

        const user = await User.findById(data.id)

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        next();

    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Unauthorized" })
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default authorization;