import React from 'react';
import styles from './Item.module.scss';

import classNames from 'classnames/bind';
import Text from '~/components/Text';
import Star from '~/components/Star';

const cx = classNames.bind(styles);

function Item({ children, data = {}, }) {
    return (
        <div className={cx('item')}>
            <h1 className={cx('name')}>
                <Text>Tên món ăn: {data.TenMonAn}</Text>
            </h1>
            <div className={cx('')}>
                <Text>Người mua hàng: {data.TenKhachHang}</Text>
                <Text>Bình luận: {data.BinhLuan}</Text>
                <Text style={{ display: 'flex' }}>
                    Đánh giá: <Star style={{ marginLeft: '8px' }} amount={data.Rating} />
                </Text>
            </div>
        </div>
    );
}

export default Item;
