const { Schema, model, Types } = require('mongoose');

const tripSchema = new Schema({
    start: { type: String, required: true, minlength: [4, 'Start point should be at least 4 characters long'] },
    end: { type: String, required: true, minlength: [4, 'End point should be at least 4 characters long'] },
    date: { type: String, required: true },
    time: { type: String, required: true },
    image: { type: String, required: true, match: [/^https?:\/\/(.+)/, 'Invalid URL'] },
    brand: { type: String, required: true[4, 'Car Brand should be at least 4 characters long'] },
    seats: { type: Number, required: true, min: 0, max: 4 },
    price: { type: Number, required: true, min: 1, max: 50 },
    description: { type: String, required: true },
    creator: { type: Types.ObjectId, ref: 'User', required: true },
    buddies: { type: [Types.ObjectId], ref: 'User', default: [] }

});

const Trip = model('Trip', tripSchema);
module.exports = Trip;