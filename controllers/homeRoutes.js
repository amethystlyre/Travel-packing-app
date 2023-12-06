const router = require('express').Router();
const { Item, User, PackList, Category, Baggage } = require('../models');
const isAuth = require('../utils/auth');

//routes for frontend data

router.get('/', async (req, res) => {
    try {

        res.render('homepage', {
            user_id: req.session.userId,
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
            where: { user_id: req.session.userId },
        });

        const packLists = packListData.map((packList) =>
            packList.get({ plain: true })
        );



        console.log(packLists);

        res.render('dashboard', {
            packLists,
            // Pass the logged in flag to the template
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard/:id', isAuth, async (req, res) => {
    console.log(req.query);
    try {
        let sortProperty = 'Item';
        let sortOrder = 'ASC';
        if (req.query&&req.query.sort){
            let sortBy = req.query.sort.split('-') ;
            console.log(sortBy);
            sortProperty = sortBy[0] ;
            sortOrder = sortBy[1] ;
        }

        const packListData = await PackList.findByPk(req.params.id);
        const packList = packListData.get({ plain: true });

        const itemListData = await Item.findAll({
            where: { '$packLists.id$': req.params.id },
            include: [
                { model: PackList },
                { model: Category },
                { model: Baggage },
            ],
            order: [[Category, 'name', sortOrder ]],
        });

        const itemList = itemListData.map((item) => item.get({ plain: true }));

        const allItemData = await Item.findAll();
        const suggestedItemsList = allItemData.map((item) => item.get({ plain: true }));

    
        //const items = itemData.map((item) => item.get({ plain: true }));
    

        console.log(itemList);

        res.render('addItemsList', {
            itemList,
            packList,
            suggestedItemsList,
            // Pass the logged in flag to the template
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new', isAuth, async (req, res) => {
    try {
    
            res.render('createNewList', {
                user_id: req.session.userId,
                loggedIn: req.session.loggedIn,
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signup', async (req, res) => {
    try {
    
            res.render('signup', {

            });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
