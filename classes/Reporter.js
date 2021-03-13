
const Report = require('./Report');
const { createRouter } = require('../router');

class Reporter {
    constructor(config = {}) {
        let { db, modelName } = config;

        this.db = db || null;
        this.modelName = modelName || null;
    }

    setDB(db) {
        this.db = db;
    }

    createReport(...args) {
        if (!this.db) {
            throw new Error('No db source specified');
        }

        return new Report(this.db, ...args);
    }

    createRouter() {
        return createRouter(this, this.modelName);
    }
};

module.exports = Reporter;
