import * as actionTypes from './actionTypes.js';

const articlesReceivedSuccessfully = (articles) => {
    return {
        type: actionTypes.GET_ALL_ARTICLES,
        articles: articles
    };
};

export const getAllArticles = () => {
    return dispatch => {
        return (
            fetch('http://localhost:5000/api/articles')
                .then(res => res.json())
                .then(data => {
                    dispatch(articlesReceivedSuccessfully(data))
                })
        );
    };
};
