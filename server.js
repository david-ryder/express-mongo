const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = 3000;

const Product = require('./models/productModel');

app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send('Hello API');
});

app.get('/blog', (req, res) => {
    res.send('Hello blog, David here');
});

// create post request, async response because awaiting response from database
app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

app.get('/product', async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// get a specific product
app.get('/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        // product not found
        if (!product) {
            return res.status(404).json({message: `cannot find product with id ${id}`})
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product
app.delete('/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({message: `cannot find product with id ${id}`});
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.connect('mongodb+srv://admin:admin@cluster0.xo7uh3x.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to mongodb');
    app.listen(port, () => {
        console.log(`express app is running on port: ${port}`);
    });
}).catch((error) => {
    console.log(error);
});