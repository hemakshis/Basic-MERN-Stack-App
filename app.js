const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/basic-mern-app');
let db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (error) => {
    console.log(error);
});

let app = express();

const Article = require('./models/articleModel.js');

app.use(function(req,res,next){
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
})

app.get('/', (req, res) => {
    Article.find({}, (err, data) => {
        res.json(data);
    })
});

app.get('/articles/:id', (req, res) => {
    console.log('got the request');
    Article.findById(id, (err, data) => {
        console.log('article requested', data);
        res.json(data);
    })
})

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
