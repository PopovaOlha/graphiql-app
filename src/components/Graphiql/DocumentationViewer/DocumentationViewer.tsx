import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

interface DocumentationViewerProps {
    schema: GraphQLSchema;
}

const DocumentationViewer: FC<DocumentationViewerProps> = ({ schema }) => {
    const queryType = schema.getQueryType() as GraphQLObjectType;
    const fields = queryType.getFields();

    const { t } = useTranslation();

    return (
        <Box mt={4}>
            <h3>{t('graphqlClient:docs')}</h3>
            <ul>
                {Object.keys(fields).map((fieldName) => (
                    <li key={fieldName}>
                        <strong>{fieldName}</strong>:{' '}
                        {fields[fieldName].type.toString()}
                        {fields[fieldName].type === GraphQLString ? ' (String)' : ''}
                    </li>
                ))}
            </ul>
        </Box>
    );
};

export default DocumentationViewer;
