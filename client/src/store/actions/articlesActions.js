import * as actionTypes from './actionTypes';

const URL = "http://localhost:5000";
const options = (data) => {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(data)
    };
};

export const getAllArticles = () => {
    return dispatch => {
        fetch(URL + '/')
        .then(res => res.json())
        .then(res => {
            dispatch({ type: actionTypes.GOT_ALL_ARTICLES, articles: res.articles })
        })
    };
};

export const getArticle = (articleId) => {
    return dispatch => {
        fetch(URL + '/articles/' + articleId)
        .then(res => res.json())
        .then(res => {
            dispatch({ type: actionTypes.GOT_SINGLE_ARTICLE, article: res.article })
        })
    };
};

export const submitNewArticle = (articleData) => {
    return dispatch => {
        return fetch(URL + '/articles/add', options(articleData))
        .then(res => res.json())
    }
};

export const saveArticle = (articleId, articleData) => {
    return dispatch => {
        return fetch(URL + '/articles/edit/' + articleId, options(articleData))
        .then(res => res.json())
    }
}

export const deleteArticle = (articleId) => {
    return dispatch => {
        return fetch(URL + '/articles/delete/' + articleId, {method: 'delete'})
        .then(res => res.json())
    };
}
