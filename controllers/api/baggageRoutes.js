const router = require('express').Router();
const { Baggage, Item } = require('../../models');
const isAuth = require('../../utils/auth');

router.get('/', isAuth, async (req, res) => {
    try {
        const baggageData = await Baggage.findAll();

        const baggages = baggageData.map((baggage) => baggage.get({ plain: true }));

        res.status(200).json(baggages);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//create new Baggage into DB
router.post('/', isAuth, async (req, res) => {
    console.log(req.query);
    console.log(req.body);
    try {
        const { name } = req.body;
        let baggage = await Baggage.create({ name });

        res.status(200).json(baggage);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
