import styles from './Home.module.scss';

import classNames from 'classnames/bind';
import images from '~/assets/images';
import { ListItem } from '~/components/Popper';
import Why from './Why';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Home({ children }) {
    const [dataHor, setDataHor] = useState({});
    const [dataVer, setDataVer] = useState({});
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
            .then((data) => setDataHor(data));
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
            .then((data) => setDataVer(data));
    }, []);

    return (
        <>
            <div className={cx('background')} onClick={()=>{console.log(localStorage.getItem('userName'));}}>
                <div
                    className={cx('background-image')}
                    style={{ backgroundImage: `url("${images.background}")` }}
                ></div>
                <div className={cx('background-image-border')}></div>
            </div>

            <div className={cx('container', 'grid')}>
                <ListItem title="Mã khuyến  mãi Yumi Yumi" data={dataHor} />
            </div>
            <div className={cx('container', 'grid')}>
                <ListItem title="There's something for everyone!" hint data={dataVer}/>
            </div>
            <div className={cx('container', 'grid')}>
                <Why />
            </div>
        </>
    );
}

export default Home;
