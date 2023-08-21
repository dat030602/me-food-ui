import styles from './ManageDriver.module.scss';

import classNames from 'classnames/bind';
import images from '~/assets/images';
import Text from '~/components/Text';
import { useEffect, useState } from 'react';
import ErrorPage from '../ErrorPage';
import EmptyPage from '../EmptyPage';

const cx = classNames.bind(styles);

function ManageDriver() {
    function format(n) {
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? '.' + c : c;
        });
    }
    const [data, setData] = useState();
    const [keyIndex, setKeyIndex] = useState(-1);
    useEffect(() => {
        if (localStorage.getItem('roll') == 2)
            fetch('https://me-food-api.onrender.com//manage-driver/getDonHang', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                });
    }, []);

    const [name, setName] = useState();
    const [listMonAn, setListMonAn] = useState();
    const hanldeOnClickDetail = (pdh) => {
        fetch('https://me-food-api.onrender.com//manage-driver/getTenKH', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ pdh: pdh }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setName(data);
            });
        fetch('https://me-food-api.onrender.com//manage-driver/getDetail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ pdh: pdh }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setListMonAn(data);
            });
    };
    return (
        <>
            {localStorage.getItem('roll') == 2 && (
                <>
                    <div className={cx('container', 'grid')}>
                        <div className={cx('title')}>
                            <h1>Đơn hàng</h1>
                        </div>
                        {data !== undefined && data.length !== 0 && (
                            <div className={cx('content')}>
                                <div className={cx('content-wrapper')}>
                                    <table>
                                        <tr>
                                            <th>STT</th>
                                            <th>Mã đơn hàng</th>
                                            <th>Địa chỉ nhận</th>
                                            <th>Địa chỉ giao</th>
                                            <th>Thành tiền</th>
                                            <th>Chi tiết</th>
                                            <th>Xác nhận</th>
                                        </tr>
                                        {data &&
                                            Object.keys(data).map(function (key) {
                                                return (
                                                    <>
                                                        <tr key={key}>
                                                            <td>{parseInt(key) + 1}</td>
                                                            <td>{data[key].MaPhieuDatHang}</td>
                                                            <td>
                                                                {data[key].xa1}, {data[key].huyen1}, {data[key].tinh1}
                                                            </td>
                                                            <td>
                                                                {data[key].xa2}, {data[key].huyen2}, {data[key].tinh2}
                                                            </td>
                                                            <td>{format(data[key].TongHoaDon)}</td>
                                                            <td
                                                                className={cx('more')}
                                                                data-toggle="modal"
                                                                data-target="#more"
                                                                onClick={() => {
                                                                    hanldeOnClickDetail(data[key].MaPhieuDatHang);
                                                                    setKeyIndex(parseInt(key));
                                                                }}
                                                            >
                                                                Chi tiết
                                                            </td>
                                                            <td
                                                                className={cx('submit')}
                                                                onClick={() => {
                                                                    fetch(
                                                                        'https://me-food-api.onrender.com//manage-driver/submitDriver',
                                                                        {
                                                                            method: 'POST',
                                                                            headers: {
                                                                                'Content-Type': 'application/json',
                                                                                Accept: 'application/json',
                                                                            },
                                                                            body: JSON.stringify({
                                                                                ma: `${localStorage.getItem('ma')}`,
                                                                                pdh: `${data[key].MaPhieuDatHang}`,
                                                                            }),
                                                                        },
                                                                    )
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
                                                        </tr>
                                                    </>
                                                );
                                            })}
                                    </table>
                                </div>
                            </div>
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
                                                {data && keyIndex !== -1 && `${data[keyIndex].MaPhieuDatHang}`}
                                            </Text>
                                            <Text>
                                                <strong>Chi nhánh: </strong>
                                                {name && name[0].TenChiNhanh}
                                            </Text>
                                            <Text>
                                                <strong>Địa chỉ chi nhánh: </strong>
                                                {data &&
                                                    keyIndex !== -1 &&
                                                    `${data[keyIndex].xa1}, ${data[keyIndex].huyen1}, ${data[keyIndex].tinh1}`}
                                            </Text>
                                            <Text>
                                                <strong>Tên khách hàng: </strong>
                                                {name && name[0].TenKhachHang}
                                            </Text>
                                            <Text>
                                                <strong>Địa chỉ: </strong>
                                                {data &&
                                                    keyIndex !== -1 &&
                                                    `${data[keyIndex].xa2}, ${data[keyIndex].huyen2}, ${data[keyIndex].tinh2}`}
                                            </Text>
                                        </div>
                                        <div className={cx('separate')}></div>
                                        <div className={cx('item-modal')}>
                                            <Text>
                                                <strong>Món được đặt:</strong>
                                            </Text>
                                            {listMonAn &&
                                                Object.keys(listMonAn).map(function (key) {
                                                    return (
                                                        <div key={key} className={cx('dish')}>
                                                            <Text className={cx('name-dish')}>
                                                                {listMonAn[key].TenMonAn}
                                                            </Text>
                                                            <Text className={cx('price-dish')}>
                                                                {listMonAn[key].SoLuongMonAn} x{' '}
                                                                {format(parseInt(listMonAn[key].Gia))}
                                                            </Text>
                                                        </div>
                                                    );
                                                })}

                                            <div className={cx('dish')}>
                                                <Text className={cx('name-dish')}>
                                                    <strong>Tổng tiền</strong>
                                                </Text>
                                                <Text className={cx('price-dish')}>
                                                    {data &&
                                                        keyIndex !== -1 &&
                                                        format(parseInt(data[keyIndex].TongHoaDon))}
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
                        </div>
                    )}
                </>
            )}
            {localStorage.getItem('roll') != 2 && <ErrorPage />}
        </>
    );
}

export default ManageDriver;
