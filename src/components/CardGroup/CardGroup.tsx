import { authors } from '@/utils/constants/authors';
import ProfileCard from '../ProfileCard/ProfileCard';
import styles from './CardGroup.module.scss';

const CardGroup = () => {
    return (
        <section className={styles.sectionContainer}>
            <h2>Authors</h2>
            <div className={styles.cardContainer}>
                {authors.map((author) => (
                    <ProfileCard
                        key={author.githubUrl}
                        avatarUrl={author.avatarUrl}
                        name={author.name}
                        description={author.description}
                        githubUrl={author.githubUrl}
                    />
                ))}
            </div>
        </section>
    );
};

export default CardGroup;
