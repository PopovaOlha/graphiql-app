import axios from 'axios';
import { buildClientSchema, GraphQLSchema } from 'graphql';

export const fetchGraphQLSchema = async (
    sdlUrl: string,
    headers: Record<string, string>
): Promise<GraphQLSchema | null> => {
    try {
        const response = await axios.get(sdlUrl, { headers });
        const schema = buildClientSchema(response.data);
        return schema;
    } catch (error) {
        console.error('Error fetching schema:', error);
        return null;
    }
};
