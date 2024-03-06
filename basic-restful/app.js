// console.log("Hello World!");

const express = require('express')
const mongoose = require('mongoose')

const port = 3000
const app = express()

const Product = require('./models/productModel')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
    console.log(`Server running on port: ${port}...`)
})

// Test route.
// app.get('/', (req, res) => {
//    res.send('Hello World!')
// })

// Product routes.
app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch(error) {
        console.log(error.message)
        res.status(500).json({
            message: error.message
        })
    }

    res.send(req.body)
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch(error) {
        res.status(500).json({ 
            message: error.message
        })
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch(error) {
        res.status(500).json({ 
            message: error.message
        })
    }
})

app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)

        if(!product) {
            return res.status(404).json({ message: `Cannot find any product with Id: ${id}`})
        }

        const updateProduct = await Product.findById(id)

        res.status(200).json(updateProduct)
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with Id: ${id}`})
        }

        res.status(200).json(product)
    } catch(error)  {
        res.status(500).json({ message: error.message })
    }
})

mongoose
    .connect('mongodb+srv://:@proteusf10.obohxnd.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB...')
    }).catch((error) => {
        console.log(error)
    })
