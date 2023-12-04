const User = require('./User');
const PackList = require('./PackList');
const Item = require('./Item');
const Category = require('./Category');
const Baggage = require('./Baggage');

// User and Packlist : one to many
User.hasMany(PackList, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

PackList.belongsTo(User, {
    foreignKey: 'user_id',
});

// Packlist and Item: many to many
PackList.belongsToMany(Item, {
    as: 'listOfItems',
    through: 'ItemList',
    unique: false,
});

Item.belongsToMany(PackList, {
    //as: 'packedIn',
    through: 'ItemList',
    unique: false,
});

// Packlist and Bags: many to many
PackList.belongsToMany(Baggage, {
    as: 'luggages',
    through: 'BagList',
    unique: false,
});

Baggage.belongsToMany(PackList, {
    as: 'trips',
    through: 'BagList',
    unique: false,
});

// Category and Item: one to many
Category.hasMany(Item, {
    foreignKey: 'category_id',
    onDelete: 'SET NULL',
});

Item.belongsTo(Category, {
    foreignKey: 'category_id',
});

// Bag and Item: one to many
Baggage.hasMany(Item, {
    foreignKey: 'baggage_id',
    onDelete: 'SET NULL',
});

Item.belongsTo(Baggage, {
    foreignKey: 'baggage_id',
});

module.exports = { User, PackList, Item, Category, Baggage };
