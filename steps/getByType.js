
const utils = require('../lib/utils');

function main(type, doc, value) {
    let val = null;
    switch (type) {
        case "string": {
            val = utils.takeOut(doc, value, "");
            break;
        }
        case "static": {
            val = value;
            break;
        }
        case "builder": {
            let _match = value.match(/{\S*}/g) || [];
            val = value;

            _match.forEach(str => {
                let _key = str.slice(1, -1).replace(/\(\S*\)/, '');
                let _value = utils.takeOut(doc, _key, "");

                let _sliceRule = str.match(/\(\S*\)/g) || null;
                if (_sliceRule) {
                    let _sliceVals = _sliceRule[0].slice(1, -1).split(',');
                    if (_value != "") _value = _value.slice(Number(_sliceVals[0]), Number(_sliceVals[1])) + ".";
                }

                val = val.replace(str, _value);
            })
            break;
        }
        case "datetime": {
            val = utils.takeOut(doc, value, "");
            if (doc.$system) val = utils.setTimezone(val, 3);
            break;
        }
    }

    return val;
}

module.exports = main;