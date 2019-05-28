const { Schema } = require('mongoose')

module.exports = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String
    },
    category: {
        type: String,
        default: 'Nenhuma'
    },
    usage: {
        type: Object
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