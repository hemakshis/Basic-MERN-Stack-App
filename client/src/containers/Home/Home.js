import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllArticles } from '../../store/actions/articlesActions';
import Article from '../../components/Article/Article';
import WrappedLink from '../../components/WrappedLink/WrappedLink';
import './Home.css';

class Home extends Component {
    componentDidMount() {
        this.props.initArticles();
    }

    render() {
        let articles = this.props.articles || JSON.parse(localStorage.getItem('BasicMERNStackAppAllArticles'));
        articles = this.props.articles.map(article => (
            <Article
                key={article._id}
                id={article._id}
                title={article.title} />
        ));

        return (
            <div className="container">
                <br />
                <div className="Header">
                    <h1 style={{display: 'inline-block'}}>All Articles</h1>
                    <WrappedLink to="/article/add" buttonClasses={['btn', 'btn-primary', 'AddArticleButton']}>Add Article</WrappedLink>
                </div>
                <br />
                <div>
                    <section className="jumbotron">
                        <div className="Articles">
                            {articles}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articles.articles,
        isAuthenticated: state.users.isAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initArticles: () => dispatch(getAllArticles())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
