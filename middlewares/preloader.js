const { getById, getByIdPopulated } = require('../services/tripService');

function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;
        if (populate) {
            res.locals.trip = await getByIdPopulated(id);
        } else {
            res.locals.trip = await getById(id);
        }

        next();
    };
}

module.exports = preload;