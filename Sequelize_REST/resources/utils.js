
const { Menu, MenuItem, Restaurant } = require('../sequelize-connect');

function switchParams(params){
    if (params.startsWith('/api/restaurants')){
        params = Restaurant
    }
    else if(params.startsWith('/api/menus')){
        params = Menu
    }
    else if(params.startsWith('/api/menuItems')){
        params = MenuItem
    }
    
    return params;
}

const dbReadAll = async (reqPath) => {
    const dbTable = switchParams(reqPath)
    
    // find all rows in the database matching (all in this case)
    const toReturn = await dbTable.findAll({})
    return toReturn;
}

const dbCreate = async (reqPath, reqBody) => {
    const dbTable = switchParams(reqPath)
    // create a row in the database using sequelize create method
    const toReturn = await dbTable.create(reqBody)
    return toReturn;
}

const dbDelete = async (reqPath, reqParamsId) => {
    const dbTable = switchParams(reqPath)
    // find the row in the db matching the ID
    const toReturn = await dbTable.findByPk(reqParamsId)
    // Delete that row
    await toReturn.destroy()
    return toReturn;
}

const dbUpdate = async (reqPath, reqParamsId, reqBody) => {
    const dbTable = switchParams(reqPath)
    // find the row in the db matching the ID
    const toReturn = await dbTable.findByPk(reqParamsId)
    // update that row, need to pass the params by their key
    await toReturn.update(reqBody)
    return toReturn;
}

module.exports = {dbReadAll, dbCreate, dbDelete, dbUpdate}

