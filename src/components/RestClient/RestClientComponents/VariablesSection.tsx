'use client';

import { ChangeEvent, FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, IconButton, TextField } from '@mui/material';

import { Variable } from '@/types/interfaces';

interface VariablesSectionProps {
    variables: Variable[];
    handleAddVariable: () => void;
    handleNameChange: (
        index: number,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleVarValueChange: (
        index: number,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleRemoveVariable: (index: number) => void;
}

const VariablesSection: FC<VariablesSectionProps> = ({
    variables,
    handleAddVariable,
    handleNameChange,
    handleVarValueChange,
    handleRemoveVariable,
}) => {
    const { t } = useTranslation();

    useEffect(() => {
        console.log({ variables });
    }, [variables]);

    return (
        <>
            {variables.map((variable, index) => (
                <Grid
                    container
                    spacing={2}
                    sx={{ mb: 2 }}
                    key={index}
                    alignItems="center"
                >
                    <Grid item xs={5}>
                        <TextField
                            label={t('restClient:variables.namePlaceholder')}
                            placeholder={t('restClient:variables.namePlaceholder')}
                            variant="outlined"
                            fullWidth
                            value={variable.name}
                            onChange={(event) => handleNameChange(index, event)}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            label={t('restClient:variables.valuePlaceholder')}
                            placeholder={t('restClient:variables.valuePlaceholder')}
                            variant="outlined"
                            fullWidth
                            value={variable.value}
                            onChange={(event) => handleVarValueChange(index, event)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            color="secondary"
                            onClick={() => handleRemoveVariable(index)}
                            aria-label={t('restClient:variables.removeButton')}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddVariable}
                sx={{ marginTop: 2 }}
            >
                {t('restClient:variables.addVariableButton')}
            </Button>
        </>
    );
};

export { VariablesSection };
