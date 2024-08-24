import { FaGithub } from 'react-icons/fa';
import styles from './ProfileCard.module.scss';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Card,
    CardActions,
    CardContent,
    Link,
    Typography,
} from '@mui/material';

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
                <Typography component="div" variant="h5">
                    {name}
                </Typography>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="description-content"
                        id="description-header"
                    >
                        <Typography>Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{description}</Typography>
                    </AccordionDetails>
                </Accordion>
                <CardActions>
                    <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                        <FaGithub /> Visit GitHub
                    </Link>
                </CardActions>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
