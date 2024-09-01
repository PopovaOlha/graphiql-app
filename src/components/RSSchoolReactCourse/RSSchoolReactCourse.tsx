import { Box, Link, Typography } from '@mui/material';
import Image from 'next/image';

import RSSchool from '@/assets/rs-school-img.webp';
import styles from '@/components/RSSchoolReactCourse/RSSchoolReactCourse.module.scss';

const RSSchoolReactCourse = () => {
    return (
        <Box className={styles.reactCourse}>
            <Typography variant="h1" gutterBottom>
                RS School React Course
            </Typography>
            <Box>
                <Image
                    src={RSSchool}
                    alt="RS School React Course"
                    width={200}
                    height={200}
                />
            </Box>
            <Typography variant="body1" paragraph>
                The RS School React Course is a free, online program for students
                with solid JavaScript and TypeScript skills. It&apos;s perfect for
                those who have completed RS School Stage #2 or have equivalent
                experience.
            </Typography>
            <Typography variant="body1" paragraph>
                The course includes comprehensive materials, access to a supportive
                community on Discord, and a certificate upon completion.
            </Typography>
            <Typography variant="body2">
                <Link
                    href="https://rs.school/"
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit RS School Website
                </Link>
            </Typography>
            <Typography variant="body2">
                <Link
                    href="https://discord.com/invite/zyRcphs3px"
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Join Discord Community
                </Link>
            </Typography>
        </Box>
    );
};

export default RSSchoolReactCourse;
