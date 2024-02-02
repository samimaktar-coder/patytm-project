const express = require('express');
const { signUpSchema, signInSchema, updateUserSchema } = require('../type');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { User, Account } = require('../db');
const authMiddleware = require('../middleware');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const userData = req.body;
    const checkUser = signUpSchema.safeParse(userData);


    if (!checkUser.success) {
        return res.status(422).json({
            msg: 'Please check you inputs'
        });
    }

    const existingUser = await User.findOne({ username: userData.username });

    if (existingUser) {
        return res.status(409).json({
            msg: 'This username is already taken.'
        });
    }

    const user = await User.create(userData);



    await Account.create({ userId: user._id, balance: Math.floor(Math.random() * 10000) });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.status(201).json({
        message: "User created successfully",
        token: token,
        isLogin: true
    });

});

router.post('/signin', async (req, res) => {
    const userData = req.body;

    const checkUser = signInSchema.safeParse(userData);

    if (!checkUser.success) {
        res.json({ message: 'Please check your inputs' });
    }

    const existingUser = await User.findOne({ username: userData.username, password: userData.password });

    if (existingUser) {
        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);
        return res.json({ token, isLogin: true });
    }

    res.status(411).json({
        message: "Error while logging in",
    });
});

router.get('/details', authMiddleware, async (req, res) => {
    let user = await User.findOne({ _id: req.userId });
    res.status(200).json({ user });
});

router.post('/logout', async (req, res) => {
    const userId = req.userId;
    await User.updateOne({ _id: userId }, { isLogin: false });

    res.json({
        message: "Log out successfully",
        isLogin: false
    });
});


router.put('/', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const userData = req.body;
    const { success } = updateUserSchema.safeParse(userData);

    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    await User.updateOne({ _id: userId }, userData);

    res.json({
        message: "Updated successfully"
    });

});

router.get('/delete', authMiddleware, async (req, res) => {
    await User.deleteOne({ _id: req.userId });
    await Account.deleteOne({ userId: req.userId });
    res.status(200).json({ msg: 'Account deleted successfully' });
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });

    // const users = await User.find({});

    // let newUsers = [];

    // users.forEach(user => {
    //     if (user.firstName.toLowerCase().includes(filter.toLowerCase()) || user.lastName.toLowerCase().includes(filter.toLowerCase())) {
    //         newUsers.push(user);
    //     }
    // });

    // res.json({ users: newUsers });

});


module.exports = router;