// get the instance of sequelize
const {
  connection,
  Restaurant,
  Menu,
  MenuItem,
} = require('./sequelize-connect');

/**
 * Runs all the functions
 */
async function main() {
  try {
    await start();
    const objects = await createTables();
    await runQueries(objects);
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * Synchronize all models with db
 */
async function start() {
  await connection.sync({
    logging: false, // don't log everything
    force: true, // drop tables each time
  });
}

// run main and log any errors
main().catch((e) => console.log(`Caught error: ${e}`));

/**
 * Creates the rows in the db
 * @returns array of objects
 */
async function createTables() {
  // create the objects (and rows!)

  const theRestaurants = await Restaurant.bulkCreate([
    {
      name: 'Pizza Hut',
      imagelink: 'http://domain.myimagelink.jpg',
    },
    {
      name: 'Burger joint',
      imagelink: 'http://domain.myimagelink2.jpg',
    },
    {
      name: 'Pasta place',
      imagelink: 'http://domain.myimagelink2.jpg',
    }
  ])


  const theMenus = await Menu.bulkCreate([
    {
      title: 'Pizza menu',
    },
    {
      title: 'Burger menu',
    },
    {
      title: 'Pasta menu',
    },
    {
      title: 'Dummy menu',
    },

  ]);


  const theMenuItems = await MenuItem.bulkCreate([
    {
      name: 'Margherita',
      price: 8.99,
    },
    {
      name: 'Marinara',
      price: 7.99,
      MenuId: 1
    },
    {
      name: 'Cheese Burger',
      price: 8.50,
    },
    {
      name: 'Bacon cheese Burger',
      price: 9.99,
      MenuId: 2
    },
    {
      name: 'Pasta Arrabbiata',
      price: 11.99,
    },
    {
      name: 'Genovese Pasta',
      price: 13.99,
      MenuId: 3
    }
  ],
  { validate: true } // slower execution, but will throw validation errors, if any, and nothing will be created
  );


  // add the associations (foreign keys) (these are sequelize specific functions)

  await theRestaurants[0].addMenu(theMenus[0]); // pizza menu in pizza hut
  await theRestaurants[1].addMenu(theMenus[1]); // burger menu in burger joint
  await theRestaurants[2].addMenu(theMenus[2]); // pasta menu in pasta place
  await theMenus[0].addMenuItem(theMenuItems[0]);
 
  await theMenus[1].addMenuItem(theMenuItems[2]);

  await theMenus[2].addMenuItem(theMenuItems[4]);



  return [theRestaurants, theMenus];
}

/**
 * A space to run any queries
 * @param [] array of objects
 */
async function runQueries(objects) {
  [theRestaurants, theMenus] = objects; // objects[0], objects[1], objects[2]

  const restaurants = await Restaurant.findAll({}); // get all restaurants / CRUD = Read
  console.log(`**** Found all restos: ${JSON.stringify(restaurants)}`);
  console.log(`**** Found all menus: ${JSON.stringify(await Menu.findAll())}`); // get all menus / CRUD = Read
  console.log(`**** Found all menu items: ${JSON.stringify(await MenuItem.findAll())}`); // get all menu items / CRUD = Read

  const menus = await theRestaurants[0].getMenus(); // get all menus / CRUD = Read
  await theRestaurants[1].update({name: 'Five Guys'}) // update Restaurant name / CRUD = Update
  await Restaurant.update({name: 'PastaEat'},{where:{
    name: 'Pasta place'    // update restaurant name from table, with where keyword / CRUD = Update
  }})
  await Menu.destroy({where:{
    title:'Dummy menu'  // delete menu from table, with where keyword / CRUD = Delete
  }})


  console.log(`**** Found menus of ${theRestaurants[0].name}: ${JSON.stringify(menus)}`);
  console.log(`**** Update menus of ${theRestaurants[1].name}: ${JSON.stringify(theRestaurants[1])}`);
  console.log(`**** menu items of ${theMenus[1].title}: ${JSON.stringify(await theMenus[1].getMenuItems())}`)
}

/*
  - 1. CRUD for Restaurants - DONE
  - 2. get Menus that belong to a restaurant - DONE
  - 3. get MenuItems that belong to a menu - DONE
  - 4. Test our Sequelize code in Jest (nice to have)
*/