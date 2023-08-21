import { useEffect, useState } from 'react';
import styles from './CheckOut.module.scss';

import classNames from 'classnames/bind';
import Button from '~/components/Button';

import Text from '~/components/Text';
import ErrorPage from '../ErrorPage';

const cx = classNames.bind(styles);

function CheckOut() {
    function format(n) {
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? '.' + c : c;
        });
    }

    const [provinces, setProvinces] = useState();
    const [districts, setDistricts] = useState();
    const [wards, setWards] = useState();

    useEffect(() => {
        if (localStorage.getItem('roll') == 4) {
            const fetchApi = async () => {
                var result = await fetch('https://provinces.open-api.vn/api/p/')
                    .then((response) => response.json())
                    .then((data) => data);
                setProvinces(result);
            };
            fetchApi();
        }
    }, []);

    const handleSelectProvinces = () => {
        var value = document.getElementById('provinces').value;
        var results = provinces.find((x) => x.name === value);
        const fetchApi = async () => {
            const result = await fetch(`https://provinces.open-api.vn/api/p/${results.code}?depth=2`)
                .then((response) => response.json())
                .then((data) => data);
            setDistricts(result.districts);
        };
        fetchApi();
    };

    const handleSelectDistricts = () => {
        var value = document.getElementById('districts').value;
        var results = districts.find((x) => x.name === value);
        const fetchApi = async () => {
            const result = await fetch(`https://provinces.open-api.vn/api/d/${results.code}?depth=2`)
                .then((response) => response.json())
                .then((data) => data);
            setWards(result.wards);
        };
        fetchApi();
    };

    const [sumPriceProduct, setSumPriceProduct] = useState(0);
    const [priceDeliveryProduct, setPriceDeliveryProduct] = useState(0);
    const [product, setProduct] = useState(JSON.parse(localStorage.getItem('Món ăn')));
    useEffect(() => {
        if (localStorage.getItem('roll') == 4) {
            setSumPriceProduct(() => {
                var sum = 0;
                product.map((value, index) => {
                    sum += value.gia * value.sl;
                    return value;
                });
                return sum;
            });
        }
    }, []);
    const [DonHang, setDonHang] = useState({
        makh: '',
        products: '',
        tinh: '',
        huyen: '',
        xa: '',
        hinhthuc: '',
        tong: sumPriceProduct,
        phi: priceDeliveryProduct,
    });
    const setInputDonHang = (e) => {
        const { name, value } = e.target;
        if (DonHang.products.length === 0) {
            setDonHang((pre) => ({
                ...pre,
                products: product,
                tong: sumPriceProduct,
                phi: priceDeliveryProduct,
                makh: localStorage.getItem('ma'),
            }));
        }
        if (name === 'tinh') {
            setDonHang((pre) => ({ ...pre, tinh: value }));
            setPriceDeliveryProduct(0);
            setDonHang((pre) => ({
                ...pre,
                phi: 0,
            }));
        } else if (name === 'huyen') {
            setDonHang((pre) => ({ ...pre, huyen: value }));
            setPriceDeliveryProduct(0);
            setDonHang((pre) => ({
                ...pre,
                phi: 0,
            }));
        } else if (name === 'xa') {
            setDonHang((pre) => ({ ...pre, xa: value }));
            const price = Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000;
            setPriceDeliveryProduct(price);
            setDonHang((pre) => ({
                ...pre,
                phi: price,
            }));
        } else if (name === 'Hình thức thanh toán') {
            setDonHang((pre) => ({ ...pre, hinhthuc: value }));
        }
    };

    const OrderIntoDB = () => {
        if (DonHang.hinhthuc === '' || DonHang.huyen === '' || DonHang.xa === '' || DonHang.tinh === '')
            alert('Vui lòng điền đủ thông tin');
        else
            fetch('https://me-food-api.onrender.com/checkout/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(DonHang),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                });
    };

    return (
        <>
            {localStorage.getItem('roll') == 4 && (
                <>
                    <div className={cx('container', 'grid')}>
                        <div className={cx('title')}>
                            <h1>Đặt hàng</h1>
                        </div>
                        <div className={cx('row')}>
                            <div className={cx('content')}>
                                <div className={cx('text-input')}>
                                    <Text className={cx('text')}>Địa chỉ giao</Text>
                                    <select
                                        id="provinces"
                                        name="tinh"
                                        onChange={(e) => {
                                            handleSelectProvinces();
                                            setInputDonHang(e);
                                        }}
                                    >
                                        <option value={''} key={0}>
                                            Thành phố
                                        </option>
                                        {
                                            // eslint-disable-next-line array-callback-return
                                            provinces &&
                                                provinces.map((index) => {
                                                    return (
                                                        <option value={index.name} key={index.code}>
                                                            {index.name}
                                                        </option>
                                                    );
                                                })
                                        }
                                    </select>
                                    <select
                                        id="districts"
                                        name="huyen"
                                        onChange={(e) => {
                                            handleSelectDistricts();
                                            setInputDonHang(e);
                                        }}
                                    >
                                        <option value={''} key={0}>
                                            Quận/Huyện
                                        </option>
                                        {
                                            // eslint-disable-next-line array-callback-return
                                            districts &&
                                                districts.map((index) => {
                                                    return (
                                                        <option value={index.name} key={index.code}>
                                                            {index.name}
                                                        </option>
                                                    );
                                                })
                                        }
                                    </select>
                                    <select id="wards" name="xa" onChange={setInputDonHang}>
                                        <option value={''} key={0}>
                                            Phường/Xã
                                        </option>
                                        {
                                            // eslint-disable-next-line array-callback-return
                                            wards &&
                                                wards &&
                                                wards.map((index) => {
                                                    return (
                                                        <option value={index.name} key={index.code}>
                                                            {index.name}
                                                        </option>
                                                    );
                                                })
                                        }
                                    </select>
                                </div>
                                <div className={cx('text-input')}>
                                    <Text className={cx('text')}>Hình thức thanh toán</Text>
                                    <select name="Hình thức thanh toán" onChange={setInputDonHang}>
                                        <option value={''} key={0}>
                                            Hình thức thanh toán
                                        </option>
                                        <option value={'Tiền mặt'} key={1}>
                                            Tiền mặt
                                        </option>
                                        <option value={'Chuyển khoản'} key={2}>
                                            Chuyển khoản
                                        </option>
                                    </select>
                                </div>
                                <div className={cx('text-input')}>
                                    <Text className={cx('text')}>Phí vận chuyển: {priceDeliveryProduct}</Text>
                                </div>
                            </div>
                            <div className={cx('content')}>
                                {product &&
                                    Object.keys(product).map(function (key) {
                                        return (
                                            <div className={cx('product', 'row')}>
                                                <Text className={cx('name')}>{`${parseInt(key) + 1}. ${
                                                    product[key].ten
                                                }`}</Text>
                                                <div className={cx('row')}>
                                                    <Text className={cx('price')}>{product[key].sl}</Text>
                                                    <Text className={cx('x')}>x</Text>
                                                    <Text className={cx('amount')}>{format(product[key].gia)} </Text>
                                                </div>
                                            </div>
                                        );
                                    })}
                                <div className={cx('row', 'sum')}>
                                    <Text className={cx('name')}>Tổng</Text>
                                    <Text className={cx('name', 'price')}>{format(sumPriceProduct+priceDeliveryProduct)}</Text>
                                </div>
                            </div>
                        </div>
                        <div className={cx('btn-submit')}>
                            <Button className={cx('btn')} onClick={()=>{
                                OrderIntoDB()
                                alert("Thành công")
                                window.open("/",'_self')
                            }}>
                                Đặt hàng
                            </Button>
                        </div>
                    </div>
                </>
            )}
            {!(localStorage.getItem('roll') == 4) && <ErrorPage />}
        </>
    );
}

export default CheckOut;
