const { hasUser } = require('../middlewares/guards');
const { getAll, getOwn } = require('../services/tripService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home');
});

homeController.get('/trips', async (req, res) => {
    const trips = await getAll();
    res.render('trips', { trips });
});

homeController.get('/profile', hasUser(), async (req, res) => {
    const trips = await getOwn(req.user._id);
    res.render('profile', { trips });
});


module.exports = homeController;