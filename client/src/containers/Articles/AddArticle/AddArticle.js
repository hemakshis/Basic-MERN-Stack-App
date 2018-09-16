import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { submitNewArticle } from '../../../store/actions/articlesActions';
import ErrorMsg from '../../../components/ErrorMsg/ErrorMsg';
import InputField from '../../../components/InputField/InputField';

const FIELDS = [
    {name: 'title', type: 'text', label: 'Title'},
    {name: 'author', type: 'text', label: 'Author', disabled: 'disabled'}
];

class AddArticle extends Component {
    state = {
        article: {},
        errors: {}
    };

    componentWillMount() {
        if (localStorage.getItem('AddArticlePage') !== null ) {
            const { article, errors } = JSON.parse(localStorage.getItem('AddArticlePage'));
            this.setState(prevState => {
                return {
                    ...prevState,
                    article: {...article},
                    errors: {...errors}
                };
            });
        }
    }

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
        }, () => localStorage.setItem('AddArticlePage', JSON.stringify(this.state)));
    }

    componentWillUnmount() {
        localStorage.removeItem('AddArticlePage');
    }

    handleNewArticleSubmit = (e) => {
        e.preventDefault();
        let errors = {...this.state.errors};
        const formValuesValid = Object.keys(errors).filter(field => errors[field] !== "").length === 0 ? true : false;
        if ( !formValuesValid ) {
            return;
        } else {
            this.props.submitNewArticle({...this.state.article, author: this.props.authenticatedUsername})
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
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="container">
                <br />
                <h3 className="text-center">Add Article</h3>
                <div className="jumbotron">
                    <form onSubmit={this.handleNewArticleSubmit}>
                        <InputField key={FIELDS[0].name}
                            type={FIELDS[0].type} name={FIELDS[0].name} label={FIELDS[0].label}
                            defaultValue={this.state.article.title}
                            errors={this.state.errors}
                            onChange={this.handleInputChange} />
                        <InputField key={FIELDS[1].name}
                            type={FIELDS[1].type} name={FIELDS[1].name} label={FIELDS[1].label}
                            defaultValue={this.props.authenticatedUsername} disabled={FIELDS[1].disabled}
                            errors={this.state.errors}
                            onChange={this.handleInputChange} />
                        <div className="form-group">
                            <label>Body</label>
                            <textarea
                                name="body" style={{height: '200px'}}
                                className="form-control" placeholder="Your article's contents goes here... Good luck!"
                                onChange={this.handleInputChange}
                                defaultValue={this.state.article.body} />
                            {this.state.errors.body !== '' && <ErrorMsg msg={this.state.errors.body} />}
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
        isAuthenticated: state.users.isAuthenticated,
        authenticatedUsername: state.users.authenticatedUsername
    };
}

const mapDispatchToProps = dispatch => {
    return {
        submitNewArticle: (articleData) => dispatch(submitNewArticle(articleData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
