const { Schema } = require('mongoose')

module.exports = new Schema({
    _id: {
        type: String
    },
    blacklist: {
        type: Boolean,
        default: false
    },
    developer: {
        type: Boolean,
        default: false
    },
    vip: {
        type: Boolean,
        default: false
    }
})