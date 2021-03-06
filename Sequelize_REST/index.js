const express = require('express');
const { connection } = require('./sequelize-connect')
const app = express()
const port = 3002
const {dbRead, dbCreate, dbDelete, dbUpdate} = require('./resources/utils')

//Body parser
app.use(express.json())

app.post('/api/?(restaurants||menus||menuItems)?/:id/?(restaurants||menus||menuItems)', async (req, res) => {
    try {        
        const dbEntry = await dbCreate(req.path, req.body, req.params.id);
        // 201 = created a resource
        res.status(201).send(dbEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.get('/api/?(restaurants||menus||menuItems)/:id/?(restaurants||menus||menuItems)', async (req, res) => {
    try {        
        const dbEntry = await dbRead(req.path, req.params.id);
        // 200 = success
        res.status(200).send(dbEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.delete('/api/?(restaurants||menus||menuItems)/:id', async (req, res) => {
    try {        
        const dbEntry = await dbDelete(req.path, req.params.id)
        // 200 = success
        res.status(200).send(dbEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.put('/api/?(restaurants||menus||menuItems)/:id', async (req, res) => {
    try {
        const dbEntry = await dbUpdate(req.path, req.params.id, req.body)        
        // 200 = success
        res.status(200).send(dbEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

/**
 * Synchronize all models with db
 */
async function start() {
    await connection.sync({
        logging: false, // don't log everything
        // force: true, // drop tables each time
    });
}

// run start and log any errors
start()
    .then(() => console.log('Sequelize connected'))
    .catch((e) => console.log(`Caught error: ${e}`));

app.listen(port, () => console.log(`Express server running on port ${port}`));