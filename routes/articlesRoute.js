import express from 'express';
import Article from '../models/articlesModel.js';

let router = express.Router();

const checkForErrors = ({ title, author, body }) => {
    let errors = {};
    let isValid = false;
    if (title === '') {
        errors = { ...errors, title: 'This field is required' }
    }
    if (author === '') {
        errors = { ...errors, author: 'This field is required' }
    }
    if (body === '') {
        errors = { ...errors, body: 'This field is required' }
    }

    if (Object.keys(errors).length > 0) {
        return { isValid, errors };
    }
    isValid = true;
    return { isValid, errors };
}

router.get('/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) throw err;
        res.json({ article: article });
    })
})

router.post('/add', (req, res) => {
    const title = req.body.title || '';
    const author = req.body.author || '';
    const body = req.body.body || '';

    const { isValid, errors } = checkForErrors({ title, author, body });

    if (isValid) {
        const newArticle = new Article({
            title: title,
            author: author,
            body: body
        });

        newArticle.save((err) => {
            if (err) throw err;
            else {
                res.json({ success: 'success' });
            }
        });
    } else {
        res.json({ errors: errors });
    }
});

router.post('/edit/:id', (req, res) => {
    const title = req.body.title || '';
    const author = req.body.author || '';
    const body = req.body.body || '';

    const { isValid, errors } = checkForErrors({ title, author, body });
    
    if (isValid) {
        const updatedArticle = {
            title: req.body.title,
            author: req.body.author,
            body: req.body.body
        };

        Article.findByIdAndUpdate(req.params.id, updatedArticle, (err, doc) => {
            if (err) throw err;
            else res.json({ success: 'success' });
        });
    } else {
        res.json({ errors: errors });
    }
});

router.delete('/delete/:id', (req, res) => {
    Article.remove({_id: req.params.id}, err => {
        res.json({ success: 'success' });
    });
});

export default router;
