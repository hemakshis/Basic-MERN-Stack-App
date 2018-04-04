import React, { Component } from 'react';

class FullArticle extends Component {

    state = {
        article: null
    };

    componentDidMount() {
        this.getArticle();
    }

    componentDidUpdate() {
        this.getArticle();
    }

    getArticle() {
        if (this.props.match.params.id) {
            if (!this.state.article || (this.props.match.params.id !== this.state.article._id)) {
                fetch('http://localhost:5000/articles/' + this.props.match.params.id)
                    .then(res => res.json())
                    .then(data => {
                        this.setState({
                            article: data
                        });
                    })
            }
        }


    }

    render() {
        let article = <p>Wait....Loading your article....</p>

        if (this.state.article) {
            article = <div className="container">
                        <h3>Full Article: {this.state.article.title}</h3>
                        <h4>By {this.state.article.author}</h4>
                        <h5>{this.state.article.body}</h5>
                    </div>;
        }
        
        return article;
    }
}

export default FullArticle;
