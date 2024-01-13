import { Link } from 'react-router-dom'
import styles from './MainPage.module.css'



const MainPage: React.FC = () => {
    return (
        <div className={styles.container}>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      );
}

export default MainPage