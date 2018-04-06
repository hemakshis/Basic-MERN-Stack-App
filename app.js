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

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const Article = require('./models/articleModel.js');

app.use(function(req,res,next){
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     if (req.method === 'OPTIONS') {
         res.header('Access-Control-Allow-Methods','PUT', 'POST', 'PATCH', 'DELETE', 'GET');
         return res.status(200).json({});
     }
     next();
})

app.get('/', (req, res) => {
    Article.find({}, (err, data) => {
        res.json(data);
    })
});

app.get('/articles/:id', (req, res) => {
    Article.findById(req.params.id, (err, data) => {
        res.send(data);
    })
})

app.post('/article/add', (req, res) => {
    const newArticle = new Article({
        title: req.body.title,
        author: req.body.author,
        body: req.body.body
    });

    newArticle.save((err) => {
        if (err) throw err;
        else {
            res.send('success');
        }
    });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
