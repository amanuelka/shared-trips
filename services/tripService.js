const Trip = require('../models/Trip');

async function create(trip) {
    return Trip.create(trip);
}

async function getAll() {
    return Trip.find({}).lean();
}

async function getById(id) {
    return Trip.findById(id).lean();
}

async function getByIdPopulated(id) {
    return Trip.findById(id).populate('creator').populate('buddies').lean();
}

async function update(id, trip) {
    const existing = await Trip.findById(id);
    existing.start = trip.start;
    existing.end = trip.end;
    existing.date = trip.date;
    existing.time = trip.time;
    existing.image = trip.image;
    existing.brand = trip.brand;
    existing.seats = trip.seats;
    existing.price = trip.price;
    existing.description = trip.description;
    await existing.save();
}

module.exports = { create, getById, getByIdPopulated, getAll, update };