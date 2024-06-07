// Load bcrypt module, used to hash the passwords
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Schema, model } = require('mongoose');

// Define a new 'StudentSchema'
const studentSchema = new Schema({
    studentNumber: {
        type: String,
        required: true,
        unique: true
    },
    studentName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    }
});

// Hash the passwords before saving
studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Generate JWT token
studentSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'your_secret_key'); // Replace 'your_secret_key' with a secure key
    return token;
};

// Create the 'Student' model out of the 'studentSchema'
module.exports = model('Student', studentSchema);
