import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';

interface ScrollButtonTopProps {
    title: string;
    targetRef: React.RefObject<HTMLElement>;
}

const ScrollButtonTop = ({ title, targetRef }: ScrollButtonTopProps) => {
    const handleClick = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Button
            size="large"
            color="primary"
            onClick={handleClick}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '10rem',
                padding: '0.25rem 1rem',
                '.MuiButton-startIcon': {
                    transform: 'rotate(-90deg)',
                    margin: '0',
                    '& > :nth-of-type(1)': {
                        fontSize: '2rem',
                        alignContent: 'center',
                    },
                },
            }}
            startIcon={<ArrowForwardIosIcon />}
        >
            {title && <span>{title}</span>}
        </Button>
    );
};

export default ScrollButtonTop;
