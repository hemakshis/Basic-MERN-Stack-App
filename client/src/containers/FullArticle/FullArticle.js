import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleArticle } from '../../store/actions/articles';
import './FullArticle.css'

class FullArticle extends Component {

    componentDidMount() {
        this.getSingleArticle();
    }

    getSingleArticle() {
        if (this.props.match.params.id) {
            if (!this.props.article || (this.props.article._id !== + this.props.match.params.id)) {
                this.props.getSingleArticle(this.props.match.params.id);
            }
        }
    }

    render() {
        let article = <h2 className="text-center">Wait....Loading your article....</h2>

        if (this.props.article) {
            article = <div className="container">
                        <br />
                        <div className="jumbotron FullArticle">
                            <h3 className="text-center">{this.props.article.title}</h3>
                            <h5 className="text-right">- By {this.props.article.author}</h5>
                            <p>{this.props.article.body}</p>
                        </div>
                    </div>;
        }

        return article;
    }
}

const mapStateToProps = state => {
    return {
        article: state.articles.singleArticle
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSingleArticle: (articleId) => dispatch(getSingleArticle(articleId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullArticle);
