const { getById } = require('../services/tripService');

function preload() {
    return async function (req, res, next) {
        res.locals.trip = await getById(req.params.id);
        next();
    };
}

module.exports = preload;