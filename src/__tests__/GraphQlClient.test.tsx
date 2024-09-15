import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import DocumentationViewer from '@/components/Graphiql/DocumentationViewer/DocumentationViewer';
import GraphiQLClient from '@/components/Graphiql/GraphiQLClient/GraphiQLClient';
import { HeadersSection } from '@/components/Graphiql/HeadersSection/HeadersSection';
import { VariablesSection } from '@/components/Graphiql/VariableSection/VariableSection';
import { executeGraphQLQuery } from '@/services/graphiqlService';
import { fetchGraphQLSchema } from '@/services/schemaService';
import { AppThemeProvider } from '@/theme/AppThemeProvider';

import '@testing-library/jest-dom';

vi.mock('@/hooks/useUnauthorizedRedirect', () => ({
    default: vi.fn(),
}));

vi.mock('@/services/graphiqlService', () => ({
    executeGraphQLQuery: vi.fn().mockResolvedValue({
        statusCode: 200,
        data: { someField: 'someValue' },
    }),
}));

vi.mock('@/services/schemaService', () => ({
    fetchGraphQLSchema: vi.fn(),
}));

vi.mock('next/navigation', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...(actual as object),
        notFound: vi.fn(),
        usePathname: vi.fn(() => ''),
        useRouter: vi.fn(),
        useParams: vi.fn(() => ({
            method: 'GET',
        })),
        useSearchParams: () => ({
            entries: () =>
                [
                    ['param1', 'value1'],
                    ['param2', 'value2'],
                ][Symbol.iterator](),
        }),
    };
});

describe('GraphQL Client', () => {
    it('GraphQL Client renders correctly', () => {
        render(
            <AppThemeProvider>
                <GraphiQLClient body={''} />
            </AppThemeProvider>
        );

        expect(screen.getByText('graphqlClient:title')).toBeInTheDocument();
    });

    it('VariablesSection renders variables correctly', () => {
        const mockVariables = [{ name: 'testVar', value: 'testValue' }];

        render(
            <AppThemeProvider>
                <VariablesSection
                    variables={mockVariables}
                    handleAddVariable={vi.fn()}
                    handleNameChange={vi.fn()}
                    handleVarValueChange={vi.fn()}
                    handleRemoveVariable={vi.fn()}
                />
            </AppThemeProvider>
        );

        expect(screen.getByDisplayValue('testVar')).toBeInTheDocument();
        expect(screen.getByDisplayValue('testValue')).toBeInTheDocument();
    });

    it('Headers section shows default headers', () => {
        render(
            <AppThemeProvider>
                <HeadersSection
                    keyValuePairs={[
                        { key: 'Content-Type', value: 'application/json' },
                    ]}
                    handleKeyChange={vi.fn()}
                    handleValueChange={vi.fn()}
                    handleRemovePair={vi.fn()}
                    handleAddPair={vi.fn()}
                />
            </AppThemeProvider>
        );

        expect(screen.getByDisplayValue('Content-Type')).toBeInTheDocument();
        expect(screen.getByDisplayValue('application/json')).toBeInTheDocument();
    });

    it('Updates endpoint URL on input change', () => {
        render(<GraphiQLClient body={''} />);

        const endpointInput: HTMLInputElement = screen.getByLabelText(
            'graphqlClient:endpointUrl'
        );
        fireEvent.change(endpointInput, {
            target: { value: 'http://test.com/graphql' },
        });

        expect(endpointInput.value).toBe('http://test.com/graphql');
    });

    it('Documentation Viewer renders correctly', async () => {
        const mockSchema: GraphQLSchema = new GraphQLSchema({
            query: new GraphQLObjectType({
                name: 'Query',
                fields: {
                    hello: {
                        type: GraphQLString,
                        resolve: () => 'Hello, world!',
                    },
                },
            }),
        });
        render(
            <AppThemeProvider>
                <DocumentationViewer schema={mockSchema} />
            </AppThemeProvider>
        );

        expect(screen.getByText('graphqlClient:docs')).toBeInTheDocument();
    });

    it('Tabs show right content', () => {
        render(
            <AppThemeProvider>
                <GraphiQLClient body={''} />
            </AppThemeProvider>
        );

        const queryTab = screen.getByText(/graphqlClient:query/i);
        const variablesTab = screen.getByText(/graphqlClient:variables/i);
        const headersTab = screen.getByText(/graphqlClient:headers/i);

        expect(queryTab).toBeInTheDocument();
        expect(screen.getByTestId('empty-url')).toBeInTheDocument();

        fireEvent.click(variablesTab);
        expect(
            screen.getByText('restClient:variables.addVariableButton')
        ).toBeInTheDocument();

        fireEvent.click(headersTab);
        expect(
            screen.getByText('restClient:headers.addHeaderButton')
        ).toBeInTheDocument();
    });

    it('Client should update window.history.pushState on blur of URL input', () => {
        const mockPushState = vi.spyOn(window.history, 'pushState');

        render(
            <AppThemeProvider>
                <GraphiQLClient body={''} />
            </AppThemeProvider>
        );

        const urlInput = screen.getByPlaceholderText('graphqlClient:endpointUrl');

        fireEvent.change(urlInput, { target: { value: 'https://test.com' } });

        fireEvent.blur(urlInput);

        expect(mockPushState).toHaveBeenCalled();
    });

    it('Client send request to /api/graphql when form is submitted', async () => {
        render(
            <AppThemeProvider>
                <GraphiQLClient body={''} />
            </AppThemeProvider>
        );

        const submitButton = screen.getByText('graphqlClient:execute');

        const urlInput = screen.getByPlaceholderText('graphqlClient:endpointUrl');

        fireEvent.change(urlInput, { target: { value: 'https://test.com' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(executeGraphQLQuery).toHaveBeenCalledTimes(1);
        });
    });

    it('Client fetch documentation', async () => {
        render(
            <AppThemeProvider>
                <GraphiQLClient body={''} />
            </AppThemeProvider>
        );

        const executeButton = screen.getByText('graphqlClient:execute');
        const docsButton: HTMLButtonElement = screen.getByText(
            'graphqlClient:fetchDocs'
        );

        expect(docsButton).toBeDisabled();

        fireEvent.click(executeButton);

        await waitFor(() => {
            expect(docsButton).not.toBeDisabled();
        });

        fireEvent.click(docsButton);

        await waitFor(() => {
            expect(fetchGraphQLSchema).toHaveBeenCalledTimes(1);
        });
    });
});
