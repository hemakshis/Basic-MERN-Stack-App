import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { getArticle, deleteArticle } from '../../store/actions/articlesActions';
import WrappedLink from '../../components/UI/WrappedLink/WrappedLink';
import './FullArticle.css'

class FullArticle extends Component {

    componentDidMount() {
        this.getSingleArticle();
    }

    getSingleArticle() {
        if (this.props.match.params.id) {
            if (!this.props.article || (this.props.article._id !== + this.props.match.params.id)) {
                this.props.getArticle(this.props.match.params.id);
            }
        }
    }

    handleEditArticleClick() {
        this.props.history.replace({pathname: '/article/edit/' + this.props.match.params.id});
    }

    handleDeleteArticleClick() {
        alert('We are deleting your article...');
        this.props.deleteArticle(this.props.match.params.id)
    }

    render() {
        if (this.props.deleted) {
            return <Redirect to="/" />;
        } else if (!this.props.article) {
            return <h2 className="text-center">Wait....Loading your article....</h2>;
        } else if (this.props.article) {
            return (
                <div className="container">
                    <br />
                    <div className="jumbotron FullArticle">
                        <h3 className="text-center">{this.props.article.title}</h3>
                        <h5 className="text-right">- By {this.props.article.author}</h5>
                        <p>{this.props.article.body}</p>
                        <button
                            className="btn btn-danger"
                            style={{float: 'right'}}
                            onClick={() => this.handleDeleteArticleClick()}>Delete</button>
                        <WrappedLink
                            to={"/article/edit/" + this.props.match.params.id}
                            buttonClasses={['btn', 'btn-info', 'mr-2']}
                            click={() => this.handleEditArticleClick()}>Edit</WrappedLink>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        article: state.articles.article,
        deleted: state.articles.deletedArticle
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getArticle: (articleId) => dispatch(getArticle(articleId)),
        deleteArticle: (articleId) => dispatch(deleteArticle(articleId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullArticle);
