const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, encrypt) => {
        if (err) return res.send(err);

        user.password = encrypt;
        return next();
    });
});

module.exports = mongoose.model('User', UserSchema);