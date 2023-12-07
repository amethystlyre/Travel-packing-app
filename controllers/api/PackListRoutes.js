const router = require('express').Router();
const { PackList, Baggage } = require('../../models');
const isAuth = require('../../utils/auth');

router.get('/:id', isAuth, async (req, res) => {
    try {
        const packListData = await PackList.findByPk(req.params.id, {
            include: [{ model: Baggage, as: 'luggages' }],
        });
        const packList = packListData.get({ plain: true });
        console.log(packList);

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


router.put('/update/:id', async (req, res) => {
    try {
        //await req.session.save();

        const updatedData = {
            name: req.body.name,
            destinations: req.body.destination,
            transports: req.body.transport,
            climates: req.body.climate,
            date_from: req.body.date_from,
            date_to: req.body.date_to,
        };

        const modelInstance = await PackList.findByPk(req.params.id);
        await modelInstance.update(updatedData);

        res.status(200).json(modelInstance);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
