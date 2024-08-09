const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Add bcrypt
const saltRounds = 10; // Define salt rounds for hashing

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/employee', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const User = mongoose.model('users', userSchema);

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    console.log("body", req.body);

    if (password) {
        // Hash the password
        bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
            if (err) {
                return res.status(500).send('Error hashing password');
            }
            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();
            res.status(201).send('User created');
        });
    } else {
        res.status(400).send('Password required');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return res.status(200).send('Login successful');
        } else {
            return res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error');
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
