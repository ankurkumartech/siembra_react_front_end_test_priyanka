import React from 'react';
import './CommonButton.scss';

const CommonButton = ({ btnClass, type, onClick, disabled, btnWidth, btnHeight, name, children }) => {
    return (
        <button
            id='commonButton'
            className={`commonBtn ${btnClass ? btnClass : ''}`}
            type={type || 'button'}
            onClick={onClick}
            disabled={disabled ? disabled : false}
            style={{ width: btnWidth ? btnWidth : '175px', minHeight: btnHeight ? btnHeight : '40px' }}
        >
            {children || name || ''}
        </button>
    )
}

export default CommonButton
