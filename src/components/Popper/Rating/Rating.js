import React, { useRef, useState } from 'react';
import styles from './Rating.module.scss';

import classNames from 'classnames/bind';
import Text from '~/components/Text';
import Item from './Item';

const cx = classNames.bind(styles);

function Rating({ children, data = {} }) {
    return (
        <div className={cx('list')}>
            <div className={cx('list-cover')}>
                <h1 className={cx('title')}>
                    <Text>Bình luận </Text>
                </h1>
            </div>
            <div className={cx('list-cover')}>
                {Object.keys(data).map(function (key) {
                    return <Item key={key} data={data[key]} />;
                })}
            </div>
        </div>
    );
}

export default Rating;
