const router = require('express').Router();
const { Item } = require('../../models');
//const isAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const itemData = await Item.findAll();

        const items = itemData.map((item) =>
        item.get({ plain: true })
    );

        res.status(200).json(items);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;