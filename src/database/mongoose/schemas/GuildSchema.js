const { Schema } = require('mongoose')

module.exports = new Schema({
    _id: {
        type: String
    },
    language: {
        type: String,
        default: 'pt-BR'
    }
})