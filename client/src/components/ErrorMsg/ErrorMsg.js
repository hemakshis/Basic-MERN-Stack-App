import React from 'react';
import './ErrorMsg.css';

const errorMsg = (props) => {
    return (
        <small className="ErrorMsg">{props.msg}</small>
    );
};

export default errorMsg;
