import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Article from '../../components/Article/Article';
import './Articles.css';

class Articles extends Component {

    handleViewArticleClick(id) {
        this.props.history.push({pathname: '/articles/' + id})
    }

    render() {
        const articles = this.props.articles.map(article => (
            <Article
                key={article._id}
                id={article._id}
                title={article.title}
                author={article.author}
                body={article.body}
                click={() => this.handleViewArticleClick(article._id)} />
        ));
        return (
            <div>
                <section className="jumbotron">
                    <div className="Articles">
                        {articles}
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(Articles);
