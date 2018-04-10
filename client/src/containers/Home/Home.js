import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllArticles } from '../../store/actions/articlesActions';
import Articles from '../Articles/Articles';
import WrappedLink from '../../components/UI/WrappedLink/WrappedLink';
import './Home.css';

class Home extends Component {

    componentDidMount() {
        this.props.initArticles();
    }

    render() {
        return (
            <div className="container">
                <br />
                <div className="Header">
                    <h1 style={{display: 'inline-block'}}>All Articles</h1>
                    <WrappedLink to="/article/add" buttonClasses={['btn', 'btn-primary', 'AddArticleButton']}>Add Article</WrappedLink>
                </div>
                <br />
                <Articles articles={this.props.articles} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articles.allArticles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initArticles: () => dispatch(getAllArticles())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
