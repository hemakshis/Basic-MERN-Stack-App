import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { submitNewArticle } from '../../store/actions/articles';

class AddArticle extends Component {

    state = {
        article: {
            title: '',
            author: '',
            body: ''
        },
        submitted: false,
        errors: null
    };


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
        this.props.submitNewArticle(data);
    }

    render() {
        const redirect = this.props.submitted ? <Redirect to="/" /> : null;
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
                                defaultValue=""
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                placeholder="Title of your article" />
                        </div>
                        <div className="form-group">
                            <label>Author</label>
                            <input
                                name="author"
                                defaultValue=""
                                onChange={this.handleInputChange}
                                type="text"
                                className="form-control"
                                placeholder="Your name" />
                        </div>
                        <div className="form-group">
                            <label>Body</label>
                            <textarea
                                name="body"
                                defaultValue=""
                                onChange={this.handleInputChange}
                                className="form-control"
                                placeholder="Your article's contents goes here... Good luck!"
                                style={{height: '200px'}} />
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        submitted: state.articles.newArticleSubmitted,
        errors: state.articles.errorSubmittingNewArticle
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitNewArticle: (articleData) => dispatch(submitNewArticle(articleData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
