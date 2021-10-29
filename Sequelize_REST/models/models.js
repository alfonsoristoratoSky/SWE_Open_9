// get the seq package
const Sequelize = require('sequelize');

// model = outline of the data we'll store against an entity
const restaurantModel = {
  name: {
    type: Sequelize.STRING, // TEXT in sqlite
    allowNull: false,
    validate:{
      notEmpty: true,
      is: ["^[a-z]+$",'i'],
    }
  },
  imagelink: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      is: ["^[a-z]+$",'i'],
    }
  },
  
};

const menuModel = {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      is: ["^[a-z]+$",'i'],
    }
    
  },
};

const menuItemModel = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      is: ["^[a-z]+$",'i'],
    }
  },
  price: {
    type: Sequelize.FLOAT, // may end up as "REAL" in sqlite
    allowNull: false,
    validate:{
      isNumeric: true,
    }
  },
};

module.exports = { restaurantModel, menuModel, menuItemModel };