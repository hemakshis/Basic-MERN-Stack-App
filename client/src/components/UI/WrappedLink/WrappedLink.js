import React from 'react';
import { Link } from 'react-router-dom';
import './WrappedLink.css'

const wrappedLink = (props) => {
    return (
        <button className={props.buttonClasses.join(' ')} style={{float: 'right'}}>
            <Link to={props.to} className="WrappedLink">{props.children}</Link>
        </button>
    );
}

export default wrappedLink;
