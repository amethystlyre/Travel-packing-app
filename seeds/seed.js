const sequelize = require('../config/connection');
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

    for (const category of categoryData) {
        await Category.create({
            ...category,
        });
    }

    for (const baggage of baggageData) {
        await Baggage.create({
            ...baggage,
        });
    }

    for (const item of itemData) {
        await Item.create({
            ...item,
        });
    }

    for (const packList of packListData) {
        await PackList.create({
            ...packList,
        });
    }

    for (let i = 0; i < 10; i++){
        
    }


    process.exit(0);
};

seedDatabase();
