import React from 'react';
import { Link } from 'react-router-dom';
import './WrappedLink.css'

const wrappedLink = (props) => {
    return (
        <button
            className={[...props.buttonClasses, "WrappedButton"].join(' ')}
            onClick={props.click}>
            <Link
                to={props.to}
                className="WrappedLink">{props.children}</Link>
        </button>
    );
}

export default wrappedLink;
