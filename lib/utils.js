
function humanDateTime(dateTime) {
    let now = dateTime || new Date();
    let date = now.getDate();
    let month = now.getMonth() + 1;
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    return `${date > 9 ? date : "0" + date}.${month > 9 ? month : "0" + month}.${now.getFullYear()} ${hour > 9 ? hour : "0" + hour}:${minute > 9 ? minute : "0" + minute}:${second > 9 ? second : "0" + second}`;
}

module.exports = {
    pick: function (objects, fields) {
        let out = objects.map(obj => {
            let handled = {};
            fields.forEach(el => {
                if (!obj[el]) {
                    throw new Error(`No such key (${el})`);
                }
                handled[el] = obj[el];
            });
            return handled;
        })
        return out;
    },
    separate: function (object, fields) {
        let chosen = {};
        let extra = {};

        Object.keys(object).forEach(key => {
            if (fields.includes(key)) {
                chosen[key] = object[key];
            }
            else {
                extra[key] = object[key];
            }
        })

        return { chosen, extra };
    },
    extract: function (objects, field) {
        let out = objects.map(obj => {
            return obj[field];
        })
        return out;
    },
    takeOut: function (object, path, _default = null) {
        if (!object) return _default;

        let parts = path.split('.');
        let now = object;

        for (let part of parts) {
            if (!now[part]) {
                now = _default;
                break;
            }

            now = now[part];
        }

        return now;
    },
    capitalize(string = "") {
        if (string.length == 0) {
            return "";
        }
        let low = string.toLowerCase();
        let output = low.charAt(0).toUpperCase();
        if (string.length > 1) output += low.slice(1);
        return output;
    },
    setTimezone(dateStr = "", zone = 0) {
        try {
            let _date = new Date(dateStr);
            _date.setTime(_date.getTime() + 1000 * 60 * 60 * zone);
            return humanDateTime(_date);
        }
        catch (err) {
            return dateStr;
        }
    },
    humanDateTime
}