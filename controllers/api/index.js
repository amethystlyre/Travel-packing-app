const router = require('express').Router();

//routes for backend data

const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');

router.use('/users', userRoutes);
router.use('/items', itemRoutes);

module.exports = router; 