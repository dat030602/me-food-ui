import React from 'react';

import styles from './DefaultLayout.module.scss';

import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';

const cx = classNames.bind(styles);

function DefaultLayout({ children, white=false,register=false}) {
    return (
        <>
            <Header white={white} register={register}/>
            {white&&<div className={cx('distance')}>a</div>}
            <div className={cx('main')}>{children}</div>
            {register && <Footer />}
        </>
    );
}
export default DefaultLayout;
