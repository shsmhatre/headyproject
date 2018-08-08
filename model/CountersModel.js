const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CounterSchema = new Schema({
    "_id": {type: String, required: true},
    "sequence": 0
});

module.exports = mongoose.model('Counter', CounterSchema);