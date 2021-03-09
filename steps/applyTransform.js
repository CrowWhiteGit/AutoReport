
const transforms = require('../lib/transforms');

function main(value, transformator) {
    return transforms[transformator](value);
}

module.exports = main;