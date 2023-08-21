import React from 'react';
import styles from './Star.module.scss';

import classNames from 'classnames/bind';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Star({ amount = 5, ...props }) {
    var indents = [];
    amount = Math.round(amount);
    for (let index = 0; index < amount; index++) {
        indents.push(<img src={images.star} alt="a" key={index} />);
    }

    const whiteStar = 5 - amount;

    for (let index = 0; index < whiteStar; index++) {
        indents.push(<img src={images.starWhite} alt="a" key={5 - index} />);
    }

    return (
        <>
            <div className={cx('stars')} {...props}>
                {indents}
            </div>
        </>
    );
}

export default Star;
