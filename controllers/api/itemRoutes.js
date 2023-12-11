const router = require('express').Router();
const { Item, PackList, Category, Baggage } = require('../../models');
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
        let cat=[];
        let bag=[];

        if (req.body.category) {
            const { category } = req.body;
            catData = await Category.findAll({
                where: { name: category },
            });
            cat = catData.map((item) => item.get({ plain: true }));
        }
        //console.log(cat[0].id);

        if (req.body.baggage) {
            const { baggage } = req.body;
            bagData = await Baggage.findAll({
                where: { name: baggage },
            });
            bag = bagData.map((item) => item.get({ plain: true }));
        }
        //console.log(bag[0].id);

        if (req.body && req.body.name) {
            const { name } = req.body;

            if (cat[0] && cat[0].id && bag[0] && bag[0].id) {
                item = await Item.create({
                    name: name,
                    category_id: cat[0].id,
                    baggage_id: bag[0].id,
                });
            } else if (cat[0] && cat[0].id) {
                item = await Item.create({
                    name: name,
                    category_id: cat[0].id,
                });
            } else if (bag[0] && bag[0].id) {
                item = await Item.create({
                    name: name,
                    baggage_id: bag[0].id,
                });
            } else {
                item = await Item.create({
                    name: name,
                });
            }
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

router.put('/:plid', isAuth, async (req, res) => {
    console.log(req.query);
    console.log(req.body);
    try {
        const list = await PackList.findByPk(req.params.plid, {
            include: [{ model: Item, as: 'listOfItems' }],
        });
        //const packList = packListData.get({ plain: true });
        //console.log(packList);
        //console.log( req.query.itemId);

        if (req.query && req.query.itemId) {
            let item = await Item.findByPk(req.query.itemId);
            console.log(item);
            if (item) {
                await list.removeListOfItem(item);
            }

            res.status(200).json('item removed');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
module.exports = router;
