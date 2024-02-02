const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            minLength: 3,
            maxLength: 35
        },
        password: {
            type: String,
            required: true,
            minLength: 6
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 30
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 30
        }
    },
    { timestamps: true }
);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = { User, Account };