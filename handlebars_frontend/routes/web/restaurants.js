const express = require('express');
const Router = express.Router();
const fetch = require('node-fetch');
const config = require('../../config');
const restaurantsList = `${config.url.restaurants}`; // http://localhost:3002/api/restaurants
const menusList = `${config.url.menus}`;
const menuItemsList = `${config.url.menuItems}`;

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
    const menuItems = allMenuItems.filter(el => 
      menus.some(menEl => menEl.id === el.MenuId)
      || el.MenuId === null)


    res.render('restaurants', { restaurants, menus, menuItems });
  } catch (error) {
    return next(error);
  }
});

//READ ONE or get into the generic CREATE view
Router.get('/:id', async (req, res, next) => {
  try {
    if (req.params.id === "create") {
      res.render('createRestaurant')
    }
    else if (req.params.id === "createMenu") {
      const responseRest = await fetch(restaurantsList);
      const restaurants = await responseRest.json();
      res.render('createMenu', { restaurants })
    }
    else if (req.params.id === "createMenuItem") {
      const responseMenu = await fetch(menusList);
      const menus = await responseMenu.json();
      res.render('createMenuItem', { menus })
    }


    else {
      const responseRest = await fetch(restaurantsList + `/${req.params.id}`);
      const responseMenus = await fetch(restaurantsList + `/${req.params.id}/menus`);
      const responseMenuItems = await fetch(menuItemsList);


      const restaurant = await responseRest.json();
      const menus = await responseMenus.json();
      const allMenuItems = await responseMenuItems.json();
      const menuItems = allMenuItems.filter(el => menus.some(menEl => menEl.id === el.MenuId))

      res.render('singleRestaurant', { restaurant, menus, menuItems });
    }

  } catch (error) {
    return next(error);
  }
});
//GET INTO the CREATE MENU view from within restaurant
Router.get('/:id/createMenu', async (req, res, next) => {
  try {
    const responseRest = await fetch(restaurantsList + `/${req.params.id}`);
    const restaurants = await responseRest.json();
    const paramsId = req.params.id;
    res.render('createMenu', { restaurants, paramsId })
  } catch (error) {
    return next(error);
  }
});

//GET INTO the CREATE MENU ITEM view from within restaurant
Router.get('/:id/createMenuItem', async (req, res, next) => {
  try {
    const responseMenus = await fetch(restaurantsList + `/${req.params.id}/menus`)
    const menus = await responseMenus.json();

    const responseRest = await fetch(restaurantsList + `/${req.params.id}`);
    const restaurants = await responseRest.json();

    const paramsId = req.params.id;
    res.render('createMenuItem', { restaurants, menus, paramsId })
  } catch (error) {
    return next(error);
  }
});

//EDIT ONE RESTAURANT, see view
Router.get('/:id/edit', async (req, res, next) => {
  try {
    const response = await fetch(restaurantsList + `/${req.params.id}`)
    const restaurant = await response.json();

    res.render('editRestaurant', { restaurant })
  } catch (error) {
    return next(error);
  }
});
// EDIT ONE RESTAURANT
Router.put('/:id/edit', async (req, res, next) => {
  try {
    await fetch(restaurantsList + `/${req.params.id}`, {
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

//EDIT ONE MENU, see view
Router.get('/editMenu/:id', async (req, res, next) => {
  try {
    const responseMenu = await fetch(menusList + `/${req.params.id}`)
    const menu = await responseMenu.json();
    const responseRest = await fetch(restaurantsList);
    const restaurants = await responseRest.json();

    res.render('editMenu', { menu, restaurants })
  } catch (error) {
    return next(error);
  }
});
// EDIT ONE MENU
Router.put('/editMenu/:id', async (req, res, next) => {
  try {
    if (req.body.RestaurantId === "unassigned") {
      req.body = {
        title: req.body.title
      }
    }
    await fetch(menusList + `/${req.params.id}`, {
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
//EDIT ONE MENU ITEM, see view
Router.get('/editMenuItem/:id', async (req, res, next) => {
  try {
    const responseMenuItem = await fetch(menuItemsList + `/${req.params.id}`)
    const menuItem = await responseMenuItem.json();
    const responseMenus = await fetch(menusList);
    const menus = await responseMenus.json();

    res.render('editMenuItem', { menuItem, menus })
  } catch (error) {
    return next(error);
  }
});
// EDIT ONE MENU ITEM
Router.put('/editMenuItem/:id', async (req, res, next) => {
  try {
    if (req.body.MenuId === "unassigned") {
      req.body = {
        name: req.body.name,
        price: req.body.price
      }
    }
    await fetch(menuItemsList + `/${req.params.id}`, {
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
// DELETE ONE RESTAURANT, see view
Router.get('/:id/delete', async (req, res, next) => {
  try {
    const response = await fetch(restaurantsList + `/${req.params.id}`)
    const restaurant = await response.json();

    res.render('deleteRestaurant', { restaurant })
  } catch (error) {
    return next(error);
  }
});
//DELETE ONE RESTAURANT
Router.delete('/:id/delete', async (req, res, next) => {
  try {
    await fetch(restaurantsList + `/${req.params.id}`, {
      method: 'DELETE'
    });
    res.redirect('/restaurants');
  } catch (error) {
    return next(error);
  }
});
// DELETE ONE MENU, see view
Router.get('/deleteMenu/:id', async (req, res, next) => {
  try {
    const response = await fetch(menusList + `/${req.params.id}`)
    const menu = await response.json();

    res.render('deleteMenu', { menu })
  } catch (error) {
    return next(error);
  }
});
//DELETE ONE MENU
Router.delete('/deleteMenu/:id', async (req, res, next) => {
  try {
    await fetch(menusList + `/${req.params.id}`, {
      method: 'DELETE'
    });
    res.redirect('/restaurants');
  } catch (error) {
    return next(error);
  }
});
// DELETE ONE MENU ITEM, see view
Router.get('/deleteMenuItem/:id', async (req, res, next) => {
  try {
    const response = await fetch(menuItemsList + `/${req.params.id}`)
    const menuItem = await response.json();

    res.render('deleteMenuItem', { menuItem })
  } catch (error) {
    return next(error);
  }
});
//DELETE ONE MENU ITEM
Router.delete('/deleteMenuItem/:id', async (req, res, next) => {
  try {
    await fetch(menuItemsList + `/${req.params.id}`, {
      method: 'DELETE'
    });
    res.redirect('/restaurants');
  } catch (error) {
    return next(error);
  }
});
//CREATE ONE RESTAURANT
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
//CREATE ONE MENU
Router.post('/createMenu', async (req, res, next) => {
  try {
    if (req.body.RestaurantId === "unassigned") {
      req.body = {
        title: req.body.title
      }
    }
    await fetch(menusList, {
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
//CREATE ONE MENU ITEM
Router.post('/createMenuItem', async (req, res, next) => {
  try {
    if (req.body.MenuId === "unassigned") {
      req.body = {
        name: req.body.name,
        price: req.body.price
      }
    }
    await fetch(menuItemsList, {
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