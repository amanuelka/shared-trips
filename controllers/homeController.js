const { getAll } = require('../services/tripService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home');
});

homeController.get('/trips', async (req, res) => {
    const trips = await getAll();
    res.render('trips', { trips });
});

homeController.get('/profile', (req, res) => {
    res.render('profile');
});


module.exports = homeController;