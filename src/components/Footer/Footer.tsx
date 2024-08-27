import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';

import rsIcon from '@/assets/icons/rs.svg';

import styles from './Footer.module.scss';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <a
                href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md"
                target="_blank"
                rel="noreferrer"
                aria-label="Rolling Scopes School organisation"
            >
                <FaGithub className={styles.icon} />
            </a>
            <p>&copy; {currentYear}</p>
            <a
                href="https://rs.school/courses/reactjs"
                target="_blank"
                rel="noreferrer"
                aria-label="RS School"
            >
                <Image src={rsIcon} alt="RS School" className={styles.icon} />
            </a>
        </footer>
    );
};

export default Footer;
