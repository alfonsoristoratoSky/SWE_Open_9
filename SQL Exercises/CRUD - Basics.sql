#C reate Insert
#R ead 
#U pdate 
#D elete 

CREATE TABLE Customers (
  customer_id INTEGER NOT NULL PRIMARY KEY,
  name TEXT
  );
  
  CREATE TABLE Orders (
  	order_id INTEGER NOT NULL PRIMARY KEY,
  	name TEXT,
   	customer_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES Customers(customer_id)
    FOREIGN KEY(product_id) REFERENCES Products(product_id)
  );
  
CREATE TABLE Products (
  	product_id INTEGER NOT NULL PRIMARY KEY,
  	name TEXT
   	
  );


  ---------------------

  -- create
INSERT INTO Customers (customer_id, name) VALUES
(1, "Daniel");
INSERT INTO Customers (customer_id, name) VALUES
(2, "Alfo");

-- read all
SELECT * FROM Customers;

-- read one
SELECT name FROM Customers
Where customer_id = 1;

-- update
UPDATE Customers SET 
name = "Theo"
WHERE customer_id = 1;

-- read all
SELECT * FROM Customers;

-- delete
DELETE FROM Customers
WHERE customer_id = 1;

-- read all
SELECT * FROM Customers;