import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ForkKnife } from 'lucide-react';


const genrateHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(`${password}`, salt);
    return hash;
}


const compareHash = async (password, hashPassword) => {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
}


const privateKey = "my_secret"

const generateAuthToken = (user) => {
    const data = {
        id: user.id,
        name: user.name
    }

    return jwt.sign(data, privateKey, { expiresIn: '1h' });

}

export { generateAuthToken, genrateHash, compareHash }



