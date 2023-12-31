const router = require('express').Router();
const { PackList, Baggage } = require('../../models');
const isAuth = require('../../utils/auth');

router.get('/:id', isAuth, async (req, res) => {
    try {
        const packListData = await PackList.findByPk(req.params.id, {
            include: [{ model: Baggage, as: 'luggages' }],
        });
        const packList = packListData.get({ plain: true });
        //console.log(packList);

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
        //console.log(newPackList);
        res.status(200).send(newPackList);
    } catch (error) {
        res.status(500).send({ message: 'Error creating your Pack List.' });
    }
});



router.put('/:id', isAuth, async (req, res) => {
    try {

        //console.log(req.body);
        //console.log(req.params.id);
        const {
            name,
            date_from,
            date_to,
            destinations,
            transports,
            climates,
            luggages,
        } = req.body;

        const updatedPackList = await PackList.update({
            name: name,
            date_from: date_from,
            date_to: date_to,
            destinations: destinations,
            transports: transports,
            climates: climates,
        }, {
            where: {
              id:req.params.id
            }
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
        //console.log(updatedPackList);

        const list = await PackList.findByPk(req.params.id);
        //console.log(list);

        await list.addLuggages(bags);

        if (!updatedPackList) {
            return res.status(404).send({ message: 'Pack List not updated.' });
        }
        // console.log(updatedPackList);
        res.status(200).send(updatedPackList);
    } catch (error) {
        res.status(500).send({ message: 'Error creating your Pack List.' });
    }
});

router.delete('/:id', isAuth, async (req, res) => {
    try {

        //console.log(req.body);
        //console.log(req.params.id);

        const delPackList = await PackList.destroy({
            where: {
              id:req.params.id
            }
          });

        console.log(delPackList);

        if (!delPackList) {
            res.status(404).send({ message: 'No post with this id!' });
        } else {
            res.status(200).send({ message: `${delPackList} item deleted`});
        }

    } catch (error) {
        res.status(500).send({ message: 'Error deleting Pack List.' });
    }
});



module.exports = router;
