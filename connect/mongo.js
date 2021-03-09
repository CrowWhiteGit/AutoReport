
const mongoose = require('mongoose')

const URI = "mongodb://127.0.0.1:27017/mastakey_cloud";
const OPTIONS = {};

async function connect() {
    try {
        await mongoose.connect(URI, OPTIONS);
    }
    catch(err) {
        console.log(err);
    }
}

connect()

module.exports = mongoose;