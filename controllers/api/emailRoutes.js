const router = require('express').Router();
const mailTransporter = require('../../config/nodemailer');
const { User, PackList, Item } = require('../../models');
const isAuth = require('../../utils/auth');

router.post('/', isAuth, async (req, res) => {
    try {

        const { shareEmailAdd, emailMsg, emailListId, emailListName} = req.body;
        //console.log(req.session.userId);

        const userData = await User.findByPk(req.session.userId,{
            attributes: {exclude: ['password']},
        });
        const userName = userData.get({ plain: true }).name;

        const packListData = await PackList.findByPk(emailListId, {
            include: [{ model: Item, as: 'listOfItems' }],
        });
        const packList = packListData.get({ plain: true });
        //console.log(packList.listOfItems);
        
        
        const items = packList.listOfItems.map((item) => item.name).join(", ");
        //console.log(items);

        let emailTemplate = `${emailMsg}
        
Here's a list of items that I plan to bring for ${emailListName} trip: 
${items}
        
Warm regards`;
      
        let mailDetails = {
            from: 'r2zero709@gmail.com',
            to: shareEmailAdd,
            subject: `${userName}'s packing list for ${emailListName} trip`,
            text: emailTemplate,
        };
        //console.log(mailDetails);

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
                res.status(500).json(err);
            } else {
                console.log(data);
                res.status(200).json('Email sent successfully');
            }
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
