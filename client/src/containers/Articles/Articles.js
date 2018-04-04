import React, { Component } from 'react';
import Article from '../../components/Article/Article';
import { Route, Switch, withRouter } from 'react-router-dom';
import FullArticle from './FullArticle/FullArticle';
import './Articles.css';

class Articles extends Component {

    handleArticleViewClick = (id) => {
        this.props.history.push({pathname: '/articles/' + id});
    }

    render() {
        const articles = this.props.articles.map(article => (
            <Article
                key={article._id}
                id={article._id}
                title={article.title}
                author={article.author}
                body={article.body}
                click={() => this.handleArticleViewClick(article._id)} />
        ));
        return (
            <div>
                <section className="jumbotron">
                    <div className="Articles">
                        {articles}
                    </div>
                </section>
                <Switch>
                    <Route exact path="/articles/:id" component={FullArticle} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(Articles);
