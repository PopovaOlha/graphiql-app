import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

import styles from '@/components/CardGroup/CardGroup.module.scss';
import ProfileCard from '@/components/ProfileCard/ProfileCard';

const CardGroup = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.cardGroupContainer}>
            <Typography variant="h2">{t('authors:title')}</Typography>
            <div className={styles.cardContainer}>
                <ProfileCard
                    key={t('authors:kotvmeshke.name')}
                    avatarUrl={t('authors:kotvmeshke.avatarUrl')}
                    name={t('authors:kotvmeshke.name')}
                    description={t('authors:kotvmeshke.description')}
                    githubUrl={t('authors:kotvmeshke.githubUrl')}
                />
                <ProfileCard
                    key={t('authors:popovaolha.name')}
                    avatarUrl={t('authors:popovaolha.avatarUrl')}
                    name={t('authors:popovaolha.name')}
                    description={t('authors:popovaolha.description')}
                    githubUrl={t('authors:popovaolha.githubUrl')}
                />
                <ProfileCard
                    key={t('authors:svitlanag.name')}
                    avatarUrl={t('authors:svitlanag.avatarUrl')}
                    name={t('authors:svitlanag.name')}
                    description={t('authors:svitlanag.description')}
                    githubUrl={t('authors:svitlanag.githubUrl')}
                />
            </div>
        </div>
    );
};

export default CardGroup;
