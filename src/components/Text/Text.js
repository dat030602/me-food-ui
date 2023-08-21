import React from 'react';
import styles from './Text.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Text({ children, none=false, green=false, className, ...props }) {
    const classes = cx('wrapper', {
        [className]: className,
        none,
        green,
    });
    return <span className={classes} {...props}>{children}</span>;
}

export default Text;
