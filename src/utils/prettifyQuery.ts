import prettier from 'prettier';
import parserGraphql from 'prettier/parser-graphql';

export const prettifyQuery = async (query: string): Promise<string> => {
    try {
        return prettier.format(query, {
            parser: 'graphql',
            plugins: [parserGraphql],
        });
    } catch (error) {
        console.error('Error prettifying query:', error);
        return query;
    }
};
