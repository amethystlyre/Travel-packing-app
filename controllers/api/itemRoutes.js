const router = require('express').Router();
const { Item, PackList } = require('../../models');
const isAuth = require('../../utils/auth');

router.get('/', isAuth, async (req, res) => {
    try {
        const itemData = await Item.findAll();

        const items = itemData.map((item) => item.get({ plain: true }));

        res.status(200).json(items);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//create new item into DB and add item to packlist
router.post('/:plid', isAuth, async (req, res) => {
    console.log(req.query);
    console.log(req.body);
    try {
        let item;
        if (req.body && req.body.name) {
            const { name } = req.body;
            item = await Item.create({ name });
        } else if (req.query && req.query.itemId) {
            item = await Item.findByPk(req.query.itemId);
        }

        const list = await PackList.findByPk(req.params.plid);
        await list.addListOfItems(item);

        res.status(200).json(item);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
