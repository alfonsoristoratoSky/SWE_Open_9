PRAGMA foreign_keys = ON;
  CREATE TABLE Restaurant (
  	id INTEGER NOT NULL PRIMARY KEY,
    name TEXT,
    imageLink TEXT
  );
  
  CREATE TABLE Menu (
  	id INTEGER NOT NULL PRIMARY KEY,
    title TEXT,
    restaurant_id INTEGER,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurant(id)
  );

  CREATE TABLE MenuItem (
  	id INTEGER NOT NULL PRIMARY KEY,
    name TEXT,
    price INTEGER,
    menu_id INTEGER,
    FOREIGN KEY (menu_id) REFERENCES Menu(id)    
  );

  -----------

  INSERT INTO Restaurant (name, imageLink) VALUES ("First restaurant", "a link");
INSERT INTO Restaurant (name, imageLink) VALUES ("Second restaurant", "a link");
SELECT * FROM Restaurant;

INSERT INTO Menu (title, restaurant_id) VALUES ("Summer menu", 1);
INSERT INTO Menu (title, restaurant_id) VALUES ("Winter menu", 1);
INSERT INTO Menu (title, restaurant_id) VALUES ("Special menu", 2);
INSERT INTO Menu (title, restaurant_id) VALUES ("Dummy menu", 2);
SELECT * FROM Menu;

INSERT INTO MenuItem (name, price, menu_id) VALUES ("Pizza", 10, 1);
INSERT INTO MenuItem (name, price, menu_id) VALUES ("Burger", 8, 1);
INSERT INTO MenuItem (name, price, menu_id) VALUES ("Paella", 15, 2);
INSERT INTO MenuItem (name, price, menu_id) VALUES ("Oysters", 33, 2);
INSERT INTO MenuItem (name, price, menu_id) VALUES ("Spaghetti", 6, 3);
INSERT INTO MenuItem (name, price, menu_id) VALUES ("Soup", 9, 3);
SELECT * FROM MenuItem;

--example from docs
SELECT restaurant.name, menu.title 
FROM restaurant 
JOIN menu ON restaurant.id = menu.restaurant_id 
WHERE restaurant.id = 1;

-- exc 1
SELECT restaurant.name, menu.title, menuitem.name FROM Restaurant
JOIN menu ON restaurant.id = menu.restaurant_id
JOIN menuItem ON menu.id = menuitem.menu_id
WHERE menu.title = "Summer menu";

-- exc. 2
SELECT name, COUNT(menu.title) FROM Restaurant
JOIN menu ON restaurant.id = menu.restaurant_id
GROUP BY name;

-- exc. 3
SELECT menu.title, SUM(menuItem.price) FROM menu
JOIN menuItem ON menu.id = menuItem.menu_id
GROUP BY menu.title
ORDER BY SUM(menuItem.price) DESC;

-- exc. 3.1 (left join, showing dummy menu)
SELECT menu.title, SUM(menuItem.price) FROM menu
LEFT JOIN menuItem ON menu.id = menuItem.menu_id
GROUP BY menu.title
ORDER BY SUM(menuItem.price) DESC;