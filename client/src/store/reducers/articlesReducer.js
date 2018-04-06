import * as actionTypes from '../actions/actionTypes';

const initialState = {
    allArticles: [],
    article: null,
    newArticleSubmitted: false,
    errorSubmittingNewArticle: null,
    savedArticle: false,
    errorSavingArticle: null,
    deletedArticle: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_ARTICLES:
            console.log('[GET_ALL_ARTICLES]');
            return {
                ...state,
                allArticles: action.articles,
                newArticleSubmitted: false,
                errorSubmittingNewArticle: null,
                deletedArticle: false
            };
        case actionTypes.GET_ARTICLE:
            console.log('[GET_ARTICLE]');
            return {
                ...state,
                article: action.article,
                deletedArticle: false,
                savedArticle: false,
                errorSavingArticle: null
            }
        case actionTypes.NEW_ARTICLE_SUBMITTED:
            console.log('[NEW_ARTICLE_SUBMITTED]');
            return {
                ...state,
                newArticleSubmitted: true,
                errorsOnSubmittingNewArticle: null
            }
        case actionTypes.ERROR_SUBMITTING_ARTICLE:
            return {
                ...state,
                newArticleSubmitted: false,
                errorSubmittingNewArticle: action.error
            }
        case actionTypes.SAVED_ARTICLE:
            console.log('[SAVED_ARTICLE]');
            return {
                ...state,
                savedArticle: true,
                errorSavingArticle: null
            }
        case actionTypes.ERROR_SAVING_ARTICLE:
            return {
                ...state,
                savedArticle: false,
                errorSavingArticle: action.error
            }
        case actionTypes.DELETED_ARTICLE:
            console.log('[DELETED_ARTICLE]');
            return {
                ...state,
                deletedArticle: true,
                newArticleSubmitted: false,
                savedArticle: false
            }
        default:
            return state;
    }
};

export default reducer;
