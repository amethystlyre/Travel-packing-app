const router = require('express').Router();
const { PackList, Baggage } = require('../../models');
const isAuth = require('../../utils/auth');

router.get('/', isAuth, async (req, res) => {
    try {
        const packList = await PackList.findByPk(req.params.id);
        if (!packList) {
            return res.status(404).send({ message: 'Pack List not found.' });
        }
        res.status(200).send(packList);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving your Pack List.' });
    }
});

router.post('/', isAuth, async (req, res) => {
    try {
        const {
            name,
            date_from,
            date_to,
            destinations,
            transports,
            climates,
            luggages,
        } = req.body;

        const newPackList = await PackList.create({
            name: name,
            date_from: date_from,
            date_to: date_to,
            destinations: destinations,
            transports: transports,
            climates: climates,
            user_id: req.session.userId,
        });
        let bags = [];
        //console.log(luggages);
        for (let bag of luggages) {
            bags.push(
                await Baggage.findOne({
                    where: { name: bag },
                })
            );
        }
        //console.log(bags);

        await newPackList.addLuggages(bags);

        if (!newPackList) {
            return res.status(404).send({ message: 'Pack List not created.' });
        }
        console.log(newPackList);
        res.status(200).send(newPackList);
    } catch (error) {
        res.status(500).send({ message: 'Error creating your Pack List.' });
    }
});

module.exports = router;
