import React, {Component} from 'react';
import { connect } from 'react-redux';
import { submitNewArticle } from '../../../store/actions/articlesActions';
import ErrorMsg from '../../../components/ErrorMsg/ErrorMsg';

class AddArticle extends Component {
    state = {
        article: {},
        errors: {}
    };

    handleValidation = (field, value) => {
        let error = {};
        if (value === '') {
            error[field] = 'This field is required';
        } else {
            error[field] = '';
        }
        return error;
    }

    handleInputChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;

        const errors = { ...this.state.errors, ...this.handleValidation(field, value) }

        this.setState((prevState) => {
            return {
                ...prevState,
                article: {
                    ...prevState.article,
                    [field]: value
                },
                errors: {...errors}
            };
        });
    }

    handleNewArticleSubmit = (e) => {
        e.preventDefault();
        let errors = {...this.state.errors};
        const formValuesValid = Object.keys(errors).filter(field => errors[field] !== "").length === 0 ? true : false;
        if ( !formValuesValid ) {
            return;
        } else {
            this.props.submitNewArticle(this.state.article)
            .then(res => {
                if (res.errors) {
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            article: {...prevState.article},
                            errors: {...prevState.errors, ...res.errors}
                        };
                    });
                } else {
                    this.props.history.push('/');
                }
            })
        }
    }

    render() {
        return (
            <div className="container">
                <br />
                <h3 className="text-center">Add Article</h3>
                <div className="jumbotron">
                    <form onSubmit={this.handleNewArticleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                name="title" type="text"
                                className="form-control" placeholder="Title of your article"
                                onChange={this.handleInputChange}
                                defaultValue="" />
                            {this.state.errors.title !== '' && <ErrorMsg msg={this.state.errors.title} />}
                        </div>
                        <div className="form-group">
                            <label>Author</label>
                            <input
                                name="author" type="text"
                                className="form-control" placeholder="Your name"
                                onChange={this.handleInputChange}
                                defaultValue="" />
                            {this.state.errors.author !== '' && <ErrorMsg msg={this.state.errors.author} />}
                        </div>
                        <div className="form-group">
                            <label>Body</label>
                            <textarea
                                name="body" style={{height: '200px'}}
                                className="form-control" placeholder="Your article's contents goes here... Good luck!"
                                onChange={this.handleInputChange}
                                defaultValue="" />
                            {this.state.errors.body !== '' && <ErrorMsg msg={this.state.errors.body} />}
                        </div>
                        <button className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitNewArticle: (articleData) => dispatch(submitNewArticle(articleData))
    };
};

export default connect(null, mapDispatchToProps)(AddArticle);
