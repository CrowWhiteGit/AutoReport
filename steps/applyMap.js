
const utils = require('../lib/utils');

function main(value, table = {}) {
    return table[value] || value;
}

module.exports = main;