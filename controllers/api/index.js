const router = require('express').Router();

//routes for backend data

const userRouter = require('./user-routes');

const app = express();

app.use('/user-routes', userRouter);


module.exports = router; 