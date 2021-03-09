
const utils = require('./utils');

module.exports = {
    none: function (string = "") {
        return string;
    },
    capitalize: function (string = "") {
        let words = string.trim().split(' ');
        let output = "";
        words.forEach(el => {
            output += utils.capitalize(el);
            output += " ";
        })
        return output.trim();
    }
};