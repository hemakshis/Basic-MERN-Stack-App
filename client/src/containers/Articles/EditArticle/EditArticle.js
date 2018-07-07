import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveArticle } from '../../../store/actions/articlesActions';

class EditArticle extends Component {

    state = {
        article: {
            title: '',
            author: '',
            body: ''
        }
    };

    componentWillMount() {
        this.setState({
            article: {
                title: this.props.article.title,
                author: this.props.article.author,
                body: this.props.article.body
            }
        })
    }

    handleInputChange = (e) => {
        let article = {...this.state.article};
        article = {
            ...article,
            [e.target.name]: e.target.value
        };
        this.setState({
            article: article
        });
    }

    handleEditArticleFormSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.article.title,
            author: this.state.article.author,
            body: this.state.article.body
        }
        this.props.saveArticle(this.props.match.params.id, data);
    }

    render() {

        if (this.props.saved)
            return <Redirect to={"/articles/" + this.props.match.params.id} />;
        if (this.props.errors)
            return <p>{this.props.errors}</p>;

        return (
            <div className="container">
                <br />
                <h3 className="text-center">Add Article</h3>
                <div className="jumbotron">
                    <form onSubmit={this.handleEditArticleFormSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                name="title" type="text"
                                className="form-control"
                                onChange={this.handleInputChange}
                                defaultValue={this.state.article.title} />
                        </div>
                        <div className="form-group">
                            <label>Author</label>
                            <input
                                disabled
                                name="author" type="text"
                                className="form-control"
                                onChange={this.handleInputChange}
                                defaultValue={this.state.article.author} />

                        </div>
                        <div className="form-group">
                            <label>Body</label>
                            <textarea
                                name="body" style={{height: '200px'}}
                                className="form-control"
                                onChange={this.handleInputChange}
                                defaultValue={this.state.article.body} />
                        </div>
                        <button className="btn btn-success">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        article: state.articles.article,
        saved: state.articles.savedArticle,
        errors: state.articles.errorSavingArticle
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveArticle: (articleId, articleData) => dispatch(saveArticle(articleId, articleData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
