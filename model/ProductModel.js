const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let autoIncrement = require('mongoose-auto-increment');
let ProductSchema = new Schema({
    product_name: {type: String, required: true, max: 100, unique : true},
    price: {type: Number, required: true},
    categories : [],
    total_quantity: {type: Number}
});
ProductSchema.plugin(autoIncrement.plugin, {model :'Product', field: 'id', startAt:1 });
module.exports = mongoose.model('Product', ProductSchema);