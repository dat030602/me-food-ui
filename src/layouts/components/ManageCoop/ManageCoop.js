import { useEffect, useRef, useState } from 'react';
import styles from './ManageCoop.module.scss';

import classNames from 'classnames/bind';
import ErrorPage from '../ErrorPage';
import EmptyPage from '../EmptyPage';

const cx = classNames.bind(styles);

function ManageCoop() {
    const refLink = useRef([]);

    function format(n) {
        if (n != undefined)
            return n.toFixed(0).replace(/./g, function (c, i, a) {
                return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? '.' + c : c;
            });
    }
    function convertDate(day) {
        if (typeof day == 'string') {
            var date = day.slice(0, 10);
            date = date.split('-');
            return `${date[2]}/${date[1]}/${date[0]}`;
        }
        return day;
    }

    const [data1, setData1] = useState({});
    const [data2, setData2] = useState({});
    const [data3, setData3] = useState({});
    const [data4, setData4] = useState({});
    const [data5, setData5] = useState({});
    const [data6, setData6] = useState({});

    useEffect(() => {
        if (localStorage.getItem('roll') == 1)
            fetch(`https://me-food-api.onrender.com/manage-coop/get1`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 0,
                }),
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
        fetch(`https://me-food-api.onrender.com/manage-coop/get${index + 1}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: 0,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (index === 0) setData1(data);
                else if (index === 1) setData2(data);
                else if (index === 2) setData3(data);
                else if (index === 3) setData4(data);
                else if (index === 4) setData5(data);
                else setData6(data);
                console.log(data);
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
            {localStorage.getItem('roll') == 1 && (
                <>
                    <div className={cx('container', 'grid', 'link-block')}>
                        <div className={cx('link')} onClick={() => handleOnClickLink(0)}>
                            Danh sách hợp đồng của đối tác
                        </div>
                        <div onClick={() => handleOnClickLink(1)}>Thống kê lượng khách hàng</div>
                        <div onClick={() => handleOnClickLink(2)}>Thống kê số lượng đơn hàng, doanh thu</div>
                        <div onClick={() => handleOnClickLink(3)}>Thống kê số lượng đơn hàng, hoa hồng</div>
                        <div onClick={() => handleOnClickLink(4)}>Thống kê tổng hoa hồng</div>
                        <div onClick={() => handleOnClickLink(5)}>Danh sách đại lý bị report không tốt</div>
                    </div>
                    <div className={cx('container', 'grid')} ref={pushRefLink}>
                        <div className={cx('title')}>
                            <h1>Danh sách hợp đồng</h1>
                        </div>
                        {data1 !== undefined && data1.length !== 0 && (
                            <div className={cx('content')}>
                                <div className={cx('content-wrapper')}>
                                    <table>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên đối tác</th>
                                            <th>Số lượng đơn hàng</th>
                                            <th>Doanh thu</th>
                                            <th>Hoa hồng</th>
                                            <th>Thời hạn</th>
                                        </tr>
                                        {data1 !== undefined &&
                                            Object.keys(data1).map(function (key) {
                                                return (
                                                    <tr key={key} value={data1[key]}>
                                                        <td>{parseInt(key) + 1}</td>
                                                        <td>{data1[key].TenDoiTac}</td>
                                                        <td>{format(data1[key].slcn)}</td>
                                                        <td>{format(data1[key].doanhso)}</td>
                                                        <td>{format(data1[key].hoahong)}</td>
                                                        <td>{convertDate(data1[key].NgayHetHan)}</td>
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
                            <h1>Thống kê lượng khách hàng</h1>
                            <select
                                onChange={(e) => {
                                    fetch(`https://me-food-api.onrender.com/manage-coop/get2`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Accept: 'application/json',
                                        },
                                        body: JSON.stringify({
                                            status: e.target.value,
                                        }),
                                    })
                                        .then((res) => {
                                            return res.json();
                                        })
                                        .then((data) => {
                                            setData2(data);
                                        });
                                }}
                            >
                                <option value={0}>Theo năm</option>
                                <option value={1}>Theo tháng</option>
                                <option value={2}>Theo ngày</option>
                            </select>
                        </div>
                        {data2 !== undefined && data2.length !== 0 && (
                            <div className={cx('content')}>
                                <div className={cx('content-wrapper')}>
                                    <table>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Mã đối tác</th>
                                            <th>Tên đối tác</th>
                                            <th>Số lượng khách hàng</th>
                                        </tr>
                                        {data2 !== undefined &&
                                            Object.keys(data2).map(function (key) {
                                                return (
                                                    <tr key={key} value={data2[key]}>
                                                        <td>{parseInt(key) + 1}</td>
                                                        <td>{convertDate(data2[key].NgayGiaoHang)}</td>
                                                        <td>{data2[key].MaDoiTac}</td>
                                                        <td>{data2[key].TenDoiTac}</td>
                                                        <td>{format(data2[key].slkh)}</td>
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
                            <h1>Thống kê số lượng đơn hàng, doanh thu</h1>
                        </div>
                        {data3 !== undefined && data3.length !== 0 && (
                            <div className={cx('content')}>
                                <div className={cx('content-wrapper')}>
                                    <table>
                                        <tr>
                                            <th>STT</th>
                                            <th>Mã đối tác</th>
                                            <th>Tên đối tác</th>
                                            <th>Số lượng đơn hàng</th>
                                            <th>Doanh thu</th>
                                        </tr>
                                        {data3 !== undefined &&
                                            Object.keys(data3).map(function (key) {
                                                return (
                                                    <tr key={key} value={data3[key]}>
                                                        <td>{parseInt(key) + 1}</td>
                                                        <td>{data3[key].MaDoiTac}</td>
                                                        <td>{data3[key].TenDoiTac}</td>
                                                        <td>{format(data3[key].sldh)}</td>
                                                        <td>{format(data3[key].doanhso)}</td>
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
                            <h1>Thống kê số lượng đơn hàng, hoa hồng</h1>
                        </div>
                        {data4 !== undefined && data4.length !== 0 && (
                            <div className={cx('content')}>
                                <div className={cx('content-wrapper')}>
                                    <table>
                                        <tr>
                                            <th>STT</th>
                                            <th>Mã đối tác</th>
                                            <th>Tên đối tác</th>
                                            <th>Số lượng đơn hàng</th>
                                            <th>Hoa hồng</th>
                                        </tr>
                                        {data4 !== undefined &&
                                            Object.keys(data4).map(function (key) {
                                                return (
                                                    <tr key={key} value={data4[key]}>
                                                        <td>{parseInt(key) + 1}</td>
                                                        <td>{data4[key].MaDoiTac}</td>
                                                        <td>{data4[key].TenDoiTac}</td>
                                                        <td>{format(data4[key].sldh)}</td>
                                                        <td>{format(data4[key].doanhso)}</td>
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
                            <h1>Thống kê tổng hoa hồng</h1>
                            <select
                                onChange={(e) => {
                                    fetch(`https://me-food-api.onrender.com/manage-coop/get5`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Accept: 'application/json',
                                        },
                                        body: JSON.stringify({
                                            status: e.target.value,
                                        }),
                                    })
                                        .then((res) => {
                                            return res.json();
                                        })
                                        .then((data) => {
                                            setData5(data);
                                        });
                                }}
                            >
                                <option value={0}>Theo năm</option>
                                <option value={1}>Theo tháng</option>
                                <option value={2}>Theo ngày</option>
                            </select>
                        </div>
                        {data5 !== undefined && data5.length !== 0 && (
                            <div className={cx('content')}>
                                <div className={cx('content-wrapper')}>
                                    <table>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Tổng hoa hồng</th>
                                        </tr>
                                        {data5 !== undefined &&
                                            Object.keys(data5).map(function (key) {
                                                return (
                                                    <tr key={key} value={data5[key]}>
                                                        <td>{parseInt(key) + 1}</td>
                                                        <td>
                                                            {data5[key].Ngay !== undefined && `${data5[key].Ngay}/`}
                                                            {data5[key].Thang !== undefined && `${data5[key].Thang}/`}
                                                            {data5[key].Nam !== undefined && data5[key].Nam}
                                                        </td>
                                                        <td>{format(data5[key].TongHoaDon)}</td>
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
                            <h1>Danh sách đại lý bị report không tốt</h1>
                        </div>
                        {data6 !== undefined && data6.length !== 0 && (
                            <div className={cx('content')}>
                                <div className={cx('content-wrapper')}>
                                    <table>
                                        <tr>
                                            <th>STT</th>
                                            <th>Mã đối tác</th>
                                            <th>Tên đối tác</th>
                                            <th>Rating</th>
                                        </tr>
                                        {data6 !== undefined &&
                                            Object.keys(data6).map(function (key) {
                                                return (
                                                    <tr key={key} value={data6[key]}>
                                                        <td>{parseInt(key) + 1}</td>
                                                        <td>{data6[key].MaDoiTac}</td>
                                                        <td>{data6[key].TenDoiTac}</td>
                                                        <td>{format(data6[key].Rating)}</td>
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
                        (data3 !== undefined && data3.length === 0 && <EmptyPage />) ||
                        (data4 !== undefined && data4.length === 0 && <EmptyPage />) ||
                        (data5 !== undefined && data5.length === 0 && <EmptyPage />) ||
                        (data6 !== undefined && data6.length === 0 && <EmptyPage />)}
                </>
            )}
            {!(localStorage.getItem('roll') == 1) && <ErrorPage />}
        </>
    );
}

export default ManageCoop;
