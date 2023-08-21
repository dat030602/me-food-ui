import styles from './Branch.module.scss';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import Text from '~/components/Text';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Star from '~/components/Star';
import ErrorPage from '../ErrorPage';
import { ProductCoop } from '~/components/Popper';

const cx = classNames.bind(styles);

function Branch({ keyIndex = 0 }) {
    const { id } = useParams();
    const [data, setData] = useState();
    const [Name, setName] = useState('');
    const [OpenTime, setOpenTime] = useState('');
    const [CloseTime, setCloseTime] = useState('');
    const [Status, setStatus] = useState('');
    //const [name, setName] = useState();
    const handleOnClickUpdateStoreName = () => {
        fetch(`https://me-food-api.onrender.com//branch/updateStoreName`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MaDoiTac: data[0].MaDoiTac,
                MaChiNhanh: data[0].MaChiNhanh,
                Ten: Name,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.returnValue == 2 && data.returnValue != undefined) {
                    alert('Cửa hàng không thể cập nhật tên trong 30 ngày');
                }
            });
    };
    const handleOnClickUpdateStoreOpenTime = () => {
        fetch(`https://me-food-api.onrender.com//branch/updateStoreOpenTime`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MaDoiTac: data[0].MaDoiTac,
                MaChiNhanh: data[0].MaChiNhanh,
                ThoiGianMoCua: OpenTime,
            }),
        });
    };
    const handleOnClickUpdateStoreCloseTime = () => {
        fetch(`https://me-food-api.onrender.com//branch/updateStoreCloseTime`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MaDoiTac: data[0].MaDoiTac,
                MaChiNhanh: data[0].MaChiNhanh,
                ThoiGianDongCua: CloseTime,
            }),
        });
    };
    const handleOnClickUpdateStoreStatus = () => {
        fetch(`https://me-food-api.onrender.com//branch/updateStoreStatus`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MaDoiTac: data[0].MaDoiTac,
                MaChiNhanh: data[0].MaChiNhanh,
                TinhTrangChiNhanh: Status,
            }),
        });
    };
    useEffect(() => {
        if (localStorage.getItem('roll') == 3 && localStorage.getItem('ma') == id) {
            const abortController = new AbortController();
            fetch(`https://me-food-api.onrender.com//branch/getMenu/${id}`, {
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
                    console.log(data);
                });
            return () => {
                abortController.abort();
            };
        }
    }, [id]);
    return (
        <>
            {localStorage.getItem('roll') == 3 && localStorage.getItem('ma') == id && (
                <>
                    <div className={cx('container', 'grid')}>
                        <div className={cx('grid')}>
                            <div className={cx('list')}>
                                <h1 className={cx('title')}>
                                    <Text>{data !== undefined && data[0].TenDoiTac}</Text>
                                </h1>
                                <h3 className={cx('type')}>
                                    <Text>{data !== undefined && data[0].LoaiAmThuc}</Text>
                                </h3>
                                <Star amount={data !== undefined && data[0].Rating} />
                                <Text className={cx('contact')}>Email: {data !== undefined && data[0].Email}</Text>
                                <Text className={cx('contact')}>
                                    Điện thoại: {data !== undefined && data[0].DienThoaiDoiTac}
                                </Text>
                                <Text className={cx('contact')}>
                                    Tên Chi Nhánh: {data !== undefined && data[0].TenChiNhanh}
                                </Text>
                                <Text className={cx('contact')}>
                                    Thời gian mở cửa: {data !== undefined && data[0].ThoiGianMoCua}
                                </Text>
                                <Text className={cx('contact')}>
                                    Thời gian đóng cửa: {data !== undefined && data[0].ThoiGianDongCua}
                                </Text>
                                <Text className={cx('contact')}>
                                    Tình trạng chi nhánh: {data !== undefined && data[0].TinhTrangChiNhanh}
                                </Text>
                            </div>
                            <Button className={cx('btn')} data-toggle="modal" data-target={`#edit-1`}>
                                Cập nhật
                            </Button>
                        </div>
                    </div>
                    <div className={cx('container', 'grid')}>
                        <ProductCoop data={data} />
                    </div>
                </>
            )}
            {
                <div
                    className="modal fade"
                    id={`edit-1`}
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLongTitle"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{ overflow: 'hidden' }}>
                            <div className={cx('content-wrapper')}>
                                <div className={cx('separate')}></div>
                                <div className={cx('item-modal')}>
                                    <div className={cx('link-modal')}>
                                        <div className={cx('group')}>
                                            <div className={cx('text-input')}>
                                                <Text className={cx('text')}>Tên cửa hàng</Text>
                                                <input
                                                    type="text"
                                                    value={Name}
                                                    name="name"
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className={cx('btn-modal')}
                                                data-dismiss="modal"
                                                aria-label="Close"
                                                onClick={() => handleOnClickUpdateStoreName()}
                                            >
                                                <div>Cập nhật tên cửa hàng</div>
                                            </div>
                                            <div className={cx('text-input')}>
                                                <Text className={cx('text')}>Thời gian mở cửa</Text>
                                                <input
                                                    type="text"
                                                    value={OpenTime}
                                                    name="opentime"
                                                    onChange={(e) => {
                                                        setOpenTime(e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className={cx('btn-modal')}
                                                data-dismiss="modal"
                                                aria-label="Close"
                                                onClick={() => handleOnClickUpdateStoreOpenTime()}
                                            >
                                                <div>Cập nhật thời gian mở cửa</div>
                                            </div>
                                            <div className={cx('text-input')}>
                                                <Text className={cx('text')}>Thời gian đóng cửa</Text>
                                                <input
                                                    type="text"
                                                    value={CloseTime}
                                                    name="closetime"
                                                    onChange={(e) => {
                                                        setCloseTime(e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className={cx('btn-modal')}
                                                data-dismiss="modal"
                                                aria-label="Close"
                                                onClick={() => handleOnClickUpdateStoreCloseTime()}
                                            >
                                                <div>Cập nhật thời gian đóng cửa</div>
                                            </div>
                                            <div className={cx('text-input')}>
                                                <Text className={cx('text')}>Tình trạng cửa hàng</Text>
                                                <input
                                                    type="text"
                                                    value={Status}
                                                    name="status"
                                                    onChange={(e) => {
                                                        setStatus(e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className={cx('btn-modal')}
                                                data-dismiss="modal"
                                                aria-label="Close"
                                                onClick={() => handleOnClickUpdateStoreStatus()}
                                            >
                                                <div>Cập nhật tình trạng cửa hàng</div>
                                            </div>
                                        </div>
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
            }
            {(localStorage.getItem('roll') != 3 || localStorage.getItem('ma') != id) && <ErrorPage />}
        </>
    );
}

export default Branch;
