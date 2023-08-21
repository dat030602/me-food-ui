import styles from './FollowOrder.module.scss';

import classNames from 'classnames/bind';
import images from '~/assets/images';
import Button from '~/components/Button';
import Text from '~/components/Text';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorPage from '../ErrorPage';

const cx = classNames.bind(styles);

function FollowOrder() {
    const [data, setData] = useState();
    const { id } = useParams();

    function format(n) {
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? '.' + c : c;
        });
    }

    useEffect(() => {
        if (localStorage.getItem('roll') == 4) {
            fetch(`https://me-food-api.onrender.com//follow-order/getDonHang/${id}`, {
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
        }
    }, [id]);

    const [name, setName] = useState();
    const [listMonAn, setListMonAn] = useState();
    const [keyIndex, setKeyIndex] = useState(-1);

    const hanldeOnClickDetail = (pdh) => {
        fetch('https://me-food-api.onrender.com//follow-order/getTenKH', {
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
        fetch('https://me-food-api.onrender.com//follow-order/getDetail', {
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

    const [comment, setComment] = useState(false);
    const [commentContent, setCommentContent] = useState({
        binhluan: '',
        danhgia: 0,
        tenmonan: '',
        mamonan: '',
        ma: localStorage.getItem('ma'),
    });

    return (
        <>
            {localStorage.getItem('roll') == 4 && (
                <>
                    <div className={cx('container', 'grid')}>
                        <div className={cx('title')}>
                            <h1>Theo dõi đơn đặt hàng</h1>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('content-wrapper')}>
                                <table>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã đơn hàng</th>
                                        <th>Thành tiền</th>
                                        <th>Trạng thái</th>
                                        <th>Chi tiết</th>
                                        <th>Hủy đơn hàng</th>
                                    </tr>
                                    {data &&
                                        Object.keys(data).map(function (key) {
                                            return (
                                                <tr key={key}>
                                                    <td>{parseInt(key) + 1}</td>
                                                    <td>{data[key].MaPhieuDatHang}</td>
                                                    <td>{format(data[key].TongHoaDon)}</td>
                                                    <td>{data[key].TinhTrangDonHang}</td>
                                                    <td
                                                        className={cx('more')}
                                                        data-toggle="modal"
                                                        data-target="#more"
                                                        onClick={() => {
                                                            hanldeOnClickDetail(data[key].MaPhieuDatHang);
                                                            setKeyIndex(parseInt(key));
                                                            setCommentContent({
                                                                binhluan: '',
                                                                danhgia: 0,
                                                                tenmonan: '',
                                                                mamonan: '',
                                                                ma: localStorage.getItem('ma'),
                                                            });
                                                            setComment(false);
                                                        }}
                                                    >
                                                        Chi tiết
                                                    </td>
                                                    {data[key].TinhTrangDonHang === 'Chờ nhận' && (
                                                        <td
                                                            className={cx('more')}
                                                            onClick={() => {
                                                                fetch(
                                                                    'https://me-food-api.onrender.com//follow-order/deleteOrder',
                                                                    {
                                                                        method: 'POST',
                                                                        headers: {
                                                                            'Content-Type': 'application/json',
                                                                            Accept: 'application/json',
                                                                        },
                                                                        body: JSON.stringify({
                                                                            pdh: data[key].MaPhieuDatHang,
                                                                        }),
                                                                    },
                                                                )
                                                                    .then((res) => {
                                                                        return res.json();
                                                                    })
                                                                    .then((data) => {
                                                                        console.log(data);
                                                                    });
                                                            }}
                                                        >
                                                            Hủy đơn hàng
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                </table>
                            </div>
                        </div>
                    </div>
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
                                            <strong>Tên khách hàng: </strong>
                                            {name && name[0].TenKhachHang}
                                        </Text>
                                        <Text>
                                            <strong>Địa chỉ: </strong>
                                            {name && `${name[0].dcgh}`}
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
                                                            {listMonAn[key].TenMonAn}{' '}
                                                            <Button
                                                                className={cx('btn')}
                                                                onClick={(e) => {
                                                                    setComment(true);
                                                                    setCommentContent((pre) => ({
                                                                        ...pre,
                                                                        tenmonan: listMonAn[key].TenMonAn,
                                                                        mamonan: listMonAn[key].MaMonAn,
                                                                    }));
                                                                }}
                                                            >
                                                                Bình luận
                                                            </Button>
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
                                                {data && keyIndex !== -1 && format(parseInt(data[keyIndex].TongHoaDon))}
                                            </Text>
                                        </div>
                                    </div>
                                    {comment && (
                                        <>
                                            <div className={cx('separate')}></div>
                                            <div className={cx('comment')}>
                                                <Text className={cx('title-comment')}>
                                                    Bình luận món: {commentContent.tenmonan}
                                                </Text>
                                                <input
                                                    className={cx('input-comment')}
                                                    type="text"
                                                    value={commentContent.binhluan}
                                                    onChange={(e) => {
                                                        if (e.target.value.length <= 100)
                                                            setCommentContent((pre) => ({
                                                                ...pre,
                                                                binhluan: e.target.value,
                                                            }));
                                                    }}
                                                />
                                                <input
                                                    className={cx('input-comment')}
                                                    type="number"
                                                    value={commentContent.danhgia}
                                                    onChange={(e) => {
                                                        if (e.target.value <= 5 && e.target.value >= 0)
                                                            setCommentContent((pre) => ({
                                                                ...pre,
                                                                danhgia: e.target.value,
                                                            }));
                                                    }}
                                                />
                                                <Button
                                                    className="btn btn-primary btn-block mb-4"
                                                    style={{ backgroundColor: 'var(--primary-color)' }}
                                                    onClick={() => {
                                                        fetch('https://me-food-api.onrender.com//follow-order/submit', {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                                Accept: 'application/json',
                                                            },
                                                            body: JSON.stringify(commentContent),
                                                        })
                                                            .then((res) => {
                                                                return res.json();
                                                            })
                                                            .then((data) => {
                                                                setCommentContent({
                                                                    binhluan: '',
                                                                    danhgia: 0,
                                                                    tenmonan: '',
                                                                    mamonan: '',
                                                                    ma: localStorage.getItem('ma'),
                                                                });
                                                                setComment(false);
                                                            });
                                                    }}
                                                >
                                                    Bình luận
                                                </Button>
                                            </div>
                                        </>
                                    )}
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
                </>
            )}
            {!(localStorage.getItem('roll') == 4) && <ErrorPage />}
        </>
    );
}

export default FollowOrder;
