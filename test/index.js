
const Reporter = require('../classes/Reporter');
const template = require('../samples/rolf_car.json');
const db = require('../models')

const reportEngine = new Reporter({ db, modelName: "ReportTemplate" });

async function main() {

    let myXlsx = reportEngine.createReport(template);

    console.log(myXlsx.getHeader());
    console.log(myXlsx.getRows());
    await myXlsx.handle();
    console.log(myXlsx.getHeader());
    console.log(myXlsx.getRows());

}

main()