import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllArticles } from '../../store/actions/articles.js';
import Articles from '../Articles/Articles';
import WrappedLink from '../../components/UI/WrappedLink/WrappedLink';

class MainPage extends Component {

    componentWillMount() {
        this.props.initArticles();
    }

    render() {
        return (
            <div className="container">
                <br />
                <div>
                    <h1 style={{display: 'inline-block'}}>All Articles</h1>
                    <WrappedLink to="/articles/add" buttonClasses={['btn', 'btn-primary']}>Add Article</WrappedLink>
                </div>
                <br />
                <div className="jumbotron">
                    <Articles articles={this.props.articles} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articles.articles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initArticles: () => dispatch(getAllArticles())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
