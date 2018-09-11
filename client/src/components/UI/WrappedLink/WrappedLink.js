import React from 'react';
import { Link } from 'react-router-dom';
import './WrappedLink.css'

const wrappedLink = (props) => {
    return (
        <Link to={props.to} className="WrappedLink">
            <button
                className={[...props.buttonClasses, "WrappedButton"].join(' ')}>
                {props.children}</button>
        </Link>
    );
}

export default wrappedLink;
