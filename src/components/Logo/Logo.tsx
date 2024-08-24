import Image from 'next/image';
import styles from './Logo.module.scss';
import logo from '/public/logo.svg';

const Logo = () => {
    return (
        <div className={styles.logoContainer}>
            <Image src={logo} alt="Logo" className={styles.logo} />
        </div>
    );
};

export default Logo;
