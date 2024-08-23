'use client';
import SignIn from '../../components/SignIn/SignIn';
import styles from '../../styles/signin.module.css';

const SignInPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <SignIn />
        </div>
    );
};

export default SignInPage;
