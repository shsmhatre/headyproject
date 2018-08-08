const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
let CategorySchema = new Schema({
    category_name: {type: String, required: true, max: 50, unique : true},
    child_categories: [],
});
CategorySchema.plugin(autoIncrement.plugin, {model :'Category', field: 'id', startAt:1 });
module.exports = mongoose.model('Category', CategorySchema);