const router = require('express').Router();
const { Item, User , PackList , Category ,Baggage } = require('../models');
const isAuth = require('../utils/auth');


//routes for frontend data

router.get('/', async (req, res) => {
    try {
        const itemData = await Item.findAll({
            include: [
                {
                    model: Category,
                },
                {
                    model: Baggage,
                },
            ],
        });

        const items = itemData.map((item) => item.get({ plain: true }));

        res.render('homepage', {
            items:items,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



//Renders login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});


router.get('/dashboard', isAuth, async (req, res) => {
    try {
      const packListData = await PackList.findAll({
        where: { user_id : req.session.user_id },
      });
  
      const packLists = packListData.map((packList) => packList.get({ plain: true }));
  
      res.render('dashboard', {
        packLists,
        // Pass the logged in flag to the template
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

    

module.exports = router;