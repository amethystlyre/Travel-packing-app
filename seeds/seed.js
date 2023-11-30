const sequelize = require('../config/connection');
const { User, Baggage, Category, Item, PackList } = require('../models');

const userData = require('./userData.json');
const itemData = require('./itemData.json');
const categoryData = require('./categoryData.json');
const baggageData = require('./baggageData.json');
const packListData = require('./packListData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const categories = await Category.bulkCreate(categoryData);

    const bags = await Baggage.bulkCreate(baggageData);

    const items = await Item.bulkCreate(itemData);

    const packLists = await PackList.bulkCreate(packListData);

    for (let i = 0; i < 10; i++) {
        const { id: randomItemId } =
            items[Math.floor(Math.random() * items.length)];

        const { id: randomPackListId } =
            packLists[Math.floor(Math.random() * packLists.length)];
        

        // await ItemList.create({
        //     item_id: randomItemId,
        //     pack_list_id: randomPackListId,
        // }).catch((err) => {
        //     // If there's an error, such as the same random pairing of `traveller.id` and `location.id` occurring and we get a constraint error, don't quit the Node process
        //     console.log(err);
        // });
    }

    process.exit(0);
};

seedDatabase();
