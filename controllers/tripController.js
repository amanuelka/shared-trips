const { hasUser, isOwner } = require('../middlewares/guards');
const { parseError } = require('../middlewares/parsers');
const preload = require('../middlewares/preloader');
const { create, update, deleteById, joinTrip } = require('../services/tripService');

const tripController = require('express').Router();

tripController.get('/create', hasUser(), (req, res) => {
    res.render('create');
});

tripController.post('/create', hasUser(), async (req, res) => {
    const data = { ...req.body, creator: req.user._id };
    try {
        if (Object.values(data).some(v => !v)) {
            throw new Error('All fields are required');
        }
        await create(data);
        res.redirect('/trips');
    } catch (error) {
        res.render('create', { errors: parseError(error), ...data });
    }
});

tripController.get('/:id', preload(true), async (req, res) => {
    const trip = res.locals.trip;
    trip.remainingSeats = trip.seats - trip.buddies.length;
    trip.buddiesList = trip.buddies.map(b => b.email).join(', ');
    if (req.user) {
        trip.isLogged = true;
        trip.isOwner = req.user._id == trip.creator._id;
        trip.isJoined = trip.buddies.some(b => b._id == req.user._id);
    }
    res.render('details');
});

tripController.get('/:id/edit', hasUser(), preload(), isOwner(), (req, res) => {
    const trip = res.locals.trip;
    res.render('edit', { ...trip });
});

tripController.post('/:id/edit', hasUser(), preload(), isOwner(), async (req, res) => {
    const id = req.params.id;
    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        image: req.body.image,
        brand: req.body.brand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description
    };

    try {
        await update(id, trip);
        res.redirect(`/trip/${id}`);
    } catch (error) {
        trip._id = id;
        res.render('edit', { errors: parseError(error), ...trip });
    }
});

tripController.get('/:id/delete', hasUser(), preload(), isOwner(), async (req, res) => {
    await deleteById(req.params.id);
    res.redirect('/trips');
});

tripController.get('/:id/join', hasUser(), async (req, res) => {
    await joinTrip(req.params.id, req.user._id);
    res.redirect(`/trip/${req.params.id}`);
});

module.exports = tripController;