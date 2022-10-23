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

async function getOwn(userId) {
    return Trip.find({ creator: userId }).populate('creator', 'gender').lean();
}

async function update(id, trip) {
    const existing = await Trip.findById(id);
    Object.assign(existing, trip);
    await existing.save();
}

async function deleteById(id) {
    return Trip.findByIdAndDelete(id);
}

async function join(tripId, userId) {
    const trip = await Trip.findById(tripId);
    trip.buddies.push(userId);
    await trip.save();
}

module.exports = { create, getById, getByIdPopulated, getAll, getOwn, update, deleteById, join };