import express from 'express';
import Article from '../models/articlesModel.js';

let router = express.Router();

router.get('/:id', (req, res) => {
    Article.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

router.post('/add', (req, res) => {
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

router.post('/edit/:id', (req, res) => {
    const updatedArticle = {
        title: req.body.title,
        author: req.body.author,
        body: req.body.body
    };

    Article.findByIdAndUpdate(req.params.id, updatedArticle, (err, doc) => {
        if (err) throw err;
        else res.send('success');
    });
});

router.delete('/delete/:id', (req, res) => {
    Article.remove({_id: req.params.id}, err => {
        res.send('success');
    });
});

export default router;
