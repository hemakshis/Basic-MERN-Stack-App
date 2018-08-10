import mongoose from 'mongoose';

const ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorID: {
        type: String
    },
    body: {
        type: String,
        required: true
    },
    addedOn: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Article = mongoose.model('Article', ArticleSchema);

export default Article;
