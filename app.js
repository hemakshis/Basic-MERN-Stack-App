import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import Article from './models/articlesModel.js';
import articles from './routes/articlesRoute.js'
import users from './routes/usersRoute.js'
import 'dotenv/config'

let domain = process.env.MONGODB_DOMAIN;
if (domain == null) {
    domain = 'localhost'
}

mongoose.connect(`mongodb://${domain}/basic-mern-app`);
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

app.use(function(req,res,next){
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
     if (req.method === 'OPTIONS') {
         res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
         return res.status(200).json({});
     }
     next();
})

app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        res.json({ articles: articles });
    })
});

app.use('/articles', articles);
app.use('/users', users);

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
