const { Schema, model, Types } = require('mongoose');

const tripSchema = new Schema({
    start: { type: String, required: true },
    end: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    creator: { type: Types.ObjectId, ref: 'User', required: true },
    buddies: { type: [Types.ObjectId], ref: 'User', default: [] }

});

const Trip = model('Trip', tripSchema);
module.exports = Trip;