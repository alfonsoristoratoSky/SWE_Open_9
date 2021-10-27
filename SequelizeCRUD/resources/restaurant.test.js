const {
    connection,
    Restaurant,
    Menu,
    MenuItem,
  } = require('./../sequelize-connect');

describe('Testing restaurant db', () => {
    beforeAll(async () => {

        await connection.sync()
        // create rows
        
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

          await theRestaurants[0].addMenu(theMenus[0]); // pizza menu in pizza hut
      await theRestaurants[1].addMenu(theMenus[1]); // burger menu in burger joint
      await theRestaurants[2].addMenu(theMenus[2]); // pasta menu in pasta place
      
      await theMenus[0].addMenuItem(theMenuItems[0]);
     
      await theMenus[1].addMenuItem(theMenuItems[2]);
    
      await theMenus[2].addMenuItem(theMenuItems[4]);
    
    })
    afterAll(async () => {
        await connection.dropAllSchemas()
    })
    
      
    
    test('Restaurant table now has 3 entries', async () => {
        expect(await (await Restaurant.findAndCountAll()).count).toEqual(3)
    })

    test('Menu table now has 4 entries', async () => {
        expect(await (await Menu.findAndCountAll()).count).toEqual(4)
    })

    test('Menu items have attributes', async () => {
        menu1 = await Menu.findOne({where:{id: 4}})        
        expect(menu1.title).toBe('Dummy menu')

        expect(await (await Menu.findOne({where:{id: 1}})).RestaurantId).toBe(1)

    })

    
})