import * as actionTypes from './actionTypes.js';

const URL = "http://localhost:5000";

const allArticlesReceivedSuccessfully = (articles) => {
    return {
        type: actionTypes.GET_ALL_ARTICLES,
        articles: articles
    };
};

const singleArticleReceivedSuccessfully = (article) => {
    return {
        type: actionTypes.GET_SINGLE_ARTICLE,
        article: article
    };
};

export const getAllArticles = () => {
    return dispatch => {
        return (
            fetch(URL + '/')
                .then(res => res.json())
                .then(data => {
                    dispatch(allArticlesReceivedSuccessfully(data))
                })
        );
    };
};

export const getSingleArticle = (articleId) => {
    return dispatch => {
        return (
            fetch(URL + '/articles/' + articleId)
            .then(res => res.json())
            .then(data => {
                dispatch(singleArticleReceivedSuccessfully(data))
            })
        );
    };
};

export const submitNewArticle = (articleData) => {
    return dispatch => {
        return (
            fetch(URL + '/article/add', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(articleData)
            })
            .then(res => res.json())
            .then(data => {console.log(data);})
        );
    }
};
