const router = require('express').Router();
const { Baggage, Category, Item, PackList, User } = require('../models')
const isAuth = require('../utils/auth');


//routes for frontend data
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

  app.get('/packlist', async (req, res) => {
    const packlist = await PackList.findAll();
    res.json(packlist);
   });
   
   app.post('/packlist', async (req, res) => {
    const { name } = req.body;
    const newPacklist = await PackList.create({ name });
    res.json(newPacklist);
   });
   
   app.get('/packlist/items', async (req, res) => {
    const items = await Item.findAll({ where: { PackListId: req.params.PackListId } });
    res.json(items);
   });
   
   app.post('/packlist/items', async (req, res) => {
    const { name,} = req.body;
    const item = await Item.create({ name, PackListId: req.params.PackListId });
    res.json(item);
   });
  


module.exports = router;