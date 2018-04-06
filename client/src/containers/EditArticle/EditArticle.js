import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveArticle } from '../../store/actions/articles';

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

    handleFormSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.article.title,
            author: this.state.article.author,
            body: this.state.article.body
        }
        this.props.saveArticle(this.props.match.params.id, data);
    }

    render() {
        const redirect = this.props.saved ? <Redirect to={"/articles/" + this.props.match.params.id} /> : null;
        const errors = this.props.errors ? <p>{this.props.errors}</p> : null;
        if (redirect)
            return redirect;
        if (errors)
            return errors;

        return (
            <div className="container">
                <br />
                <h3 className="text-center">Add Article</h3>
                <div className="jumbotron">
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                name="title"
                                defaultValue={this.state.article.title}
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                placeholder="Title of your article" />
                        </div>
                        <div className="form-group">
                            <label>Author</label>
                            <input
                                disabled
                                name="author"
                                defaultValue={this.state.article.author}
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                placeholder="Your name" />
                        </div>
                        <div className="form-group">
                            <label>Body</label>
                            <textarea
                                name="body"
                                defaultValue={this.state.article.body}
                                onChange={this.handleInputChange}
                                className="form-control"
                                placeholder="Your article's contents goes here... Good luck!"
                                style={{height: '200px'}} />
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
