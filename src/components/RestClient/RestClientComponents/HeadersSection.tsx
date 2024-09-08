import { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, IconButton, TextField } from '@mui/material';

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

    return (
        <>
            {keyValuePairs.map((pair, index) => (
                <Grid
                    container
                    spacing={2}
                    sx={{ mb: 2 }}
                    key={index}
                    alignItems="center"
                >
                    <Grid item xs={5}>
                        <TextField
                            label={t('restClient:headers.keyPlaceholder')}
                            placeholder={t('restClient:headers.keyPlaceholder')}
                            variant="outlined"
                            fullWidth
                            value={pair.key}
                            onChange={(event) => handleKeyChange(index, event)}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            label={t('restClient:headers.valuePlaceholder')}
                            placeholder={t('restClient:headers.valuePlaceholder')}
                            variant="outlined"
                            fullWidth
                            value={pair.value}
                            onChange={(event) => handleValueChange(index, event)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            color="secondary"
                            onClick={() => handleRemovePair(index)}
                            aria-label={t('restClient:headers.removeButton')}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddPair}
                sx={{ marginTop: 2 }}
            >
                {t('restClient:headers.addHeaderButton')}
            </Button>
        </>
    );
};

export { HeadersSection };
