import React, { useState } from 'react';
import styles from './Login.module.scss';

import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import classNames from 'classnames/bind';
import Button from '../Button';

const cx = classNames.bind(styles);

function Login({ children, login = false, name = '', ...props }) {
    const handleLogout = () => {
        fetch('https://me-food-api.onrender.com/login/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                user: localStorage.getItem('dienThoai'),
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.returnValue === 0) alert('Thất bại');
                else {
                    localStorage.setItem('userName', '');
                    window.location.href = '/';
                }
            });
    };

    return (
        <>
            {localStorage.getItem('userName') ? (
                <HeadlessTippy
                    interactive
                    appendTo={() => document.body}
                    delay={[0, 500]}
                    placement="bottom-start"
                    render={(attrs) => (
                        <ul className={cx('dropdown-menu')} tabIndex="-1" {...attrs}>
                            {
                                // eslint-disable-next-line eqeqeq
                                localStorage.getItem('roll') == 1 && (
                                    <li className={cx('item')}>
                                        <Button className={cx('item-link')} to={`/list-coop`}>
                                            Xem danh sách hợp đồng
                                        </Button>
                                    </li>
                                )
                            }
                            {
                                // eslint-disable-next-line eqeqeq
                                localStorage.getItem('roll') == 3 && (
                                    <li className={cx('item')}>
                                        <Button
                                            className={cx('item-link')}
                                            to={`/contact/${localStorage.getItem('ma')}`}
                                        >
                                            Xem hợp đồng
                                        </Button>
                                    </li>
                                )
                            }
                            {
                                // eslint-disable-next-line eqeqeq
                                localStorage.getItem('roll') == 3 && (
                                    <li className={cx('item')}>
                                        <Button
                                            className={cx('item-link')}
                                            to={`/branch/${localStorage.getItem('ma')}`}
                                        >
                                            Thông tin chi nhánh
                                        </Button>
                                    </li>
                                )
                            }
                            {
                                // eslint-disable-next-line eqeqeq
                                localStorage.getItem('roll') == 3 && (
                                    <li className={cx('item')}>
                                        <Button
                                            className={cx('item-link')}
                                            to={`/manage-cart/${localStorage.getItem('ma')}`}
                                        >
                                            Quản lý đơn hàng (Đối tác)
                                        </Button>
                                    </li>
                                )
                            }
                            {
                                // eslint-disable-next-line eqeqeq
                                localStorage.getItem('roll') == 2 && (
                                    <li className={cx('item')}>
                                        <Button className={cx('item-link')} to="/manage-driver">
                                            Quản lý đơn hàng (tài xế)
                                        </Button>
                                    </li>
                                )
                            }
                            {
                                // eslint-disable-next-line eqeqeq
                                localStorage.getItem('roll') == 4 && (
                                    <li className={cx('item')}>
                                        <Button
                                            className={cx('item-link')}
                                            to={`/follow-order/${localStorage.getItem('ma')}`}
                                        >
                                            Theo dõi đơn hàng
                                        </Button>
                                    </li>
                                )
                            }
                            {
                                // eslint-disable-next-line eqeqeq
                                localStorage.getItem('roll') == 2 && (
                                    <li className={cx('item')}>
                                        <Button
                                            className={cx('item-link')}
                                            to={`/earning-tracking/${localStorage.getItem('ma')}`}
                                        >
                                            Theo dõi thu nhập (tài xế)
                                        </Button>
                                    </li>
                                )
                            }
                            {
                                // eslint-disable-next-line eqeqeq
                                localStorage.getItem('roll') == 1 && (
                                    <li className={cx('item')}>
                                        <Button className={cx('item-link')} to="/manage-coop">
                                            Quản lý đối tác (đối tác)
                                        </Button>
                                    </li>
                                )
                            }
                            {
                                // eslint-disable-next-line eqeqeq
                                localStorage.getItem('roll') == 3 && (
                                    <li className={cx('item')}>
                                        <Button
                                            className={cx('item-link')}
                                            to={`/manage-data/${localStorage.getItem('ma')}`}
                                        >
                                            Quản lý doanh thu (đối tác)
                                        </Button>
                                    </li>
                                )
                            }
                            {
                                // eslint-disable-next-line eqeqeq
                                localStorage.getItem('roll') == 3 && (
                                    <li className={cx('item')}>
                                        <Button
                                            className={cx('item-link')}
                                            to={`/statistics/${localStorage.getItem('ma')}`}
                                        >
                                            Xem danh sách tất cả đơn hàng (đối tác)
                                        </Button>
                                    </li>
                                )
                            }
                            <li className={cx('item')}>
                                <Button className={cx('item-link')} onClick={() => handleLogout()}>
                                    Đăng xuất
                                </Button>
                            </li>
                        </ul>
                    )}
                >
                    <div className={cx('dropdown-btn')}>
                        <Button className={cx('name-user')}>{localStorage.getItem('userName')}</Button>
                    </div>
                </HeadlessTippy>
            ) : (
                <>
                    <Button headerGroup href="/login">
                        <div className={cx('login')}>Đăng nhập</div>
                    </Button>
                    <Button headerGroup href="/register">
                        <div className={cx('login')}>Đăng ký</div>
                    </Button>
                </>
            )}
        </>
    );
}

export default Login;
