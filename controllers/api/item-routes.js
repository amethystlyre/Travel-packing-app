const router = require('express').Router();
const { Item } = require('../../models');
const app = express()

app.get('/item', async (req, res) => {
    const items = await Item.findAll({ where: { PackListId: req.params.PackListId } });
    res.json(items);
   });
   
   app.post('/item', async (req, res) => {
    const { name,} = req.body;
    const item = await Item.create({ name, PackListId: req.params.PackListId });
    res.json(item);
   });