const express = require('express');
const router = express.Router();
const serialize = require('express-serializer');
const db = require('../config/db');

const Dish = require('../models/dish');

//serialize dish
function serializeDish(req, dish) {
  const { id, dish_name, createdAt, updatedAt} = dish;

  return {
    id, dish_name, createdAt, updatedAt
  }
}

//find all dish
router.get('/', (req, res) => {
  Dish.findAll()
    .then(dishes => {
      serialize(req, dishes, serializeDish).then(json => {
        res.status(200).send(json);
      })
    })
    .catch(err => {
      res.status(400).send('Unable to find dishes', err);
    })
})

//find one dish
router.get('/search', (req, res) => {
  Dish.findOne({
    where: {
      dish_name: req.query.dish_name
    }
  })
  .then(dishes => {
    serialize(req, dishes, serializeDish).then(json => {
      res.status(200).send(json);
    })
  })
  .catch(err => {
    res.status(400).send('Unable to find dish');
    console.log(err)
  })
})

//create a dish
router.post('/', (req, res) => {
  Dish.findOrCreate({
    where: {
      dish_name: req.query.dish_name,
    }
  })
  .spread((dish, created) => {
    console.log(dish.get({
      plain: true
    }))
    if (created) {
      res.json('dish created');
    } else {
      res.json('dish already exist');
    }
  })
  .catch(err => {
    res.status(400).send('Unable to create dish')
    console.error(err);
  })
})

//update a dish
router.patch('/', (req, res) => {
  Dish.findOne({
    where: {
      dish_name: req.query.old_name
    }
  })
  .then(dish => {
    dish.update({
      dish_name: req.query.new_name
    })
  })
  .then(dishes => {
    serialize(req, dishes, serializeDish).then(json => {
      res.status(200).send(json);
    })
  })
  .catch(err => {
    res.status(400).send('Unable to update dish');
    console.log(err);
  })
})

//delete a dish
router.delete('/', (req, res) => {
  Dish.findOne({
    where: {
      dish_name: req.query.dish_name
    }
  })
  .then(dish => {
    if (dish) {
      dish.destroy().then(dish => {
        res.json('Dish deleted successfully!')
      })
    } else {
      res.json('Unable to delete dish, dish does not exist')
    }
  })
  .catch(err => {
    res.status(400).send('Unable to delete dish');
    console.log(err)
  })
})

module.exports = router;