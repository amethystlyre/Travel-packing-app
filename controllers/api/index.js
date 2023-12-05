const router = require('express').Router();

//routes for backend data

const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');
const packListRoutes = require('./PackListRoutes');

router.use('/users', userRoutes);
router.use('/items', itemRoutes);
router.use('/packLists', packListRoutes);

module.exports = router;
