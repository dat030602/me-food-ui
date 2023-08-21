import styles from './Restaurants.module.scss';
import classNames from 'classnames/bind';
import { ListItem } from '~/components/Popper';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Restaurants() {
    const [dataHor1, setDataHor1] = useState({});
    const [dataHor2, setDataHor2] = useState({});
    useEffect(() => {
        fetch('https://me-food-api.onrender.com//home/getBranch1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => setDataHor1(data));
        fetch('https://me-food-api.onrender.com//home/getBranch2', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => setDataHor2(data));
    }, []);
    return (
        <>
            <div className={cx('address', 'container', 'grid')}>
                <div className={cx('container', 'grid')}>
                    <ListItem title="Mã khuyến  mãi Yumi Yumi ở " data={dataHor1} />
                </div>
                <div className={cx('container', 'grid')}>
                    <ListItem title="Mã khuyến  mãi Yumi Yumi ở " data={dataHor2} />
                </div>
            </div>
        </>
    );
}
export default Restaurants;
