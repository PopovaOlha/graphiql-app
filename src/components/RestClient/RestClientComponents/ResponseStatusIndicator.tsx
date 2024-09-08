import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

interface IndicatorProps {
    responseCode: number | string;
    responseStatus: string;
}

const ResponseStatusIndicator: FC<IndicatorProps> = ({
    responseCode,
    responseStatus,
}) => {
    const { t } = useTranslation();
    return (
        <Box sx={{ padding: '1rem 0' }}>
            {t('restClient:response.status')} {responseCode} {responseStatus}
        </Box>
    );
};

export { ResponseStatusIndicator };
