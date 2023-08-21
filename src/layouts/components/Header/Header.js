import { useRef } from 'react';
import styles from './Header.module.scss';

import classNames from 'classnames/bind';
import images from '~/assets/images';
import Button from '~/components/Button';
import Login from '~/components/Login';

const cx = classNames.bind(styles);

function Header({ white = false, register = false }) {
    const refChangeBackgroundColor = useRef();
    const refImg1 = useRef();
    const refImg2 = useRef();
    const refBtn = useRef();
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0) {
            refChangeBackgroundColor.current.style.backgroundColor = '#fff';
            refImg1.current.style.display = 'block';
            refImg2.current.style.display = 'none';
            refBtn.current.classList.add(cx('open'));
        } else {
            if (white) refChangeBackgroundColor.current.style.backgroundColor = '#fff';
            else refChangeBackgroundColor.current.style.backgroundColor = 'transparent';
            refImg1.current.style.display = 'none';
            refImg2.current.style.display = 'block';
            refBtn.current.classList.remove(cx('open'));
        }
    }

    const classesImage = cx({
        white,
    });

    return (
        <>
            <header className={cx('section-container')} ref={refChangeBackgroundColor}>
                <div className={cx('section-content')}>
                    <div className={cx('logo')}>
                        <Button className={cx('logo-link')} to="/">
                            <img src={images.logo} className={classesImage} alt="hih" ref={refImg1} />
                            <img src={images.logo1} className={classesImage} alt="qqq" ref={refImg2} />
                        </Button>
                    </div>
                    {register && (
                        <div className={cx('btn-group')}>
                            <Login />
                        </div>
                    )}
                </div>
            </header>
            <div className={cx('go-to-top')} ref={refBtn}>
                <Button
                    goToTop
                    onClick={() => {
                        window.scrollTo(0, 0);
                    }}
                >
                    <img src={images.up} alt="" />
                </Button>
            </div>
        </>
    );
}

export default Header;
