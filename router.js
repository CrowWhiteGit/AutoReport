const express = require('express');

const router = express.Router();

function createRouter(reporter, modelName) {

    const { db } = reporter;

    const router = express.Router();

    router.get('/', async (req, res) => {
        res.send('Hello from report router');
    });

    router.get('/list', async (req, res) => {
        let reports = await db[reporter.modelName].find({}).lean();

        res.json(reports);
    })

    router.post('/', async (req, res) => {
        const { type, query } = req.body;

        let tpl = await db[reporter.modelName].findOne({ name: type }).lean();
        if(!tpl) {
            res.sendStatus(500);
            return;
        }
        // console.log(tpl,'tpl.template')
        let myXlsx = reporter.createReport(tpl.template, query);

        console.log(myXlsx.getHeader());
        console.log(myXlsx.getRows());
        await myXlsx.handle();
        console.log(myXlsx.getHeader());
        console.log(myXlsx.getRows());

        res.sendStatus(200)
    });

    return router;
}


module.exports = { createRouter };