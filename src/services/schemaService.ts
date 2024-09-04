import axios from 'axios';
import { buildClientSchema, getIntrospectionQuery, GraphQLSchema } from 'graphql';

export const fetchGraphQLSchema = async (
    endpointUrl: string,
    headers: Record<string, string>
): Promise<GraphQLSchema | null> => {
    try {
        const introspectionQuery = getIntrospectionQuery();

        const response = await axios.post(
            endpointUrl,
            {
                query: introspectionQuery,
            },
            { headers }
        );

        if (response.data.errors) {
            console.error('Introspection query errors:', response.data.errors);
            return null;
        }

        const schema = buildClientSchema(response.data.data);
        return schema;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Error fetching schema: ${error.message}`, {
                url: endpointUrl,
                status: error.response?.status,
                data: error.response?.data,
                headers: error.config?.headers,
            });
        } else {
            console.error('An unknown error occurred:', error);
        }
        return null;
    }
};
