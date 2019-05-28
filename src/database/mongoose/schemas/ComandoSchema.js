const { Schema } = require('mongoose')

module.exports = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String
    },
    devPermission: {
        type: Boolean,
        default: false
    },
    Used: {
        type: Number,
        default: 0
    }
})