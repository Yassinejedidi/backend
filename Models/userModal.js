const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: [true, 'The email is unique']

        },
        password: {
            type: String,
            required: true
        },
    }
);
userSchema.pre('save', async function (next) {
    console.log("@@ 1 @@", this.password)
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        console.log("@@ 2 @@", salt)
        this.password = await bcrypt.hash(this.password, salt);
        console.log("@@ 3 @@", this.password)
        next();
    }
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('user', userSchema);
module.exports = User;