import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { RestClient } from '@/components/RestClient/RestClient';
import {
    ResponseStatusIndicator,
    RestForm,
    VariablesSection,
} from '@/components/RestClient/RestClientComponents';
import { AppThemeProvider } from '@/theme/AppThemeProvider';

import '@testing-library/jest-dom';

vi.mock('@/hooks/useUnauthorizedRedirect', () => ({
    default: vi.fn(),
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

const renderWithThemeProvider = (ui: React.ReactElement) => {
    return render(<AppThemeProvider>{ui}</AppThemeProvider>);
};

describe('Rest Client', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('Client renders', () => {
        renderWithThemeProvider(<RestClient body={''} />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('restClient:title');
    });

    it('Response indicator shows correct status', () => {
        renderWithThemeProvider(
            <ResponseStatusIndicator responseCode={200} responseStatus={''} />
        );
        const indicator = screen.getByTestId('indicator');
        expect(indicator).toBeInTheDocument();
        expect(indicator.textContent).toBe('restClient:response.status 200 ');
    });

    it('No body editor if no URL is provided', async () => {
        renderWithThemeProvider(<RestClient body={''} />);

        const bodyTab = screen.getByLabelText('restClient:tabs.jsonBody');
        expect(bodyTab).toBeInTheDocument();

        fireEvent.click(bodyTab);

        await waitFor(() => {
            expect(screen.getByText('restClient:emptyURL')).toBeInTheDocument();
        });
    });

    it('Rest Form should allow changing URL and method', () => {
        const mockSendAnswer = vi.fn();
        const mockSendResponseStatus = vi.fn();

        renderWithThemeProvider(
            <RestForm
                body={''}
                sendAnswer={mockSendAnswer}
                sendResponseStatus={mockSendResponseStatus}
            />
        );

        const methodSelect = screen.getByDisplayValue('GET');
        const urlInput = screen.getByPlaceholderText('restClient:urlPlaceholder');
        const submitButton = screen.getByText('restClient:submitButton');

        fireEvent.change(urlInput, { target: { value: 'https://test.com' } });
        fireEvent.change(methodSelect, { target: { value: 'POST' } });

        expect(urlInput).toHaveValue('https://test.com');
        expect(methodSelect).toHaveValue('POST');
        expect(submitButton).not.toBeDisabled();
    });

    it('Rest Form sends request to /api/restful when form is submitted', async () => {
        const mockSendAnswer = vi.fn();
        const mockSendResponseStatus = vi.fn();
        const mockFetch = vi.fn(() =>
            Promise.resolve(
                new Response(JSON.stringify({ message: 'Success' }), {
                    status: 200,
                    statusText: 'OK',
                    headers: { 'Content-Type': 'application/json' },
                })
            )
        );
        global.fetch = mockFetch;

        renderWithThemeProvider(
            <RestForm
                body={''}
                sendAnswer={mockSendAnswer}
                sendResponseStatus={mockSendResponseStatus}
            />
        );

        const urlInput = screen.getByPlaceholderText('restClient:urlPlaceholder');
        const submitButton = screen.getByText('restClient:submitButton');

        fireEvent.change(urlInput, { target: { value: 'https://test.com' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/restful'),
                expect.any(Object)
            );
        });
    });

    it('Rest Form should update window.history.pushState on blur of URL input', () => {
        const mockPushState = vi.spyOn(window.history, 'pushState');
        const mockSendAnswer = vi.fn();
        const mockSendResponseStatus = vi.fn();

        renderWithThemeProvider(
            <RestForm
                body={''}
                sendAnswer={mockSendAnswer}
                sendResponseStatus={mockSendResponseStatus}
            />
        );

        const urlInput = screen.getByPlaceholderText('restClient:urlPlaceholder');

        fireEvent.change(urlInput, { target: { value: 'https://test.com' } });
        fireEvent.blur(urlInput);

        expect(mockPushState).toHaveBeenCalled();
        mockPushState.mockRestore();
    });

    it('VariablesSection renders variables correctly', () => {
        const mockVariables = [{ name: 'testVar', value: 'testValue' }];

        renderWithThemeProvider(
            <VariablesSection
                variables={mockVariables}
                handleAddVariable={vi.fn()}
                handleNameChange={vi.fn()}
                handleVarValueChange={vi.fn()}
                handleRemoveVariable={vi.fn()}
            />
        );

        expect(screen.getByDisplayValue('testVar')).toBeInTheDocument();
        expect(screen.getByDisplayValue('testValue')).toBeInTheDocument();
    });
});
