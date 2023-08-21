import styles from './ListCoop.module.scss';

import classNames from 'classnames/bind';
import images from '~/assets/images';
import Button from '~/components/Button';
import Text from '~/components/Text';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorPage from '../ErrorPage';

const cx = classNames.bind(styles);

function ListCoop() {
    const [data, setData] = useState();
    function convertDate(day) {
        var date = day.slice(0, 10);
        date = date.split('-');
        return date;
    }

    useEffect(() => {
        if (localStorage.getItem('roll') == 1)
            fetch(`https://me-food-api.onrender.com/list-coop/getNotNull`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => setData(data));
    }, []);

    return (
        <>
            {localStorage.getItem('roll') == 1 && (
                <>
                    <div className={cx('container', 'grid')}>
                        <div className={cx('title')}>
                            <h1>Quản lý đối tác</h1>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('content-wrapper')}>
                                <div>
                                    <input
                                        id="choice1"
                                        type="radio"
                                        name="select"
                                        onClick={() => {
                                            fetch(`https://me-food-api.onrender.com/list-coop/getNull`, {
                                                method: 'GET',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                            })
                                                .then((res) => {
                                                    return res.json();
                                                })
                                                .then((data) => setData(data));
                                        }}
                                    />
                                    <label for="choice1">Chưa ký hợp đồng</label>
                                </div>
                                <div>
                                    <input
                                        id="choice2"
                                        type="radio"
                                        name="select"
                                        onClick={() => {
                                            fetch(`https://me-food-api.onrender.com/list-coop/getNotNull`, {
                                                method: 'GET',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                            })
                                                .then((res) => {
                                                    return res.json();
                                                })
                                                .then((data) => setData(data));
                                        }}
                                    />
                                    <label for="choice2">Đã ký hợp đồng</label>
                                </div>
                                <div>
                                    <input
                                        id="choice3"
                                        type="radio"
                                        name="select"
                                        onClick={() => {
                                            fetch(`https://me-food-api.onrender.com/list-coop/getDeadline`, {
                                                method: 'GET',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                            })
                                                .then((res) => {
                                                    return res.json();
                                                })
                                                .then((data) => setData(data));
                                        }}
                                    />
                                    <label for="choice3">Sắp hết hạn</label>
                                </div>
                            </div>
                            <div className={cx('content-wrapper')}>
                                <table>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã hợp đồng</th>
                                        <th>Mã đối tác</th>
                                        <th>Ngày hết hạn</th>
                                        <th>Chi tiết</th>
                                    </tr>
                                    {data !== undefined &&
                                        Object.keys(data).map(function (key) {
                                            return (
                                                <tr key={key} value={data[key]}>
                                                    <td>{parseInt(key) + 1}</td>
                                                    <td>{data[key].MaHopDong}</td>
                                                    <td>{`${data[key].MaDoiTac}`}</td>
                                                    <td>
                                                        {convertDate(data[key].NgayHetHan)
                                                            .reverse()
                                                            .map((value, index) => {
                                                                if (index === 2) return value;
                                                                return value + '/';
                                                            })}
                                                    </td>
                                                    <td
                                                        className={cx('more')}
                                                        onClick={() =>
                                                            (window.location.href = `/contact/${data[key].MaDoiTac}`)
                                                        }
                                                    >
                                                        Chi tiết
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </table>
                            </div>
                        </div>
                        <div className={cx('btn-submit')}>
                            <Button className={cx('btn')} to="/checkout">
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </>
            )}
            {!(localStorage.getItem('roll') == 1) && <ErrorPage />}
        </>
    );
}

export default ListCoop;
