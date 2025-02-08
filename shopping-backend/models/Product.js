const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    image: { type: String } // Store image URL
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
