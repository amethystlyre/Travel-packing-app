const router = require('express').Router();
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api')

module.exports = router;
