const router = require('express').Router();
const { Item,PackList } = require('../../models');
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

//create new item into DB
router.post('/:plid',isAuth, async (req, res) => {

    try{
    const { name } = req.body;
    const item = await Item.create({ name });
    const list = await PackList.findByPk(req.params.plid);
    await list.addListOfItems(item);

    


    res.status(200).json(item);
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }

});




module.exports = router;
