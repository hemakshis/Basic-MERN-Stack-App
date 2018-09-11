import React from 'react';
import './Article.css';
import WrappedLink from '../UI/WrappedLink/WrappedLink';

const article = (props) => {
    return (
        <li className="Article">
            <strong>{props.title}</strong>
            <WrappedLink
                to={'/articles/' + props.id}
                buttonClasses={['btn', 'btn-info', 'ViewButton']}>View</WrappedLink>
        </li>
    );
}

export default article;
