import styles from './ManageCart.module.scss';

import classNames from 'classnames/bind';
import images from '~/assets/images';
import Button from '~/components/Button';
import Text from '~/components/Text';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorPage from '../ErrorPage';
import EmptyPage from '../EmptyPage';

const cx = classNames.bind(styles);

function ManageCart() {
    function format(n) {
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? '.' + c : c;
        });
    }
    const { id } = useParams();
    const [data, setData] = useState();
    const [dataCustomer, setDataCustomer] = useState();
    const [dataCart, setDataCart] = useState();

    const arrSelection = ['Chờ xử lý', 'Đã xử lý', 'Chờ nhận', 'Đã nhận đơn', 'Đang giao', 'Đã giao'];

    useEffect(() => {
        if (localStorage.getItem('roll') == 3)
            fetch(`https://me-food-api.onrender.com/manage-cart/getCarts/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                });
    }, []);

    const handleOnClick = (slug) => {
        setTimeout(() => {
            fetch(`https://me-food-api.onrender.com/manage-cart/getDetailCart/${slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => setDataCustomer(data));
        }, 100);
        setTimeout(() => {
            fetch(`https://me-food-api.onrender.com/manage-cart/products/${slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => setDataCart(data));
        }, 100);
    };

    return (
        <>
            {localStorage.getItem('roll') == 3 && (
                <>
                    <div className={cx('container', 'grid')}>
                        <div className={cx('title')}>
                            <h1>Quản lý đơn đặt hàng</h1>
                        </div>
                        {data !== undefined && data.length !== 0 && (
                            <>
                                <div className={cx('content')}>
                                    <div className={cx('content-wrapper')}>
                                        <table>
                                            <tr>
                                                <th>STT</th>
                                                <th>Mã đơn hàng</th>
                                                <th>Địa chỉ giao</th>
                                                <th>Thành tiền</th>
                                                <th>Trạng thái</th>
                                                <th>Chi tiết</th>
                                                <th>Xác nhận</th>
                                                <th>Hủy</th>
                                            </tr>

                                            {Object.keys(data).map(function (key) {
                                                return (
                                                    <tr key={key} value={data[key]}>
                                                        <td>{parseInt(key) + 1}</td>
                                                        <td>{data[key].MaPhieuDatHang}</td>
                                                        <td>{`${data[key].dc}`}</td>
                                                        <td>{format(data[key].TongHoaDon)}</td>
                                                        <td>
                                                            <select className={cx('status')} name="Tình trạng đơn hàng">
                                                                {arrSelection.findIndex(
                                                                    (e) => e === data[key].TinhTrangDonHang,
                                                                ) <= 0 && (
                                                                    <option value={'Chờ nhận'} key={2}>
                                                                        Chờ nhận
                                                                    </option>
                                                                )}
                                                                {arrSelection.findIndex(
                                                                    (e) => e === data[key].TinhTrangDonHang,
                                                                ) <= 1 && (
                                                                    <option value={'Đã nhận đơn'} key={3}>
                                                                        Đã nhận đơn
                                                                    </option>
                                                                )}
                                                                {arrSelection.findIndex(
                                                                    (e) => e === data[key].TinhTrangDonHang,
                                                                ) <= 2 && (
                                                                    <option value={'Chờ xử lý'} key={0}>
                                                                        Chờ xử lý
                                                                    </option>
                                                                )}
                                                                {arrSelection.findIndex(
                                                                    (e) => e === data[key].TinhTrangDonHang,
                                                                ) <= 3 && (
                                                                    <option value={'Đã xử lý'} key={1}>
                                                                        Đã xử lý
                                                                    </option>
                                                                )}

                                                                {arrSelection.findIndex(
                                                                    (e) => e === data[key].TinhTrangDonHang,
                                                                ) <= 4 && (
                                                                    <option value={'Đang giao'} key={4}>
                                                                        Đang giao
                                                                    </option>
                                                                )}
                                                                {arrSelection.findIndex(
                                                                    (e) => e === data[key].TinhTrangDonHang,
                                                                ) <= 5 && (
                                                                    <option value={'Đã giao'} key={5}>
                                                                        Đã giao
                                                                    </option>
                                                                )}
                                                            </select>
                                                        </td>
                                                        {/* <td>{data[key].TinhTrangDonHang}</td> */}
                                                        <td
                                                            className={cx('more')}
                                                            data-toggle="modal"
                                                            data-target="#more"
                                                            onClick={() => handleOnClick(data[key].MaPhieuDatHang)}
                                                        >
                                                            Chi tiết
                                                        </td>
                                                        <td
                                                            className={cx('submit')}
                                                            onClick={() => {
                                                                fetch('https://me-food-api.onrender.com/manage-cart/submit', {
                                                                    method: 'POST',
                                                                    headers: {
                                                                        'Content-Type': 'application/json',
                                                                        Accept: 'application/json',
                                                                    },
                                                                    body: JSON.stringify({
                                                                        pdh: `${data[key].MaPhieuDatHang}`,
                                                                        tinhtrang: `${
                                                                            document.querySelectorAll(
                                                                                `.${cx('status')}`,
                                                                            )[key].value
                                                                        }`,
                                                                    }),
                                                                })
                                                                    .then((res) => {
                                                                        return res.json();
                                                                    })
                                                                    .then((data) => {
                                                                        alert('Thành công');
                                                                    });
                                                            }}
                                                        >
                                                            Xác nhận
                                                        </td>
                                                        {data[key].TinhTrangDonHang === 'Chờ xử lý' && (
                                                            <td
                                                                className={cx('submit')}
                                                                onClick={() => {
                                                                    fetch(
                                                                        'https://me-food-api.onrender.com/manage-cart/deleteOrder',
                                                                        {
                                                                            method: 'POST',
                                                                            headers: {
                                                                                'Content-Type': 'application/json',
                                                                                Accept: 'application/json',
                                                                            },
                                                                            body: JSON.stringify({
                                                                                pdh: `${data[key].MaPhieuDatHang}`,
                                                                            }),
                                                                        },
                                                                    )
                                                                        .then((res) => {
                                                                            return res.json();
                                                                        })
                                                                        .then((data) => {
                                                                            alert('Thành công');
                                                                            window.location.reload();
                                                                        });
                                                                }}
                                                            >
                                                                Hủy
                                                            </td>
                                                        )}
                                                    </tr>
                                                );
                                            })}
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    {data !== undefined && data.length === 0 && <EmptyPage />}

                    {data !== undefined && data.length !== 0 && (
                        <div
                            className="modal fade"
                            id="more"
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="exampleModalLongTitle"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content" style={{ overflow: 'hidden' }}>
                                    <div className={cx('content-wrapper-modal')}>
                                        <div className={cx('content')}>
                                            <div className={cx('close')} data-dismiss="modal" aria-label="Close">
                                                <img src={images.close} alt="" />
                                            </div>
                                        </div>
                                        <div className={cx('separate')}></div>
                                        <div className={cx('item-modal')}>
                                            <Text>
                                                <strong>Mã đơn hàng: </strong>
                                                {dataCustomer !== undefined && dataCustomer[0].MaPhieuDatHang}
                                            </Text>
                                            <Text>
                                                <strong>Chi nhánh: </strong>
                                                {dataCustomer !== undefined && dataCustomer[0].TenChiNhanh}
                                            </Text>
                                            <Text>
                                                <strong>Địa chỉ chi nhánh: </strong>
                                                {dataCustomer !== undefined && `${dataCustomer[0].dccn}`}
                                            </Text>
                                            <Text>
                                                <strong>Tên khách hàng: </strong>
                                                {dataCustomer !== undefined && dataCustomer[0].TenKhachHang}
                                            </Text>
                                            <Text>
                                                <strong>Địa chỉ: </strong>
                                                {dataCustomer !== undefined && `${dataCustomer[0].dcgh}`}
                                            </Text>
                                        </div>
                                        <div className={cx('separate')}></div>
                                        <div className={cx('item-modal')}>
                                            <Text>
                                                <strong>Món được đặt:</strong>
                                            </Text>
                                            {dataCart !== undefined &&
                                                Object.keys(dataCart).map(function (key) {
                                                    return (
                                                        <div className={cx('dish')} key={key} value={dataCart[key]}>
                                                            <Text className={cx('name-dish')}>
                                                                {dataCart[key].TenMonAn}
                                                            </Text>
                                                            <Text className={cx('price-dish')}>
                                                                {dataCart[key].SoLuongMonAn}
                                                            </Text>
                                                            <Text className={cx('price-dish')}>x</Text>
                                                            <Text className={cx('price-dish')}>
                                                                {dataCart[key].Gia}
                                                            </Text>
                                                        </div>
                                                    );
                                                })}

                                            <div className={cx('dish')}>
                                                <Text className={cx('name-dish')}>
                                                    <strong>Tổng tiền</strong>
                                                </Text>
                                                <Text className={cx('price-dish')}>
                                                    {dataCustomer !== undefined && dataCustomer[0].TongHoaDon}
                                                </Text>
                                            </div>
                                        </div>
                                        <div className={cx('separate-big')}></div>
                                        <div className={cx('footer')}>
                                            <div className={cx('btn-modal')} data-dismiss="modal" aria-label="Close">
                                                <div> Hoàn thành</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        </div>
                    )}
                </>
            )}
            {!(localStorage.getItem('roll') == 3) && <ErrorPage />}
        </>
    );
}

export default ManageCart;
