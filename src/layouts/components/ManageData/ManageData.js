import { useEffect, useRef, useState } from 'react';
import styles from './ManageData.module.scss';

import classNames from 'classnames/bind';
import ErrorPage from '../ErrorPage';
import EmptyPage from '../EmptyPage';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ManageData() {
    const refLink = useRef([]);

    function format(n) {
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? '.' + c : c;
        });
    }
    function convertDate(day) {
        if (typeof day != 'number') {
            var date = day.slice(0, 10);
            date = date.split('-');
            return `${date[2]}/${date[1]}/${date[0]}`;
        }
        return day;
    }

    const [data1, setData1] = useState({});
    const [data2, setData2] = useState({});
    const [data3, setData3] = useState({});


    useEffect(() => {
        if (localStorage.getItem('roll') == 1)
            fetch(`https://me-food-api.onrender.com//manage-data/get1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => setData1(data));
    }, []);

    const handleOnClickLink = (index) => {
        var linkBlock = document.querySelectorAll('.' + cx('link-block') + '>div');
        for (let indexSub = 0; indexSub < linkBlock.length; indexSub++) {
            const element = linkBlock[indexSub];
            if (indexSub === index) element.classList.add(cx('link'));
            else element.classList.remove(cx('link'));
        }
        // eslint-disable-next-line array-callback-return
        refLink.current.map((value, indexSub) => {
            if (indexSub === index) refLink.current[indexSub].style.display = 'block';
            else refLink.current[indexSub].style.display = 'none';
        });
        fetch(`https://me-food-api.onrender.com//manage-data/get${index + 1}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ ma: localStorage.getItem('ma'), status: 0 }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (index === 0) setData1(data);
                else if (index === 1) setData2(data);
                else if (index === 2) setData3(data);
            });
    };
    const handleOnChangeSort = (e) => {
        fetch(`https://me-food-api.onrender.com//manage-data/get2`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ ma: localStorage.getItem('ma'), status: e.target.value }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setData2(data);
            });
    };
    // eslint-disable-next-line no-const-assign
    refLink.current = [];
    const pushRefLink = (el) => {
        if (el && !refLink.current.includes(el)) {
            refLink.current.push(el);
        }
    };

    return (
        <>
            {localStorage.getItem('roll') == 3 && (
                <>
                    <div className={cx('container', 'grid', 'link-block')}>
                        <div className={cx('link')} onClick={() => handleOnClickLink(0)}>
                            Thống kê số lượng đơn hàng
                        </div>
                        <div onClick={() => handleOnClickLink(1)}>Xu hướng bán ra</div>
                        <div onClick={() => handleOnClickLink(2)}>Tổng doanh thu</div>
                    </div>
                    <div className={cx('container', 'grid')} ref={pushRefLink}>
                        <div className={cx('title')}>
                            <h1>Thống kê số lượng đơn hàng</h1>
                            <select
                                onChange={(e) => {
                                    fetch(`https://me-food-api.onrender.com//manage-data/get1`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Accept: 'application/json',
                                        },
                                        body: JSON.stringify({
                                            ma: localStorage.getItem('ma'),
                                            status: e.target.value,
                                        }),
                                    })
                                        .then((res) => {
                                            return res.json();
                                        })
                                        .then((data) => {
                                            setData1(data);
                                        });
                                }}
                            >
                                <option value={0}>Tất cả</option>
                                <option value={1}>Theo năm</option>
                                <option value={2}>Theo tháng</option>
                                <option value={3}>Theo ngày</option>
                            </select>
                        </div>
                        {data1 !== undefined && data1.length !== 0 && (
                            <div className={cx('content')}>
                                <div className={cx('content-wrapper')}>
                                    <table>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Số lượng đơn hàng</th>
                                        </tr>
                                        {data1 !== undefined &&
                                            Object.keys(data1).map(function (key) {
                                                return (
                                                    <tr key={key} value={data1[key]}>
                                                        <td>{parseInt(key) + 1}</td>
                                                        <td>{convertDate(data1[key].NgayGiaoHang)}</td>
                                                        <td>{format(data1[key].SoLuongDonHang)}</td>
                                                    </tr>
                                                );
                                            })}
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={cx('container', 'grid')} ref={pushRefLink}>
                        <div className={cx('title')}>
                            <h1>Xu hướng bán ra</h1>
                        </div>
                        {data2 !== undefined && data2.length !== 0 && (
                            <div className={cx('content')}>
                                <div className={cx('content-wrapper')}>
                                    <table>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên món ăn</th>
                                            <th>
                                                Số lượng bán ra
                                                <select onChange={(e) => handleOnChangeSort(e)}>
                                                    <option value={0}>Lớn nhất</option>
                                                    <option value={1}>Nhỏ nhất</option>
                                                </select>
                                            </th>
                                        </tr>
                                        {data2 !== undefined &&
                                            Object.keys(data2).map(function (key) {
                                                return (
                                                    <tr key={key} value={data2[key]}>
                                                        <td>{parseInt(key) + 1}</td>
                                                        <td>{data2[key].TenMonAn!==null &&data2[key].TenMonAn}</td>
                                                        <td>{data2[key].SoLuong!==null &&format(data2[key].SoLuong)}</td>
                                                    </tr>
                                                );
                                            })}
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={cx('container', 'grid')} ref={pushRefLink}>
                        <div className={cx('title')}>
                            <h1>Tổng doanh thu</h1>
                            <select
                                onChange={(e) => {
                                    fetch(`https://me-food-api.onrender.com//manage-data/get3`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Accept: 'application/json',
                                        },
                                        body: JSON.stringify({
                                            ma: localStorage.getItem('ma'),
                                            status: e.target.value,
                                        }),
                                    })
                                        .then((res) => {
                                            return res.json();
                                        })
                                        .then((data) => {
                                            setData3(data);
                                        });
                                }}
                            >
                                <option value={0}>Tất cả</option>
                                <option value={1}>Theo năm</option>
                                <option value={2}>Theo tháng</option>
                                <option value={3}>Theo ngày</option>
                            </select>
                        </div>
                        {data3 !== undefined && data3.length !== 0 && (
                            <div className={cx('content')}>
                                <div className={cx('content-wrapper')}>
                                    <table>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Doanh thu</th>
                                        </tr>
                                        {data3 !== undefined &&
                                            Object.keys(data3).map(function (key) {
                                                return (
                                                    <tr key={key} value={data3[key]}>
                                                        <td>{parseInt(key) + 1}</td>
                                                        <td>{convertDate(data3[key].NgayGiaoHang)}</td>
                                                        <td>{format(data3[key].TongHoaDon)}</td>
                                                    </tr>
                                                );
                                            })}
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {(data1 !== undefined && data1.length === 0 && <EmptyPage />) ||
                        (data2 !== undefined && data2.length === 0 && <EmptyPage />) ||
                        (data3 !== undefined && data3.length === 0 && <EmptyPage />)}
                </>
            )}
            {!(localStorage.getItem('roll') == 3) && <ErrorPage />}
        </>
    );
}

export default ManageData;
