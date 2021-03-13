
const xlsx = require('node-xlsx');
const utils = require('../lib/utils');
const steps = require('../steps');


class Report {

    constructor(db, template = {}, requestQuery = {}) {
        this.db = db;

        this.template = template;
        this.requestQuery = requestQuery;

        this.query = { ...template.customQuery, ...requestQuery };
        this.header = null;
        this.rows = null;

        this.getHeader = this.getHeader.bind(this);
    }

    async handle() {
        let docs = await getDocs.call(this);

        this.header = generateHeader.call(this);
        this.rows = generateRows.call(this, docs);
    }

    build(sheetName = "New Sheet") {
        if (!this.header || !this.rows) {
            console.log('error');
            return;
        }
        let data = [this.header, ...this.rows];
        return xlsx.build([{ name: sheetName, data }]);
    }

    getHeader() {
        return this.header;
    }
    getRows() {
        return this.rows;
    }
}

async function getDocs() {
    let { model, query, joins = [] } = this.template;
    console.log(Object.keys(this.template))
    console.log(Object.keys(this.db), "|",  model, "|", this.db);
    console.log(this.db[model])
    let rawDocs = await this.db[model].find(query).limit(5).lean();
    let docs = await applyJoin(rawDocs, joins);
    return docs;
}

async function applyJoin(rawDocs, joins) {
    let docs = [];

    for (let rawDoc of rawDocs) {
        let doc = rawDoc;
        for (let join of joins) {
            let innerValue = utils.takeOut(doc, join.innerKey, null);
            if (innerValue) {
                let query = {};
                query[join.outerKey] = innerValue;
                let joinDoc = await this.db[join.model].findOne(query).lean();
                doc[join.name] = joinDoc || {};
            }
        }
        docs.push(doc);
    }

    return docs;
}

function generateHeader() {
    let { fields } = this.template;
    return utils.extract(fields, 'name');
}

function generateRows(docs) {
    let { fields } = this.template;

    let data = [];
    for (let doc of docs) {
        let row = [];
        for (let field of fields) {
            let value = getValue(doc, field);
            row.push(value);
        }
        data.push(row);
    }
    return data;
}

function getValue(doc, field) {
    let { value = "", type = "string", map = {}, transform = "none" } = field;

    let val = steps.getByType(type, doc, value);
    val = steps.applyMap(val, map);
    val = steps.applyTransform(val, transform);
    return val;
}


module.exports = Report;