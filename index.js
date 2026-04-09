import express from 'express'
import { getUsers, createUser, deleteUser, patchUser, putUser, signup, login } from './controllers/userController.js'
import mongoose from 'mongoose'
import cors from 'cors'
import authorization from './middleware/authorization.js'

const app = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }));

app.post('/api/signup', signup);
app.post('/api/login', login);

app.use(authorization);

app.get('/api/user', getUsers);
app.post('/api/user', createUser);
app.delete('/api/user/:id', deleteUser);
app.patch('/api/user/:id', patchUser);
app.put('/api/user/:id', putUser);


app.get('/', (req, res) => {
    res.send('Hello! This is a first Express server! 🎉')
})

const PORT = 8000

// Database connection pahila, ani server start
mongoose.connect('mongodb://localhost:27017/MyDatabase')
    .then(() => {
        console.log('✅ MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`✅ Server is running! http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
    });




