const express = require('express');
const fetch = require('node-fetch');
const app = express();
var methodOverride = require('method-override')
const port = 8001;
const restaurantRoutes = require('./routes/web/restaurants');
const handlebars = require('./handlebars');
const config = require('./config');
const restaurantsList = `${config.url.restaurants}`; // http://localhost:3002/api/restaurants
const menusList = `${config.url.menus}`;
const menuItemsList = `${config.url.menuItems}`;

// set-up view "engine" - res.render
app.engine('handlebars', handlebars);
app.set('view engine', 'handlebars');
// app.use(express.bodyParser())
app.use(methodOverride('_method'))
// serve static assets from the public/ folder

app.use(express.static('public'));
app.use(express.json())
// support urlencoded bodies (e.g. form POST)
app.use(express.urlencoded({ extended: true }));

// use restaurants routes
app.use('/restaurants', restaurantRoutes);

// // use menus routes
// app.use('/menus', menuRoutes);

// serve an index page
app.get('/', async (req, res) => {
  const responseRest = await fetch(restaurantsList);
    const responseMenus = await fetch(menusList);
    const responseMenuItems = await fetch(menuItemsList);
    const restaurants = await responseRest.json();
    const allMenus = await responseMenus.json();
    const allMenuItems = await responseMenuItems.json();
  res.render('index', {restaurants, allMenus, allMenuItems});
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
