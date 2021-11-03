const express = require('express');
const Router = express.Router();
const fetch = require('node-fetch');
const config = require('../../config');
const restaurantsList = `${config.url.restaurants}`; // http://localhost:3002/api/restaurants


  //READ ALL
  Router.get('/', async (req, res, next) => {
    try {
      const response = await fetch(restaurantsList);
      const restaurants = await response.json();
      res.render('restaurants', { restaurants });
    } catch (error) {
      return next(error);
    }
  });

  //READ ONE or get into the CREATE view
  Router.get('/:id', async (req, res, next) => {
    try {
      if (req.params.id === "create"){
        res.render('createRestaurant')
      }


      else{
        const response = await fetch(restaurantsList+`/${req.params.id}`)
        const restaurants = await response.json();
        res.render('restaurants', {restaurants});
      }
      
    } catch (error) {
      return next(error);
    }
  });

  //EDIT ONE, see view
  Router.get('/:id/edit', async (req, res, next) => {
    try {
      const response = await fetch(restaurantsList+`/${req.params.id}`)
      const restaurant = await response.json();
      
      res.render('editRestaurant', {restaurant})
    } catch (error) {
      return next(error);
    }
  });
  // EDIT ONE
  Router.put('/:id/edit', async (req, res, next) => {
    try {
      await fetch(restaurantsList+`/${req.params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body), // data comes from a form
      });
      res.redirect('/restaurants');
    } catch (error) {
      return next(error);
    }
  });
  // DELETE ONE, see view
  Router.get('/:id/delete', async (req, res, next) => {
    try {
      const response = await fetch(restaurantsList+`/${req.params.id}`)
      const restaurant = await response.json();
      
      res.render('deleteRestaurant', {restaurant})
    } catch (error) {
      return next(error);
    }
  });
  //DELETE ONE
  Router.delete('/:id/delete', async (req, res, next) => {
    try {
      await fetch(restaurantsList+`/${req.params.id}`, {
        method: 'DELETE'
      });      
      res.redirect('/restaurants');
    } catch (error) {
      return next(error);
    }
  });
  //CREATE ONE
  Router.post('/create', async (req, res, next) => {
    try {
      await fetch(restaurantsList, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body), // data comes from a form
      });

      res.redirect('/restaurants');
    } catch (error) {
      return next(error);
    }
  });  


module.exports = Router;