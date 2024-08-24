import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';

const containerStyles = {
    display: 'grid',
    gridTemplateColumns: '16rem 1fr',
};

const SecondaryLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div style={containerStyles}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    padding: '2rem',
                }}
            >
                <Link href={'/restful'}>REST Client</Link>
                <Link href={'/graphiql'}>GraphiQL Client</Link>
                <Link href={'/history'}>History</Link>
            </Box>
            {children}
        </div>
    );
};

export default SecondaryLayout;
