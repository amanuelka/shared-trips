const { hasUser, isOwner } = require('../middlewares/guards');
const { parseError } = require('../middlewares/parsers');
const preload = require('../middlewares/preloader');
const { create, update } = require('../services/tripService');

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
    
    if (req.user) {
        res.locals.trip.isLogged = true;
        res.locals.trip.isOwner = req.user._id == res.locals.trip.creator._id;
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

module.exports = tripController;