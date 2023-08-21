import styles from './ErrorPage.module.scss';

import classNames from 'classnames/bind';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ErrorPage() {
    return (
        <div className={cx('page')}>
            <img
                className={cx('img')}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEX///8jHyAAAAAgHB0GAAAnIiOzs7Pn5uYKAAC8u7vFxMQOBQjLysuenZ0VEBGrqqt8ensaFRb09PTV1NUTDQ87ODnv7+8uKiuHhoZLSEmXlpZaWFne3t5VUlMMAAUZFBZhX19samtvbm6Bf4BCP0CjoqI1MzNXVVZLSUleXV3Z2dmrI868AAAFCUlEQVR4nO2de5uiLBiH14fKyrQwO0zTuZlm6/t/wN3ed/YSnVTAAzDzu/+H67kFAZHDr18AAAAAAAAAAAAAAAAAAAAAAAAA+Ic/n3xl7psOqxHiyeaWUBHJcTOJTYdYh3jwGlHAmVcE4wElt4GrktvZgQ7Fdqkl8dnWdLAabI8UVet9SkZ0cs0xntFBUu9/DjRzqq4OgkTJ70FCI9Nhy3Mm2fopwujsSDH6i0DD70GwcKKLnAdcU9Dz+HBuOvxqxlo19B+MxqYFqpg8E2Q8SoI8SfRsKGC94vyrIO/1VrvZJsyzme1W1PtSo5ndFXXJcoIsoNuguPnwBzcK8knYssOIVXnLFck+CavCXYbBPuvIF53EqsVlmAn1QBupZJtedvwzXLccpzYTygRKO9nezd/lUk5ajVOfVaa2kUpJrDOK7NpajLXY9DKCU6XE04wihS3FWItlplFUHkaPREUW2NiersXRqGIJPsiUYmBhY7MUv3e1WsPLXijEnn2fGe9CT8HftLJYCL3p8L3h+OrTF4qQ9KYktkI9ZauG46vNXIhO+yUSX2WybXi6TqctWKL7Di2FqbnEtram30hs4nOybHTqC5WU9KciGsqmDQbpeIZ/1MjnNW1Oe4PGomuCWZS28+qdfco07XOiWWPRNcEuffa1apfQYfDfjUXXBGlDU7Mji4SMbBrWxOmjPxxr5XRMK4NVo2+hctXsx4T+wqrGVPi6D+p92oXpsMaqUc04NazZyAuNqVVzGYJhzT9IQsdq1dwwDOWBoSlgKA8MTQFDeWBoChjKA0NTwFAeGJoChvLA0BQ/ynA/9WuwfA+aelZNMjpfhR/A+8LdFTII/0hZfxdaMWUaejJ7DnRgfE8n4473Va0Vs5VEkmvjWmPQrt8DOpoUHLUv6HlDg4r3LgT/luLFmOFCf1W+mqKpPxghVQfXCKxvyNDrpI4+MNT5j7sqQs/jRyOGF/XdW9qQEcNrZ5XU1P/g7iqpqRexS0MzC6RgCEMYwtBSQ8Z5yRkLrhuyiKi/O35ciRJFSzcMg+Fs/Lmgcr7uq31aumDIe+vMasopj6oTuWSYLPK7TJbHXnUydwyDZ8vb1/I5WG8Y7Z7mIK9ou2Hhku2b7Ltou2HhTNJyL9miWm54OBXmEQ6rkztgSPfCPGLJAY7dhqxsv+VM7k2027B0f8JILhe7DUv/5frfwrBsnizOnxXipGHpT065OUnLDcv2Pcer72BYWkvl/pDbbdgrm839Fi1N6WbQgdwnlN2GpXsuj3I/We02LOsQfcnD6yw35C+Fecj+obPcsPgsl7t0a2W5YWGXKNcZumDIvKe7lj+kp9usN/T46mspxh/yZ2Tab+jxIB/jZKUwYeqAocfotzhbsz0pTXq7YPi3GMUm9ayW2g3DzJkgkrMXMIQhDGEIQxjCEIYwhCEMYfgDDcWDzs5q19A4Yni4pYkVF/o7YihMfocKK75cMmT8U3GqKOiMocfodToahS/KSZ0x9Dy+J9K4aschQ01gCEMYwhCGMIThTzA0cxrPS0cnKvxnaOQi1o3uVZXqMGZCMHPxSsuYuichf1Nee5Ss9m+Vzo6NiG7VwbTDqZtzI9jQ2GFR8aqTekoG72Pxhx0omr1Iz7+23WVwjUvqmuUif4W6BozeDDWjAvdTQAlnLXDY05sdVyItB5eXVb9xFqfQfPkBAAAAAAAAAAAAAAAAAAAAAAAAAAAA3OMPXIddF8y+rvwAAAAASUVORK5CYII="
                alt="Lock"
            />
            <h1 className={cx('h1')}>Truy cập bị từ chối</h1>
            <h5 className={cx('h5')}>Bạn không có quyền hạn để truy cập trang</h5>
            <div className={cx('btn-submit')}>
                <Button className={cx('btn')} href="/">
                    Về trang chủ
                </Button>
            </div>
        </div>
    );
}

export default ErrorPage;
