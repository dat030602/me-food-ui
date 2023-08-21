import styles from './Statistics.module.scss';
import classNames from 'classnames/bind';
import Text from '~/components/Text';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorPage from '../ErrorPage';

const cx = classNames.bind(styles);

function Statistics() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [data2, setData2] = useState();

    useEffect(() => {
        fetch(`https://me-food-api.onrender.com/statistics/getOrder/${id}`, {
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
        fetch(`https://me-food-api.onrender.com/statistics/getUnprocessOrder/${id}`, {
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
                setData2(data);
            });
    }, [id]);

    return (
        <>
            {localStorage.getItem('roll') == 3 && (
                <>
                    <div className={cx('container', 'grid')}>
                        <div className={cx('grid')}>
                            <h3 className={cx('title')}>
                                <Text>Các đơn hàng chưa xử lý</Text>
                            </h3>
                        </div>
                        <div className={cx('content-wrapper')}>
                            <table>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã đơn hàng</th>
                                    <th>Mã chi nhánh nhận hàng</th>
                                    <th>Tên chi nhánh</th>
                                </tr>
                                {data2 &&
                                    Object.keys(data2).map(function (key2) {
                                        return (
                                            <tr key2={key2}>
                                                <td>{parseInt(key2) + 1}</td>
                                                <td>{data2[key2].MaPhieuDatHang}</td>
                                                <td>{data2[key2].MaChiNhanh}</td>
                                                <td>{data2[key2].TenChiNhanh}</td>
                                            </tr>
                                        );
                                    })}
                            </table>
                        </div>
                        <br></br>
                        <br></br>
                        <div className={cx('grid')}>
                            <h3 className={cx('title')}>
                                <Text>Thống kê tất cả đơn hàng</Text>
                            </h3>
                        </div>
                        <div className={cx('content-wrapper')}>
                            <table>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã đơn hàng</th>
                                    <th>Mã chi nhánh nhận hàng</th>
                                    <th>Tên chi nhánh</th>
                                    <th>Tình trạng đơn hàng</th>
                                    <th>Tổng hóa đơn</th>
                                </tr>
                                {data &&
                                    Object.keys(data).map(function (key) {
                                        return (
                                            <tr key={key}>
                                                <td>{parseInt(key) + 1}</td>
                                                <td>{data[key].MaPhieuDatHang}</td>
                                                <td>{data[key].MaChiNhanh}</td>
                                                <td>{data[key].TenChiNhanh}</td>
                                                <td>{data[key].TinhTrangDonHang}</td>
                                                <td>{data[key].TongHoaDon}</td>
                                            </tr>
                                        );
                                    })}
                            </table>
                        </div>
                    </div>
                </>
            )}
            {!(localStorage.getItem('roll') == 3) && <ErrorPage />}
        </>
    );
}

export default Statistics;
