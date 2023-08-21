import styles from './EmptyPage.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function EmptyPage() {
    return (
        <div className={cx('page')}>
            <h1 className={cx('h1')}>Không có dữ liệu</h1>
        </div>
    );
}

export default EmptyPage;
