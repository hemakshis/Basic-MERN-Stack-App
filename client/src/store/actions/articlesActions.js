import * as actionTypes from './actionTypes';

const URL = "http://localhost:5000";

const allArticlesReceivedSuccessfully = (articles) => {
    return {
        type: actionTypes.GOT_ALL_ARTICLES,
        articles: articles
    };
};

const articleReceivedSuccessfully = (article) => {
    return {
        type: actionTypes.GOT_SINGLE_ARTICLE,
        article: article
    };
};

const newArticleSubmittedSuccessfully = () => {
    return {
        type: actionTypes.SUBMITTED_NEW_ARTICLE,
        submitted: true
    };
};

const errorSubmittingNewArticle = (err) => {
    return {
        type: actionTypes.ERROR_SUBMITTING_NEW_ARTICLE,
        error: err
    };
};
const articleSavedSuccessfully = () => {
    return {
        type: actionTypes.SAVED_ARTICLE,
        saved: true
    };
};

const errorSavingArticle = (err) => {
    return {
        type: actionTypes.ERROR_SAVING_ARTICLE,
        error: err
    };
};

const deletedArticleSuccessfully = (articleId) => {
    return {
        type: actionTypes.DELETED_ARTICLE,
        articleId: articleId,
        deleted: true
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

export const getArticle = (articleId) => {
    return dispatch => {
        return (
            fetch(URL + '/articles/' + articleId)
            .then(res => res.json())
            .then(data => {
                dispatch(articleReceivedSuccessfully(data))
            })
        );
    };
};

export const submitNewArticle = (articleData) => {
    return dispatch => {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(articleData)
        };
        return (
            fetch(URL + '/articles/add', options)
            .then(res => {
                if (res.ok) {
                    dispatch(newArticleSubmittedSuccessfully())
                } else {
                    let error = new Error(res.statusText);
                    dispatch(errorSubmittingNewArticle(error))
                }
            })
        );
    }
};

export const saveArticle = (articleId, articleData) => {
    return dispatch => {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(articleData)
        }
        fetch(URL + '/articles/edit/' + articleId, options)
        .then(res => {
            if (res.ok) {
                dispatch(articleSavedSuccessfully())
            } else {
                let error = new Error(res.statusText);
                dispatch(errorSavingArticle(error));
            }
        })
    }
}

export const deleteArticle = (articleId) => {
    return dispatch => {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'delete'
        }
        fetch(URL + '/articles/delete/' + articleId, options)
            .then(res => {
                dispatch(deletedArticleSuccessfully(articleId))
            })
    };
}
