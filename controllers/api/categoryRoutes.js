const router = require('express').Router();
const { Category, Item } = require('../../models');
const isAuth = require('../../utils/auth');

router.get('/', isAuth, async (req, res) => {
    try {
        const categoryData = await Category.findAll();

        const category = categoryData.map((category) => category.get({ plain: true }));

        res.status(200).json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//create new Category into DB
router.post('/', isAuth, async (req, res) => {

    try {
        
        const { name } = req.body;
        let category = await Category.create({ name });

        res.status(200).json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;