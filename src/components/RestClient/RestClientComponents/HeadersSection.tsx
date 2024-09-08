'use client';

import { ChangeEvent, FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, TextField, useTheme } from '@mui/material';
import { usePathname } from 'next/navigation';

import { KeyValuePair } from '@/types/interfaces';

interface HeadersSectionProps {
    keyValuePairs: KeyValuePair[];
    handleKeyChange: (
        index: number,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleValueChange: (
        index: number,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleRemovePair: (index: number) => void;
    handleAddPair: () => void;
}

const HeadersSection: FC<HeadersSectionProps> = ({
    keyValuePairs,
    handleKeyChange,
    handleValueChange,
    handleRemovePair,
    handleAddPair,
}) => {
    const { t } = useTranslation();
    const pathname = usePathname();
    const theme = useTheme();

    useEffect(() => {
        window.history.replaceState(null, '', pathname);

        const newQueries = new URLSearchParams();
        keyValuePairs.forEach((pair) => {
            if (pair.key.length && pair.value.length) {
                newQueries.set(pair.key, pair.value);
            }
        });
        window.history.pushState({}, '', `${pathname}?${newQueries.toString()}`);
    }, [keyValuePairs, pathname]);

    return (
        <>
            {keyValuePairs.map((pair, index) => (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '42% 42% 16%',
                        marginBottom: '1rem',
                    }}
                    key={index}
                >
                    <TextField
                        label={t('restClient:headers.keyPlaceholder')}
                        placeholder={t('restClient:headers.keyPlaceholder')}
                        variant="standard"
                        fullWidth
                        value={pair.key}
                        onChange={(event) => handleKeyChange(index, event)}
                        sx={{
                            pr: '1rem',
                            '.MuiInputBase-input:-webkit-autofill': {
                                boxShadow: `inset 0 0 0 50px ${theme.palette.background.default}`,
                                WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                            },
                        }}
                    />
                    <TextField
                        label={t('restClient:headers.valuePlaceholder')}
                        placeholder={t('restClient:headers.valuePlaceholder')}
                        variant="standard"
                        fullWidth
                        value={pair.value}
                        onChange={(event) => handleValueChange(index, event)}
                        sx={{
                            pr: '1rem',
                            '.MuiInputBase-input:-webkit-autofill': {
                                boxShadow: `inset 0 0 0 50px ${theme.palette.background.default}`,
                                WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                            },
                        }}
                    />
                    <IconButton
                        color="secondary"
                        onClick={() => handleRemovePair(index)}
                        aria-label={t('restClient:headers.removeButton')}
                        sx={{ justifySelf: 'start', aspectRatio: '1' }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddPair}
                sx={{ marginTop: 4 }}
            >
                {t('restClient:headers.addHeaderButton')}
            </Button>
        </>
    );
};

export { HeadersSection };
