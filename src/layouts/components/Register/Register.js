import { useEffect, useRef, useState } from 'react';
import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { banks } from '~/assets/Banks';
import Text from '~/components/Text';
const cx = classNames.bind(styles);
function Register() {
    const [customer, setCustomer] = useState(true);
    const [driver, setDriver] = useState(false);
    const [coop, setCoop] = useState(false);

    const [errPassword1, setErrPassword1] = useState(true);
    const [errPassword2, setErrPassword2] = useState(true);
    const [errPassword3, setErrPassword3] = useState(true);

    const [KhachHang, setKhachHang] = useState({
        name: '',
        email: '',
        tinh: '',
        huyen: '',
        xa: '',
        dienthoai: '',
        matkhau: '',
        // nhaplaimatkhau: '',
    });

    const arrNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const setInputKhachHang = (e) => {
        const { name, value } = e.target;
        if (name === 'Họ tên') {
            if (value.length <= 50) setKhachHang((pre) => ({ ...pre, name: value }));
        } else if (name === 'email') {
            if (value.length <= 50) setKhachHang((pre) => ({ ...pre, email: value }));
        } else if (name === 'Số điện thoại') {
            if (value.length <= 10) {
                if (value.length <= 0) setKhachHang((pre) => ({ ...pre, dienthoai: value }));
                else if (arrNumber.includes(value[value.length - 1]))
                    setKhachHang((pre) => ({ ...pre, dienthoai: value }));
            }
        } else if (name === 'Mật khẩu') {
            if (value.length <= 20) setKhachHang((pre) => ({ ...pre, matkhau: value }));
            if (value.length === 0) setKhachHang((pre) => ({ ...pre, nhaplaimatkhau: value }));
        } 
        // else if (name === 'Nhập lại mật khẩu') {
        //     if (value.length <= 20) {
        //         if (value.length > 0) {
        //             setErrPassword1(TaiXe.matkhau === value);
        //         }
        //         setKhachHang((pre) => ({ ...pre, nhaplaimatkhau: value }));
        //     }
        // } 
        else if (name === 'tinh') {
            setKhachHang((pre) => ({ ...pre, tinh: value }));
        } else if (name === 'huyen') {
            setKhachHang((pre) => ({ ...pre, huyen: value }));
        } else if (name === 'xa') {
            setKhachHang((pre) => ({ ...pre, xa: value }));
        }
    };

    const RegisterKhachHang = () => {
        fetch('https://me-food-api.onrender.com//register/customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(KhachHang),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
            });
    };

    const [TaiXe, setTaiXe] = useState({
        name: '',
        cmnd: '',
        bienso: '',
        diachinha: '',
        stk: '',
        nganhang: '',
        phithechan: 1000000,
        email: '',
        tinh: '',
        huyen: '',
        xa: '',
        dienthoai: '',
        matkhau: '',
        // nhaplaimatkhau: '',
    });

    const setInputTaiXe = (e) => {
        const { name, value } = e.target;

        if (name === 'Họ tên') {
            if (value.length <= 50) setTaiXe((pre) => ({ ...pre, name: value }));
        } else if (name === 'CMND') {
            if (value.length <= 10) {
                if (value.length <= 0) setTaiXe((pre) => ({ ...pre, cmnd: value }));
                else if (arrNumber.includes(value[value.length - 1])) setTaiXe((pre) => ({ ...pre, cmnd: value }));
            }
        } else if (name === 'email') {
            if (value.length <= 50) setTaiXe((pre) => ({ ...pre, email: value }));
        } else if (name === 'Địa chỉ') {
            if (value.length <= 50) setTaiXe((pre) => ({ ...pre, diachinha: value }));
        } else if (name === 'Biển số xe') {
            if (value.length <= 50) setTaiXe((pre) => ({ ...pre, bienso: value }));
        } else if (name === 'Số điện thoại') {
            if (value.length <= 10) {
                if (value.length <= 0) setTaiXe((pre) => ({ ...pre, dienthoai: value }));
                else if (arrNumber.includes(value[value.length - 1])) setTaiXe((pre) => ({ ...pre, dienthoai: value }));
            }
        } else if (name === 'bank') {
            if (value.length <= 50) setTaiXe((pre) => ({ ...pre, nganhang: value }));
        } else if (name === 'Số tài khoản') {
            if (value.length <= 50) setTaiXe((pre) => ({ ...pre, stk: value }));
        } else if (name === 'Mật khẩu') {
            if (value.length <= 20) setTaiXe((pre) => ({ ...pre, matkhau: value }));
            if (value.length === 0) setTaiXe((pre) => ({ ...pre, nhaplaimatkhau: value }));
        }
        // else if (name === 'Nhập lại mật khẩu') {
        //     if (value.length <= 20) {
        //         if (value.length > 0) {
        //             setErrPassword2(TaiXe.matkhau === value);
        //         }
        //         setTaiXe((pre) => ({ ...pre, nhaplaimatkhau: value }));
        //     }
        // }
        else if (name === 'tinh') {
            if (value.length <= 50) setTaiXe((pre) => ({ ...pre, tinh: value }));
        } else if (name === 'huyen') {
            if (value.length <= 50) setTaiXe((pre) => ({ ...pre, huyen: value }));
        } else if (name === 'xa') {
            if (value.length <= 50) setTaiXe((pre) => ({ ...pre, xa: value }));
        }
    };

    const RegisterTaiXe = () => {
        fetch('https://me-food-api.onrender.com//register/driver', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(TaiXe),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
            });
    };

    const [DoiTac, setDoiTac] = useState({
        name: '',
        tendt: '',
        email: '',
        masothue: '',
        soluongchinhanh: 0,
        loaiamthuc: '',
        stk: '',
        nganhang: '',
        diachikinhdoanh: '',
        dienthoai: '',
        matkhau: '',
        // nhaplaimatkhau: '',
        diachi: '',
    });

    const setInputDoiTac = (e) => {
        const { name, value } = e.target;
        if (name === 'Họ tên') {
            if (value.length <= 50) setDoiTac((pre) => ({ ...pre, name: value }));
        } else if (name === 'email') {
            if (value.length <= 50) setDoiTac((pre) => ({ ...pre, email: value }));
        } else if (name === 'Tên đối tác') {
            if (value.length <= 50) setDoiTac((pre) => ({ ...pre, tendt: value }));
        } else if (name === 'Số lượng chi nhánh') {
            if (value.length <= 10) {
                if (value.length <= 0) setDoiTac((pre) => ({ ...pre, soluongchinhanh: value }));
                else if (arrNumber.includes(value[value.length - 1]))
                    setDoiTac((pre) => ({ ...pre, dienthoai: value }));
            }
        } else if (name === 'Loại ẩm thực') {
            if (value.length <= 50) setDoiTac((pre) => ({ ...pre, loaiamthuc: value }));
        } else if (name === 'Số điện thoại') {
            if (value.length <= 10) {
                if (value.length <= 0) setDoiTac((pre) => ({ ...pre, dienthoai: value }));
                else if (arrNumber.includes(value[value.length - 1]))
                    setDoiTac((pre) => ({ ...pre, dienthoai: value }));
            }
        } else if (name === 'bank') {
            if (value.length <= 50) setDoiTac((pre) => ({ ...pre, nganhang: value }));
        } else if (name === 'Số tài khoản') {
            if (value.length <= 50) setDoiTac((pre) => ({ ...pre, stk: value }));
        } else if (name === 'Mật khẩu') {
            if (value.length <= 20) setDoiTac((pre) => ({ ...pre, matkhau: value }));
            if (value.length === 0) setDoiTac((pre) => ({ ...pre, nhaplaimatkhau: '' }));
        }
        // else if (name === 'Nhập lại mật khẩu') {
        //     if (value.length <= 20) {
        //         if (value.length > 0) {
        //             setErrPassword3(DoiTac.matkhau === value);
        //         }
        //         // if (value[value.length - 1] !== ' ')
        //         setDoiTac((pre) => ({ ...pre, nhaplaimatkhau: value }));
        //     }
        // }
    };

    const RegisterDoiTac = () => {
        fetch('https://me-food-api.onrender.com//register/coop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(DoiTac),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
            });
    };

    const [provinces, setProvinces] = useState();
    const [districts, setDistricts] = useState();
    const [wards, setWards] = useState();

    const [nameBank, setNameBank] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            var result = await fetch('https://provinces.open-api.vn/api/p/')
                .then((response) => response.json())
                .then((data) => data);
            setProvinces(result);
            setNameBank(banks);
        };
        fetchApi();
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

    const refLink = useRef([]);

    const handleOnClickLink = (index) => {
        if (index === 0) {
            setCustomer(true);
            setDriver(false);
            setCoop(false);
        } else if (index === 1) {
            setCustomer(false);
            setDriver(true);
            setCoop(false);
        } else if (index === 2) {
            setCustomer(false);
            setDriver(false);
            setCoop(true);
        }
        refLink &&
            // eslint-disable-next-line array-callback-return
            refLink.current.map((value, indexSub) => {
                if (indexSub === index) refLink.current[indexSub].classList.add(cx('active'));
                else refLink.current[indexSub].classList.remove(cx('active'));
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
            <div className={cx('container', 'grid')}>
                <div className={cx('title')}>
                    <h1>Đăng ký</h1>
                </div>
                <div className={cx('decentralization')}>
                    <div className={cx('link', 'active')} onClick={() => handleOnClickLink(0)} ref={pushRefLink}>
                        Khách hàng
                    </div>
                    <div className={cx('link')} onClick={() => handleOnClickLink(1)} ref={pushRefLink}>
                        Tài xế
                    </div>
                    <div className={cx('link')} onClick={() => handleOnClickLink(2)} ref={pushRefLink}>
                        Đối tác
                    </div>
                </div>
                <div className={cx('content-wrapper')}>
                    {customer && (
                        <div className={cx('content')}>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Họ tên</Text>
                                <input type="text" name="Họ tên" onChange={setInputKhachHang} value={KhachHang.name} />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Email</Text>
                                <input type="email" name="email" onChange={setInputKhachHang} value={KhachHang.email} />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Địa chỉ</Text>
                                <select
                                    id="provinces"
                                    name="tinh"
                                    onChange={(e) => {
                                        handleSelectProvinces();
                                        setInputKhachHang(e);
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
                                        setInputKhachHang(e);
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
                                <select id="wards" name="xa" onChange={setInputKhachHang}>
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
                                <Text className={cx('text')}>Số điện thoại</Text>
                                <input
                                    type="text"
                                    name="Số điện thoại"
                                    onChange={setInputKhachHang}
                                    value={KhachHang.dienthoai}
                                />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Mật khẩu</Text>
                                <input
                                    type="password"
                                    name="Mật khẩu"
                                    onChange={setInputKhachHang}
                                    value={KhachHang.matkhau}
                                />
                            </div>
                            {/* <div className={cx('text-input')}>
                                <Text className={cx('text')}>Nhập lại mật khẩu</Text>
                                <input
                                    type="password"
                                    name="Nhập lại mật khẩu"
                                    onChange={setInputKhachHang}
                                    value={KhachHang.nhaplaimatkhau}
                                />
                                {!errPassword1 && <Text style={{ color: 'red' }}>Mật khẩu không trùng khớp</Text>}
                            </div> */}
                        </div>
                    )}
                    {driver && (
                        <div className={cx('content')}>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Họ tên</Text>
                                <input type="text" name="Họ tên" onChange={setInputTaiXe} value={TaiXe.name} />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>CMND</Text>
                                <input type="text" name="CMND" onChange={setInputTaiXe} value={TaiXe.cmnd} />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Email</Text>
                                <input type="email" name="email" onChange={setInputTaiXe} value={TaiXe.email} />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Địa chỉ</Text>
                                <input type="text" name="Địa chỉ" onChange={setInputTaiXe} value={TaiXe.diachinha} />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Biển số xe</Text>
                                <input type="text" name="Biển số xe" onChange={setInputTaiXe} value={TaiXe.bienso} />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Khu vực hoạt động</Text>
                                <select
                                    id="provinces"
                                    name="tinh"
                                    onChange={(e) => {
                                        handleSelectProvinces();
                                        setInputTaiXe(e);
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
                                        setInputTaiXe(e);
                                    }}
                                >
                                    <option value={''} key={0}>
                                        Quận/Huyện
                                    </option>
                                    {
                                        // eslint-disable-next-line array-callback-return
                                        districts &&
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
                                <select
                                    id="wards"
                                    name="xa"
                                    onChange={(e) => {
                                        setInputTaiXe(e);
                                    }}
                                >
                                    <option value={''} key={0}>
                                        Phường/Xã
                                    </option>
                                    {
                                        // eslint-disable-next-line array-callback-return
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
                                <Text className={cx('text')}>Tài khoản ngân hàng</Text>
                                <select id="name-bank" name="bank" onChange={setInputTaiXe}>
                                    <option value={''} key={0}>
                                        Tên Ngân Hàng
                                    </option>
                                    {
                                        // eslint-disable-next-line array-callback-return
                                        nameBank &&
                                            nameBank.map((index) => {
                                                return (
                                                    <option value={index.TenNH} key={Number(index.MaNganHang)}>
                                                        {index.TenNH}
                                                    </option>
                                                );
                                            })
                                    }
                                </select>
                                <input
                                    className={cx('input-bank')}
                                    type="text"
                                    placeholder="Số tài khoản"
                                    name="Số tài khoản"
                                    onChange={setInputTaiXe}
                                    value={TaiXe.stk}
                                />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Số điện thoại</Text>
                                <input
                                    type="text"
                                    name="Số điện thoại"
                                    onChange={setInputTaiXe}
                                    value={TaiXe.dienthoai}
                                />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Mật khẩu</Text>
                                <input type="password" name="Mật khẩu" onChange={setInputTaiXe} value={TaiXe.matkhau} />
                            </div>
                            {/* <div className={cx('text-input')}>
                                <Text className={cx('text')}>Nhập lại mật khẩu</Text>
                                <input
                                    type="password"
                                    name="Nhập lại mật khẩu"
                                    onChange={setInputTaiXe}
                                    value={TaiXe.nhaplaimatkhau}
                                />
                                {!errPassword2 && <Text style={{ color: 'red' }}>Mật khẩu không trùng khớp</Text>}
                            </div> */}
                        </div>
                    )}
                    {coop && (
                        <div className={cx('content')}>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Họ tên người đại diện</Text>
                                <input type="text" name="Họ tên" onChange={setInputDoiTac} value={DoiTac.name} />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Email</Text>
                                <input type="email" name="email" onChange={setInputDoiTac} value={DoiTac.email} />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Tên quán/Nhà hàng</Text>
                                <input type="text" name="Tên quán" onChange={setInputDoiTac} value={DoiTac.TenNH} />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Tài khoản ngân hàng</Text>
                                <select id="name-bank" name="bank" onChange={setInputDoiTac}>
                                    <option value={''} key={0}>
                                        Tên Ngân Hàng
                                    </option>
                                    {
                                        // eslint-disable-next-line array-callback-return
                                        nameBank &&
                                            nameBank.map((index) => {
                                                return (
                                                    <option value={index.TenNH} key={Number(index.MaNganHang)}>
                                                        {index.TenNH}
                                                    </option>
                                                );
                                            })
                                    }
                                </select>
                                <input
                                    className={cx('input-bank')}
                                    type="text"
                                    placeholder="Số tài khoản"
                                    name="Số tài khoản"
                                    onChange={setInputDoiTac}
                                    value={DoiTac.stk}
                                />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Địa chỉ kinh doanh</Text>
                                <input
                                    type="text"
                                    name="Địa chỉ"
                                    onChange={setInputDoiTac}
                                    value={DoiTac.diachikinhdoanh}
                                />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Tên chi nhánh</Text>
                                <input
                                    type="text"
                                    name="Tên chi nhánh"
                                    onChange={setInputDoiTac}
                                    value={DoiTac.tendt}
                                />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Số lượng chi nhánh</Text>
                                <input
                                    type="text"
                                    name="Số lượng chi nhánh"
                                    onChange={setInputDoiTac}
                                    value={DoiTac.soluongchinhanh}
                                />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>
                                    Loại ẩm thực (cơm, mì/bún/phở, bánh mì, đồ ăn nhanh, trà sữa...)
                                </Text>
                                <input
                                    type="text"
                                    name="Loại ẩm thực"
                                    onChange={setInputDoiTac}
                                    value={DoiTac.loaiamthuc}
                                />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Số điện thoại</Text>
                                <input
                                    type="text"
                                    name="Số điện thoại"
                                    onChange={setInputDoiTac}
                                    value={DoiTac.dienthoai}
                                />
                            </div>
                            <div className={cx('text-input')}>
                                <Text className={cx('text')}>Mật khẩu</Text>
                                <input
                                    type="password"
                                    name="Mật khẩu"
                                    onChange={setInputDoiTac}
                                    value={DoiTac.matkhau}
                                />
                            </div>
                            {/* <div className={cx('text-input')}>
                                <Text className={cx('text')}>Nhập lại mật khẩu</Text>
                                <input
                                    type="password"
                                    name="Nhập lại mật khẩu"
                                    onChange={setInputDoiTac}
                                    value={DoiTac.nhaplaimatkhau}
                                />
                                {!errPassword3 && <Text style={{ color: 'red' }}>Mật khẩu không trùng khớp</Text>}
                            </div> */}
                        </div>
                    )}
                    <div className={cx('btn-sub', 'text-input')}>
                        <input
                            className={cx('submit')}
                            type="submit"
                            value="Tạo tài khoản"
                            onClick={() => {
                                if (customer) RegisterKhachHang();
                                else if (driver) RegisterTaiXe();
                                else if (coop) RegisterDoiTac();
                                setKhachHang({
                                    name: '',
                                    email: '',
                                    tinh: '',
                                    huyen: '',
                                    xa: '',
                                    dienthoai: '',
                                    matkhau: '',
                                    nhaplaimatkhau: '',
                                });
                                setTaiXe({
                                    name: '',
                                    cmnd: '',
                                    bienso: '',
                                    diachinha: '',
                                    stk: '',
                                    nganhang: '',
                                    phithechan: 1000000,
                                    email: '',
                                    tinh: '',
                                    huyen: '',
                                    xa: '',
                                    dienthoai: '',
                                    matkhau: '',
                                    nhaplaimatkhau: '',
                                });
                                setDoiTac({
                                    name: '',
                                    email: '',
                                    masothue: '',
                                    soluongchinhanh: 0,
                                    soluongdonhang: 0,
                                    loaiamthuc: '',
                                    stk: '',
                                    nganhang: '',
                                    diachikinhdoanh: '',
                                    dienthoai: '',
                                    matkhau: '',
                                    nhaplaimatkhau: '',
                                    diachi: '',
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Register;
