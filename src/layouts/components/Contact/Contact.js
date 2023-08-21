import styles from './Contact.module.scss';

import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Text from '~/components/Text';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ErrorPage from '../ErrorPage';

const cx = classNames.bind(styles);

function Contact() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [dayStart, setDayStart] = useState();
    const [dayEnd, setDayEnd] = useState();
    const [testTransaction, setTestTransaction] = useState(true);

    const refInput = useRef();

    function convertDate(day) {
        var date = day.slice(0, 10);
        date = date.split('-');
        return date;
    }

    useEffect(() => {
        if (localStorage.getItem('roll') == 1 || localStorage.getItem('roll') == 3) {
            const abortController = new AbortController();
            fetch(`https://me-food-api.onrender.com/contact/getBranch/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: abortController.signal,
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                });

            return () => {
                abortController.abort();
            };
        }
    }, [id]);
    useEffect(() => {
        if (data !== undefined) {
            setDayEnd(convertDate(data[0].NgayHetHan));
            setDayStart(convertDate(data[0].NgayKichHoat));
        }
    }, [data]);

    const handleOnClickReset = () => {
        if (testTransaction)
            fetch(`https://me-food-api.onrender.com/contact/getDateline/${data[0].MaHopDong}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setDayEnd(convertDate(data.output.NGAYHETHAN));
                    alert('Successful');
                });
        else
            fetch(`https://me-food-api.onrender.com/contact/getDatelineFix/${data[0].MaHopDong}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setDayEnd(convertDate(data.output.NGAYHETHAN));
                    alert('Successful');
                });
    };
    const [deadline, setDeadline] = useState();
    useEffect(() => {
        if (dayEnd !== undefined) {
            setDeadline(`${dayEnd[0]}-${dayEnd[1]}-${dayEnd[2]}`);
            console.log('called');
        }
    }, [dayEnd]);
    const handleOnClickUpdate = () => {
        fetch(`https://me-food-api.onrender.com/contact/updateDateline/${data[0].MaHopDong}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: refInput.current.value }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.returnValue === 0) {
                    fetch(`https://me-food-api.onrender.com/contact/getBranch/${id}`, {
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
                            setDayEnd(convertDate(data[0].NgayHetHan));
                            setDayStart(convertDate(data[0].NgayKichHoat));
                        });
                    alert('Gia hạn thành công');
                }
                if (data.returnValue === 1) alert('Gia hạn thất bại');
            });
    };

    return (
        <>
            {(localStorage.getItem('roll') == 1 || localStorage.getItem('roll') == 3) && (
                <>
                    <div className={cx('container', 'grid')}>
                        <div className={cx('title')}>
                            <h1>Hợp đồng</h1>
                            <div className={cx('transaction-test')}>
                                <div className={cx('input-tran')}>
                                    <input
                                        type="radio"
                                        name="test-tran"
                                        for="no-fix"
                                        id="no-fix"
                                        onClick={(e) => {
                                            setTestTransaction(true);
                                        }}
                                    />
                                    <label for="no-fix">No Fix</label>
                                </div>
                                <div className={cx('input-tran')}>
                                    <input
                                        type="radio"
                                        name="test-tran"
                                        id="fix"
                                        for="fix"
                                        onClick={(e) => {
                                            setTestTransaction(false);
                                        }}
                                    />
                                    <label for="fix">Fix</label>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('cover')}>
                                <div className={cx('box')}>
                                    <div className={cx('box-cover')}>
                                        <Text className={cx('text')}>Mã hợp đồng</Text>
                                        {data !== undefined && data[0].MaHopDong}
                                    </div>
                                </div>
                                <div className={cx('box')}>
                                    <div className={cx('box-cover')}>
                                        <Text className={cx('text')}>Mã số thuế</Text>{' '}
                                        {data !== undefined && data[0].MaSoThue}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('cover')}>
                                <div className={cx('box')}>
                                    <div className={cx('box-cover')}>
                                        <Text className={cx('text')}>Người đại diện</Text>
                                        {data !== undefined && data[0].NguoiDaiDien}
                                    </div>
                                </div>
                                <div className={cx('box')}>
                                    <div className={cx('box-cover')}>
                                        <Text className={cx('text')}>Số chi nhánh đăng ký</Text>
                                        {data !== undefined && data[0].SoLuongChiNhanh}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('cover')}>
                                <div className={cx('box')}>
                                    <div className={cx('box-cover')}>
                                        <Text className={cx('text')}>Ngày lập hợp đồng</Text>
                                        {dayStart !== undefined && `${dayStart[2]}/${dayStart[1]}/${dayStart[0]}`}
                                    </div>
                                </div>
                                <div className={cx('box')}>
                                    <div className={cx('box-cover')}>
                                        <Text className={cx('text')}>Ngày hết hợp đồng</Text>
                                        <input
                                            type="date"
                                            value={deadline !== undefined && deadline}
                                            onChange={(e) => {
                                                setDeadline(e.target.value);
                                            }}
                                            ref={refInput}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('cover')}>
                                <div className={cx('box')}>
                                    <div className={cx('box-cover')}>
                                        <Text className={cx('text')}>Địa chỉ</Text>
                                        {data !== undefined && data[0].Diachikinhdoanh}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('cover')}>
                                <div className={cx('box')}>
                                    <div className={cx('box-cover')}>
                                        <Text className={cx('text')}>Số tài khoản</Text>
                                        {data !== undefined && data[0].STKNganHang}
                                    </div>
                                </div>
                                <div className={cx('box')}>
                                    <div className={cx('box-cover')}>
                                        <Text className={cx('text')}>Ngân hàng</Text>{' '}
                                        {data !== undefined && data[0].NganHang}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('btn-submit')}>
                            {localStorage.getItem('roll') == 1 && (
                                <Button
                                    className={cx('btn')}
                                    style={{ backgroundColor: 'red' }}
                                    onClick={() => {
                                        fetch(`https://me-food-api.onrender.com/contact/deleteContract/${data[0].MaHopDong}`, {
                                            method: 'DELETE',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                Accept: 'application/json',
                                            },
                                        })
                                            .then((res) => {
                                                return res.json();
                                            })
                                            .then((data) => {
                                                alert('Thành công')
                                                window.location.href='/list-coop'
                                            });
                                    }}
                                >
                                    Hủy
                                </Button>
                            )}
                            <Button className={cx('btn')} onClick={handleOnClickReset}>
                                Tải lại dữ liệu
                            </Button>
                            {localStorage.getItem('roll') == 1 && (
                                <Button className={cx('btn')} onClick={handleOnClickUpdate}>
                                    Gia hạn
                                </Button>
                            )}
                            {localStorage.getItem('roll') == 1 && (
                                <Button
                                    className={cx('btn')}
                                    onClick={() => {
                                        fetch('https://me-food-api.onrender.com/contact/submit', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                Accept: 'application/json',
                                            },
                                            body: JSON.stringify({
                                                nv: localStorage.getItem('ma'),
                                                hd: data[0].MaHopDong,
                                            }),
                                        })
                                            .then((res) => {
                                                return res.json();
                                            })
                                            .then((data) => {
                                                console.log(data);
                                            });
                                    }}
                                >
                                    Xác nhận
                                </Button>
                            )}
                        </div>
                    </div>
                </>
            )}
            {!(localStorage.getItem('roll') != 1 || localStorage.getItem('roll') != 3) && <ErrorPage />}
        </>
    );
}

export default Contact;
