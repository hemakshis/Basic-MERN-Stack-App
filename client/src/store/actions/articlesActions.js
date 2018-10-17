import * as actionTypes from './actionTypes';

const options = (data) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(data)
    };
};

export const getAllArticles = () => {
    return dispatch => {
        fetch('/articles')
        .then(res => res.json())
        .then(res => {
            localStorage.setItem('BasicMERNStackAppAllArticles', JSON.stringify(res.articles));
            dispatch({ type: actionTypes.GOT_ALL_ARTICLES, articles: res.articles })
        })
    };
};

export const getArticle = (articleId) => {
    return dispatch => {
        fetch('/articles/' + articleId)
        .then(res => res.json())
        .then(res => {
            dispatch({ type: actionTypes.GOT_SINGLE_ARTICLE, article: res.article })
        })
    };
};

export const submitNewArticle = (articleData) => {
    return dispatch => {
        return fetch('/articles/add', options(articleData))
        .then(res => res.json())
    }
};

export const saveArticle = (articleId, articleData) => {
    return dispatch => {
        return fetch('/articles/edit/' + articleId, options(articleData))
        .then(res => res.json())
    }
}

export const deleteArticle = (articleId) => {
    return dispatch => {
        return fetch('/articles/delete/' + articleId, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
                'Content-Type': 'application/json'
            },
            method: 'delete'
        })
        .then(res => res.json())
    };
}
