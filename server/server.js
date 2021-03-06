const express = require('express');
const exphb = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('../config/db');
const models = require('../models/index[LEGACY]');

//authenticate and connect to db
db
  .authenticate()
  .then(() => {
    console.log('Success! Database connected');
    db.sync({ force: true }).then(() => {
      console.log('Data base connected! Beep boop beep boop!')
    })
  })
  .catch(err => {
    console.error('Unable to connect to database:', err);
  });

const app = express();

app.get('/', (req,res) => {
  res.send({ express: 'CONNECTED TO REACT'});
})

//connect to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Success! Connected to port ${PORT}`)
})

//routes for our User
app.use('/api/user', require('../routes/user'));

//routes for our Address
app.use('/api/address', require('../routes/address'));

//routes for our City
app.use('/api/city', require('../routes/city'));

//routes for our State
app.use('/api/state', require('../routes/state'));

//routes for our Country
app.use('/api/country', require('../routes/country'));

//routes for our dining_category
app.use('/api/dining_category', require('../routes/dining_category'));

//routes for our food_category
app.use('/api/food_category', require('../routes/food_category'));

//routes for our Order
app.use('/api/order', require('../routes/order'));

//routes for our Dish
app.use('/api/Dish', require('../routes/dish'));

//routes for our Restaurant
app.use('/api/restaurant', require('../routes/restaurant'));

//routes for our state
app.use('/api/state', require('../routes/state'));

//routes for our order_dish
app.use('/api/order_dish', require('../routes/order_dish'));

//routes for our user_restaurant
app.use('/api/user_restaurant', require('../routes/user_restaurant'));

//routes for our user_order
app.use('/api/user_order', require('../routes/user_order'));



