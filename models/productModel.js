// import mongoose as a dependency
const mongoose = require('mongoose');

// create schema for a product
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a product name"],
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)

// create mongoose model from the defined schema
const Product = mongoose.model('Product', productSchema);

// export the model so we can use it in our API
module.exports = Product;