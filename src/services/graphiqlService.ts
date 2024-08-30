import axios from 'axios';

import { Header } from '../types/interfaces';

export const executeGraphQLQuery = async (
    endpointUrl: string,
    query: string,
    variables: string,
    headers: Header[]
): Promise<{ statusCode: number; response: unknown }> => {
    try {
        const headersObject = headers.reduce(
            (acc, header) => {
                acc[header.key] = header.value;
                return acc;
            },
            {} as Record<string, string>
        );

        const response = await axios.post(
            endpointUrl,
            {
                query,
                variables: JSON.parse(variables || '{}'),
            },
            { headers: headersObject }
        );

        return {
            statusCode: response.status,
            response: response.data,
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                statusCode: error.response?.status || 500,
                response: error.response?.data || {
                    message: 'Unknown error occurred',
                },
            };
        } else {
            return {
                statusCode: 500,
                response: { message: 'Unknown error occurred' },
            };
        }
    }
};
