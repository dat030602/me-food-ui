import styles from './Restaurant.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import Button from '~/components/Button';
import Text from '~/components/Text';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Star from '~/components/Star';
import { Product, Rating } from '~/components/Popper';
const cx = classNames.bind(styles);
function Restaurant() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [data0, setData0] = useState();
    useEffect(() => {
        const abortController = new AbortController();
        fetch(`https://me-food-api.onrender.com//restaurant/getName/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            signal: abortController.signal,
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => setData(data));
        return () => {
            abortController.abort();
        };
    }, [id]);
    const [rating, setRating] = useState();
    useEffect(() => {
        if (data) {
            fetch(`https://me-food-api.onrender.com//restaurant/getMenu/${data[0].MaThucDon}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data0) => setData0(data0));
            fetch(`https://me-food-api.onrender.com//restaurant/getComment/${data[0].MaThucDon}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setRating(data);
                });
        }
    }, [data]);
    return (
        <>
            <div className={cx('address', 'container', 'grid')}>
                <Button to="/">Trang chủ</Button>
                <Text className={cx('img')}>
                    <img src={images.right} alt="" />
                </Text>
                <Button to="/restaurants">Nhà hàng</Button>
                <Text className={cx('img')}>
                    <img src={images.right} alt="" />
                </Text>
                <Text>{data !== undefined && data[0].TenDoiTac}</Text>
            </div>
            <div className={cx('container', 'grid')}>
                <div className={cx('list')}>
                    <h1 className={cx('title')}>
                        <Text>{data !== undefined && data[0].TenDoiTac}</Text>
                    </h1>
                    <h3 className={cx('type')}>
                        <Text>{data !== undefined && data[0].LoaiAmThuc}</Text>
                    </h3>
                    <Star amount={data !== undefined && data[0].Rating} />
                    <Text className={cx('contact')}>Liên hệ: {data !== undefined && data[0].Email}</Text>
                </div>
            </div>
            <div className={cx('container', 'grid')}>{data0 && <Product data={data0} />}</div>
            {rating && (
                <div className={cx('container', 'grid')}>
                    <Rating data={rating} />
                </div>
            )}
        </>
    );
}
export default Restaurant;
