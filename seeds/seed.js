const sequelize = require('../config/connection');
const { Op } = require('sequelize');
const { User, Baggage, Category, Item, PackList } = require('../models');

const userData = require('./userData.json');
const itemData = require('./itemData.json');
const categoryData = require('./categoryData.json');
const baggageData = require('./baggageData.json');
const packListData = require('./packListData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Category.bulkCreate(categoryData);

    await Baggage.bulkCreate(baggageData);

    let items = await Item.bulkCreate(itemData);
    console.log(items);

    const packLists = await PackList.bulkCreate(packListData);

    for (let i = 1; i <= packLists.length; i++) {
        const list = await PackList.findByPk(i);
        await list.addListOfItems(items);

        const bags = await Baggage.findAll({
            where: {
                [Op.or]: [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 5 }],
            },
        });
        await list.addLuggages(bags);
    }

    process.exit(0);
};

seedDatabase();
