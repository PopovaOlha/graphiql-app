import PreloaderIco from '@/assets/loading.svg';
import { IProps } from '@/types/interfaces';

import styles from './Preloader.module.scss';

const Preloader = ({ view }: IProps) => {
    if (view === 'full') {
        return (
            <div className={styles.preloader_full} data-testid="preloader-full">
                <span className={styles.preloader_full__ico}></span>
            </div>
        );
    } else if (view === 'mini') {
        return (
            <div className={styles.preloader_mini}>
                <PreloaderIco height={30} className={styles.preloader_mini__ico} />
            </div>
        );
    }
};
export default Preloader;
