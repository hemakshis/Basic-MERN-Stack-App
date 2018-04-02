import React, { Component } from 'react';
import Article from '../../components/Article/Article';
import { Route } from 'react-router-dom';
import FullArticle from './FullArticle/FullArticle';

class Articles extends Component {

    render() {
        const articles = this.props.articles.map(article => (
            <Article
                key={article._id}
                title={article.title} />
        ));
        return (
            <div>
                <ul>
                    {articles}
                </ul>
                <Route to={'/articles/:title'} component={FullArticle} />
            </div>
        );
    }
}

export default Articles;
