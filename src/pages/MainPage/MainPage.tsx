import { Link } from "react-router-dom";
import styles from "./MainPage.module.css"

const MainPage: React.FC = () => {
    return(
            <div className={styles.main_container}>
               <Link to="/register">Sign In</Link>
            </div>
    );
}
export default MainPage;