import * as actionTypes from '../actions/actionTypes';

const initialState = {
    allArticles: [],
    article: null,
    submittedNewArticle: false,
    errorSubmittingNewArticle: null,
    savedArticle: false,
    errorSavingArticle: null,
    deletedArticle: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GOT_ALL_ARTICLES:
            return {
                ...state,
                allArticles: action.articles,
                submittedNewArticle: false,
                errorSubmittingNewArticle: null,
                deletedArticle: false
            };
        case actionTypes.GOT_SINGLE_ARTICLE:
            return {
                ...state,
                article: action.article,
                deletedArticle: false,
                savedArticle: false,
                errorSavingArticle: null
            };
        case actionTypes.SUBMITTED_NEW_ARTICLE:
            return {
                ...state,
                submittedNewArticle: true,
                errorSubmittingNewArticle: null
            };
        case actionTypes.ERROR_SUBMITTING_NEW_ARTICLE:
            return {
                ...state,
                submittedNewArticle: false,
                errorSubmittingNewArticle: action.error
            };
        case actionTypes.SAVED_ARTICLE:
            return {
                ...state,
                savedArticle: true,
                errorSavingArticle: null
            };
        case actionTypes.ERROR_SAVING_ARTICLE:
            return {
                ...state,
                savedArticle: false,
                errorSavingArticle: action.error
            };
        case actionTypes.DELETED_ARTICLE:
            return {
                ...state,
                deletedArticle: true,
                submittedNewArticle: false,
                savedArticle: false
            };
        default:
            return state;
    }
};

export default reducer;
