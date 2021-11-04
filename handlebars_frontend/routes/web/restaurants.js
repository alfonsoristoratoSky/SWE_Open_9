const express = require('express');
const Router = express.Router();
const fetch = require('node-fetch');
const config = require('../../config');
const restaurantsList = `${config.url.restaurants}`; // http://localhost:3002/api/restaurants
const menusList = `${config.url.menus}`;
const menuItemsList = `${config.url.menuItems}`;

const i = [1,2]
i.filter(el => el.id == null)

  //READ ALL
  Router.get('/', async (req, res, next) => {
    try {
      const responseRest = await fetch(restaurantsList);
      const responseMenus = await fetch(menusList);
      const responseMenuItems = await fetch(menuItemsList);

      const restaurants = await responseRest.json();
      const allMenus = await responseMenus.json();
      const menus = allMenus.filter(el => el.RestaurantId === null)
      const allMenuItems = await responseMenuItems.json();
      const menuItems = allMenuItems.filter(el => el.MenuId === null)
      res.render('restaurants', { restaurants, menus, menuItems });
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
        const responseRest = await fetch(restaurantsList+`/${req.params.id}`);
        const responseMenus = await fetch(restaurantsList+`/${req.params.id}/menus`);        
        const responseMenuItems = await fetch(menuItemsList);
        

        const restaurant = await responseRest.json();
        const menus = await responseMenus.json();
        const allMenuItems = await responseMenuItems.json();
        const menuItems = allMenuItems.filter(el => menus.some(menEl => menEl.id === el.MenuId))
        
        res.render('singleRestaurant', {restaurant, menus, menuItems});
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