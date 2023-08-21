import React, { useEffect, useState } from 'react';
import styles from './Product.module.scss';

import classNames from 'classnames/bind';
import Text from '~/components/Text';
import Item from './Item';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Product({ data = {} }) {
    useEffect(() => {
        localStorage.setItem('Món ăn', JSON.stringify([]));
    }, [data]);
    const [order, setOrder] = useState(false);
    return (
        <>
            <div className={cx('menu')}>
                <h1 className={cx('title', 'thuc-don')}>
                    <Text>Thực đơn gồm {data[0].Tong} món ăn</Text>
                </h1>
                <div className={cx('list-item')}>
                    {data &&
                        Object.keys(data).map(function (key) {
                            return <Item key={key} data={data[key]} order={order} />;
                        })}
                </div>
                <div className={cx('btn-submit')}>
                    <Button
                        className={cx('btn')}
                        onClick={() => {
                            setOrder(true);
                            window.location.href = '/checkout';
                        }}
                    >
                        Đặt hàng
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Product;
