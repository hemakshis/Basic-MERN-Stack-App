import React, {Component} from 'react';
import { connect } from 'react-redux';
import { submitNewArticle } from '../../store/actions/articles';

class AddArticle extends Component {

    state = {
        title: '',
        author: '',
        body: ''
    };

    handleInputChange = (e) => {
        const oldState = {...this.state};
        const newState = {
            ...oldState,
            [e.target.name]: e.target.value
        };
        this.setState({...newState});
        console.log(this.state);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.submitNewArticle(this.state);
    }

    render() {
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

const mapDispatchToProps = dispatch => {
    return {
        submitNewArticle: (articleData) => dispatch(submitNewArticle(articleData))
    };
};

export default connect(null, mapDispatchToProps)(AddArticle);
