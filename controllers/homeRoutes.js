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
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



//Renders login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});


router.get('/', isAuth, async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      });
  
      const users = userData.map((project) => project.get({ plain: true }));
  
      res.render('homepage', {
        users,
        // Pass the logged in flag to the template
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    // If a session exists, 
    // redirect the request to the homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

    

module.exports = router;