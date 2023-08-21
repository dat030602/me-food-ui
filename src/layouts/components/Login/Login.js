import styles from './Login.module.scss';

import classNames from 'classnames/bind';
import Text from '~/components/Text';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function Login() {
    const [loginErr, setLoginErr] = useState(false);

    const refUser = useRef();
    const refPassword = useRef();
    const handleSubmit = async (e) => {
        fetch('https://me-food-api.onrender.com//login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                user: refUser.current.value,
                password: refPassword.current.value,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if (data.recordset) {
                    localStorage.setItem('userName', data.recordset[0].Ten);
                    localStorage.setItem('dienThoai', refUser.current.value);
                    const roll = data.recordset[0].ma.slice(0, 2)
                    if (roll === 'NV') localStorage.setItem('roll', 1);
                    else if (roll === 'TX') localStorage.setItem('roll', 2);
                    else if (roll === 'DT') localStorage.setItem('roll', 3);
                    else if (roll === 'KH') localStorage.setItem('roll', 4);
                    localStorage.setItem('ma', data.recordset[0].ma)
                    setLoginErr(false);
                    window.location.href = '/';
                } else {
                    setLoginErr(true);
                }
            });
    };

    return (
        <>
            <div className={cx('container', 'grid')}>
                <div className={cx('title')}>
                    <h1>Đăng nhập</h1>
                </div>
                <div className="modal-body">
                    <form>
                        {/* <!-- Email input --> */}
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example1">
                                Phone Number
                            </label>
                            <input type="email" id="form2Example1" className="form-control" required ref={refUser} />
                        </div>

                        {/* <!-- Password input --> */}
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="form2Example2"
                                className="form-control"
                                required
                                ref={refPassword}
                            />
                        </div>
                        {loginErr && (
                            <Text className="mb-4" style={{ color: 'red' }}>
                                Bạn đã nhập sai tài khoản hoặc mật khẩu
                            </Text>
                        )}
                        {/* <!-- 2 column grid layout for inline styling --> */}
                        <div className="row mb-4">
                            <div className="col d-flex justify-content-center">
                                {/* <!-- Checkbox --> */}
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                                    <label className="form-check-label" htmlFor="form2Example31">
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            <div className="col">
                                {/* <!-- Simple link --> */}
                                <a href="#!" style={{ color: 'var(--primary-color)' }}>
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        {/* <!-- Submit button --> */}
                        <button
                            type="button"
                            className="btn btn-primary btn-block mb-4"
                            style={{ backgroundColor: 'var(--primary-color)' }}
                            onClick={handleSubmit}
                        >
                            Sign in
                        </button>

                        {/* <!-- Register buttons --> */}
                        <div className="text-center">
                            <p>
                                Not a member?
                                <a href="/register" style={{ color: 'var(--primary-color)' }}>
                                    Register
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
