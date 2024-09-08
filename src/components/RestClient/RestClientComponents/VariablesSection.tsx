'use client';

import { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, TextField, useTheme } from '@mui/material';

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
    const theme = useTheme();

    return (
        <>
            {variables.map((variable, index) => (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '42% 42% 16%',
                        marginBottom: '1rem',
                    }}
                    key={index}
                >
                    <TextField
                        label={t('restClient:variables.namePlaceholder')}
                        placeholder={t('restClient:variables.namePlaceholder')}
                        variant="standard"
                        fullWidth
                        value={variable.name}
                        onChange={(event) => handleNameChange(index, event)}
                        sx={{
                            pr: '1rem',
                            '.MuiInputBase-input:-webkit-autofill': {
                                boxShadow: `inset 0 0 0 50px ${theme.palette.background.default}`,
                                WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                            },
                        }}
                    />
                    <TextField
                        label={t('restClient:variables.valuePlaceholder')}
                        placeholder={t('restClient:variables.valuePlaceholder')}
                        variant="standard"
                        fullWidth
                        value={variable.value}
                        onChange={(event) => handleVarValueChange(index, event)}
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
                        onClick={() => handleRemoveVariable(index)}
                        aria-label={t('restClient:variables.removeButton')}
                        sx={{ justifySelf: 'start', aspectRatio: '1' }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddVariable}
                sx={{ marginTop: 4 }}
            >
                {t('restClient:variables.addVariableButton')}
            </Button>
        </>
    );
};

export { VariablesSection };
