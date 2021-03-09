
const Report = require('./Report');

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

        return new Report(...args);
    }
};

module.exports = Reporter;
