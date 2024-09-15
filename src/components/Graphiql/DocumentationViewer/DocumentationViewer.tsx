'use client';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Modal, Typography } from '@mui/material';
import {
    GraphQLField,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql';

interface DocumentationViewerProps {
    schema: GraphQLSchema;
}

const renderField = (field: GraphQLField<string, string>) => {
    if (field.type instanceof GraphQLObjectType) {
        const subFields = field.type.getFields();
        return (
            <ul>
                {Object.keys(subFields).map((subFieldName) => (
                    <li key={subFieldName}>
                        <strong onClick={() => {}} style={{ cursor: 'pointer' }}>
                            {subFieldName}
                        </strong>
                        : {subFields[subFieldName].type.toString()}
                        {renderField(subFields[subFieldName])}
                    </li>
                ))}
            </ul>
        );
    }
    return null;
};

const FieldViewer: FC<{
    fieldName: string;
    field: GraphQLField<string, string>;
}> = ({ fieldName, field }) => {
    const [showSubFields, setShowSubFields] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const handleToggle = () => {
        setShowSubFields(!showSubFields);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Typography onClick={handleToggle} style={{ cursor: 'pointer' }}>
                <strong>{fieldName}</strong>: {field.type.toString()}
                {field.type === GraphQLString ? ' (String)' : ''}
                {showSubFields ? <ExpandMoreIcon /> : null}
            </Typography>
            {showSubFields && renderField(field)}

            <Modal open={open} onClose={handleClose}>
                <Box sx={{ padding: 4, backgroundColor: 'white', borderRadius: 2 }}>
                    <Typography variant="h6">
                        Validation Rules for {fieldName}
                    </Typography>
                    <Typography>
                        {field.astNode?.directives?.map((directive) => {
                            return (
                                <div key={directive.name.value}>
                                    <strong>{directive.name.value}:</strong>{' '}
                                    {JSON.stringify(directive.arguments)}
                                </div>
                            );
                        })}
                        {!field.astNode?.directives && (
                            <Typography>No validation rules found.</Typography>
                        )}
                    </Typography>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 2 }}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

const DocumentationViewer: FC<DocumentationViewerProps> = ({ schema }) => {
    const queryType = schema.getQueryType() as GraphQLObjectType;
    const fields = queryType.getFields();

    const { t } = useTranslation();

    return (
        <Box mt={4}>
            <Typography variant="h6">{t('graphqlClient:docs')}</Typography>
            {Object.keys(fields).map((fieldName) => (
                <FieldViewer
                    key={fieldName}
                    fieldName={fieldName}
                    field={fields[fieldName]}
                />
            ))}
        </Box>
    );
};

export default DocumentationViewer;
