import { FaGithub } from 'react-icons/fa';
import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    Link,
    Typography,
} from '@mui/material';

import styles from '@/components/ProfileCard/ProfileCard.module.scss';

interface ProfileCardProps {
    avatarUrl: string;
    name: string;
    description: string;
    githubUrl: string;
}

const ProfileCard = ({
    avatarUrl,
    name,
    description,
    githubUrl,
}: ProfileCardProps) => {
    return (
        <Card className={styles.card}>
            <Avatar alt={name} src={avatarUrl} className={styles.avatar} />
            <CardContent className={styles.cardContent}>
                <CardActions>
                    <Link
                        className={styles.cardLink}
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaGithub /> {name}
                    </Link>
                </CardActions>
                <Box>
                    <Typography>{description}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
