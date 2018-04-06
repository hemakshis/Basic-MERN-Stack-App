import * as actionTypes from '../actions/actionTypes';

const initialState = {
    allArticles: [],
    singleArticle: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_ARTICLES:
            return {
                ...state,
                allArticles: action.articles
            };
        case actionTypes.GET_SINGLE_ARTICLE:
            return {
                ...state,
                singleArticle: action.article
            }
        default:
            return state;
    }
};

export default reducer;
