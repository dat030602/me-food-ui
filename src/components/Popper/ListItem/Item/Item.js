import React from 'react';
import styles from './Item.module.scss';

import classNames from 'classnames/bind';
import Button from '~/components/Button';
import images from '~/assets/images';
import Star from '~/components/Star';

const cx = classNames.bind(styles);

function Item({ children, hint = false, value = {}, key }) {
    return (
        <div className={cx('item')} key={key}>
            <Button to={`/restaurant/${value.MaDoiTac}`} className={cx('link')}>
                <div className={cx('img')}>
                    <img src={images.product} alt="" />
                </div>
                <h6 className={cx('name')}>{'Rỗng' && value.TenDoiTac}</h6>
                {!hint && (
                    <div className={cx('more')}>
                        <h3 className={cx('type')}>{'Rỗng' && value.LoaiAmThuc}</h3>
                        <Star amount={1 && value.Rating} />
                    </div>
                )}
            </Button>
        </div>
    );
}

export default Item;
