const router = require('express').Router();
const { PackList } = require('../../models');

router.get ('/:PacklistId', async (req, res) => {
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

router.post ('/', async (req, res) => {
    try {
        const newPackList = await PackList.create();
      if (!newPackList) {
        return res.status(404).send({ message: 'Pack List not created.' });
      }
      res.status(200).send(newPackList);
   } catch (error) {
      res.status(500).send({ message: 'Error creating your Pack List.' });
   }
}); 