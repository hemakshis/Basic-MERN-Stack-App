import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { submitNewArticle } from '../../store/actions/articlesActions';

class AddArticle extends Component {

    state = {
        article: {
            title: '',
            author: '',
            body: ''
        }
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

    handleAddArticleFormSubmit = (e) => {
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
                    <form onSubmit={this.handleAddArticleFormSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                name="title" type="text"
                                className="form-control" placeholder="Title of your article"
                                onChange={this.handleInputChange}
                                defaultValue="" />
                        </div>
                        <div className="form-group">
                            <label>Author</label>
                            <input
                                name="author" type="text"
                                className="form-control" placeholder="Your name"
                                onChange={this.handleInputChange}
                                defaultValue="" />
                        </div>
                        <div className="form-group">
                            <label>Body</label>
                            <textarea
                                name="body" style={{height: '200px'}}
                                className="form-control" placeholder="Your article's contents goes here... Good luck!"
                                onChange={this.handleInputChange}
                                defaultValue="" />
                        </div>
                        <button className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        submitted: state.articles.submittedNewArticle,
        errors: state.articles.errorSubmittingNewArticle
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitNewArticle: (articleData) => dispatch(submitNewArticle(articleData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
