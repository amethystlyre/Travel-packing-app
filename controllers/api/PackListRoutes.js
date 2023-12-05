const router = require('express').Router();
const { PackList } = require('../../models');
const isAuth = require('../../utils/auth');

router.get ('/', isAuth, async (req, res) => {
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

router.post ('/', isAuth, async (req, res) => {
    try {
        const newPackList = await PackList.create(
         {
            ...req.body,
            user_id: req.session.userId,
        }
        );
      if (!newPackList) {
        return res.status(404).send({ message: 'Pack List not created.' });
      }
      res.status(200).send(newPackList);
   } catch (error) {
      res.status(500).send({ message: 'Error creating your Pack List.' });
   }
}); 

module.exports = router;