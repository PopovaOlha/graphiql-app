import { useTranslation } from 'react-i18next';
import { Box, Link, Typography } from '@mui/material';
import Image from 'next/image';

import RSSchool from '@/assets/rs-school-img.webp';
import styles from '@/components/RSSchoolReactCourse/RSSchoolReactCourse.module.scss';

const RSSchoolReactCourse = () => {
    const { t } = useTranslation();

    return (
        <Box className={styles.reactCourse}>
            <Typography variant="h2" gutterBottom>
                {t('welcomePage:rsSchoolReactCourse.title')}
            </Typography>
            <Box>
                <Image
                    src={RSSchool}
                    alt={t('welcomePage:rsSchoolReactCourse.imageAlt')}
                    width={200}
                    height={200}
                />
            </Box>
            <Typography variant="body1" paragraph>
                {t('welcomePage:rsSchoolReactCourse.description1')}
            </Typography>
            <Typography variant="body1" paragraph>
                {t('welcomePage:rsSchoolReactCourse.description2')}
            </Typography>
            <Typography variant="body2">
                <Link
                    href="https://rs.school/"
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t('welcomePage:rsSchoolReactCourse.visitWebsite')}
                </Link>
            </Typography>
            <Typography variant="body2">
                <Link
                    href="https://discord.com/invite/zyRcphs3px"
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t('welcomePage:rsSchoolReactCourse.joinDiscord')}
                </Link>
            </Typography>
        </Box>
    );
};

export default RSSchoolReactCourse;
