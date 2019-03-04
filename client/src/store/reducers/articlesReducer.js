import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articles: [],
    article: {},
    myArticles: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GOT_ALL_ARTICLES:
            return {
                ...state,
                articles: action.articles
            };
        case actionTypes.GOT_MY_ARTICLES: {
            return {
                ...state,
                myArticles: action.myArticles
            }
        }
        case actionTypes.GOT_SINGLE_ARTICLE:
            return {
                ...state,
                article: action.article
            };
        default:
            return state;
    }
};

export default reducer;
