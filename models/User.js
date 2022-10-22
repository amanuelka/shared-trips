const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, match: [/^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/i, 'Invalid email'] },
    hashedPassword: { type: String, required: true },
    gender: { type: String, required: true },
    trips: { type: [Types.ObjectId], ref: 'Trip', default: [] }

});

userSchema.index({ email: 1, }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);
module.exports = User;