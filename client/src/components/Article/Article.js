import React, { Component } from 'react';

class Article extends Component {
    render() {
        return (
            <li>
                {this.props.title}
            </li>
        );
    }
}

export default Article;
