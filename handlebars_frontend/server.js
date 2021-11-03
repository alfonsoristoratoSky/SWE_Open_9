const express = require('express');
const app = express();
var methodOverride = require('method-override')
const port = 8001;
const restaurantRoutes = require('./routes/web/restaurants');
const handlebars = require('./handlebars');

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
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
