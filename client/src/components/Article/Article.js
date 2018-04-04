import React, { Component } from 'react';
import './Article.css';
import WrappedLink from '../UI/WrappedLink/WrappedLink';

class Article extends Component {
    render() {
        return (
            <li className="Article">
                <strong>{this.props.title}</strong>
                <WrappedLink
                    to={'/articles/' + this.props.id}
                    buttonClasses={['btn', 'btn-info']}
                    click={this.props.click}>View</WrappedLink>
            </li>
        );
    }
}

export default Article;
