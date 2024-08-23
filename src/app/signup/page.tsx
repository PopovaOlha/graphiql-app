'use client';
import SignUp from '../../components/SignUp/SignUp';
import styles from '../../styles/signup.module.css';

const SignUpPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <SignUp />
        </div>
    );
};

export default SignUpPage;
