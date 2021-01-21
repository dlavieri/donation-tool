import React from 'react';
import cn from 'classnames';

const Button = ({ children, primary, onClick }) => {
    
    const classnames = cn({
        'btn': true,
        'primary': primary,
        'secondary': !primary
    })

    return (
        <button className={classnames} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;