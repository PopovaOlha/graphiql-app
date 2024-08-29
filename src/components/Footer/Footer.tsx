'use client';

import { useState } from 'react';
import { GitHub } from '@mui/icons-material';
import {
    Box,
    BoxProps,
    Container,
    IconButton,
    Link,
    styled,
    Tooltip,
    Typography,
} from '@mui/material';
import Image from 'next/image';

import rsIcon from '@/assets/icons/rs.svg';

interface ListProps extends BoxProps {
    isVisible?: boolean;
}

const StyledFooter = styled(Box)<BoxProps>(({ theme }) => ({
    padding: '1rem',
    marginTop: 'auto',
    background: theme.palette.action.hover,
}));

const GitHubList = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isVisible',
})<ListProps>(({ theme, isVisible }) => ({
    position: 'absolute',
    bottom: 'calc(100% + 1.5rem)',
    left: '36px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    background: theme.palette.action.hover,
    opacity: '0',
    transition: 'opacity 0.5s, transform 0.5s',
    transform: 'translate(0, 2rem)',
    height: '0',
    padding: '0',
    overflow: 'hidden',
    borderRadius: '0.5rem',
    visibility: 'hidden',
    ...(isVisible && {
        opacity: '1',
        height: 'auto',
        padding: '1rem',
        transform: 'translate(0, 0)',
        visibility: 'visible',
    }),
}));

const StyledLink = styled(Link)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
}));

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);
    const currentYear = new Date().getFullYear();

    return (
        <StyledFooter component={'footer'}>
            <Container
                maxWidth="xl"
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                }}
            >
                <Tooltip title={`${isVisible ? 'Hide' : 'Show'} authors' GitHub`}>
                    <IconButton
                        size="large"
                        onClick={() => setIsVisible(!isVisible)}
                    >
                        <GitHub fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                <GitHubList isVisible={isVisible}>
                    <StyledLink
                        href="https://github.com/PopovaOlha"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GitHub sx={{ fontSize: '1rem' }} /> Olha Popova
                    </StyledLink>
                    <StyledLink
                        href="https://github.com/SvitlanaG"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GitHub sx={{ fontSize: '1rem' }} /> Svitlana Grytsai
                    </StyledLink>
                    <StyledLink
                        href="https://github.com/kot-vmeshke"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GitHub sx={{ fontSize: '1rem' }} /> Hanna Babai
                    </StyledLink>
                </GitHubList>
                <Typography variant="body1">&copy; {currentYear}</Typography>
                <Link
                    href="https://rs.school/courses/reactjs"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="RS School"
                >
                    <IconButton size="large" component={'span'}>
                        <Image src={rsIcon} alt="RS School" width={32} height={32} />
                    </IconButton>
                </Link>
            </Container>
        </StyledFooter>
    );
};

export default Footer;
