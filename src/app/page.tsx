'use client';

import styles from './page.module.css';
import WelcomePage from './welcomepage/page';

const Home: React.FC = () => {
    return (
        <main className={styles.main}>
            <WelcomePage />
        </main>
    );
};

export default Home;
