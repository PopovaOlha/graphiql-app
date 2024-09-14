import { FC } from 'react';
import { Box } from '@mui/material';
import { GraphQLField, GraphQLObjectType, GraphQLSchema } from 'graphql';

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
                        <strong>{subFieldName}</strong>:{' '}
                        {subFields[subFieldName].type.toString()}
                        {renderField(subFields[subFieldName])}
                    </li>
                ))}
            </ul>
        );
    }
    return null;
};

const DocumentationViewer: FC<DocumentationViewerProps> = ({ schema }) => {
    const queryType = schema.getQueryType() as GraphQLObjectType;
    const fields = queryType.getFields();

    return (
        <Box mt={4}>
            <ul>
                {Object.keys(fields).map((fieldName) => (
                    <li key={fieldName}>
                        <strong>{fieldName}</strong>:{' '}
                        {fields[fieldName].type.toString()}
                        {renderField(fields[fieldName])}
                    </li>
                ))}
            </ul>
        </Box>
    );
};

export default DocumentationViewer;
