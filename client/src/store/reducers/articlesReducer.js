import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articles: [],
    article: {},
    submittedNewArticle: false,
    savedArticle: false,
    deletedArticle: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GOT_ALL_ARTICLES:
            return {
                ...state,
                articles: action.articles
            };
        case actionTypes.GOT_SINGLE_ARTICLE:
            return {
                ...state,
                article: action.article
            };
        case actionTypes.SUBMITTED_NEW_ARTICLE:
            return {
                ...state,
                submittedNewArticle: true
            };
        case actionTypes.SAVED_ARTICLE:
            return {
                ...state,
                savedArticle: true
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
