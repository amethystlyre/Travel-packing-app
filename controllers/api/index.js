const router = require('express').Router();

//routes for backend data

const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');
const packListRoutes = require('./packListRoutes');
const baggageRoutes = require('./baggageRoutes');
const categoryRoutes = require('./categoryRoutes');
const emailRoutes = require('./emailRoutes');

router.use('/users', userRoutes);
router.use('/items', itemRoutes);
router.use('/packLists', packListRoutes);
router.use('/baggages', baggageRoutes);
router.use('/categories', categoryRoutes);
router.use('/email', emailRoutes);

module.exports = router;
