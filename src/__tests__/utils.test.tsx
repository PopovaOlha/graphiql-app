import { toast } from 'react-toastify';
import { ReadonlyURLSearchParams } from 'next/navigation';
import * as prettier from 'prettier';
import { vi } from 'vitest';

import { prettifyQuery } from '@/utils/prettifyQuery';
import { showApiError } from '@/utils/showApiError';
import { replaceVariablesInJson, updateQueryParams } from '@/utils/utils';

vi.mock('prettier', () => ({
    format: vi.fn(),
}));

vi.mock('react-toastify', () => ({
    toast: {
        error: vi.fn(),
    },
}));

vi.mock('prettier/parser-graphql', () => ({}));

const mockT = vi.fn();

describe('Utils', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('prettifyQuery formats query correctly using prettier', async () => {
        const mockQuery = '{ hello }';
        const mockFormattedQuery = 'formatted query';

        (prettier.format as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
            mockFormattedQuery
        );

        const result = await prettifyQuery(mockQuery);

        expect(result).toBe(mockFormattedQuery);
    });

    it('prettifyQuery returns original query if prettier throws an error', async () => {
        const mockQuery = '{ hello }';

        (prettier.format as unknown as ReturnType<typeof vi.fn>).mockImplementation(
            () => {
                throw new Error('Mock error, everything is fine!');
            }
        );

        const result = await prettifyQuery(mockQuery);

        expect(result).toBe(mockQuery);
    });

    it('showApiError works correctly with strings', () => {
        mockT.mockReturnValue('Authentication Error');

        showApiError('auth/some-error', mockT);

        expect(toast.error).toHaveBeenCalledWith('Authentication Error', {
            position: 'bottom-center',
        });
    });

    it('showApiError should show numeric error message', () => {
        mockT.mockReturnValue('404 Not Found');
        showApiError(404, mockT);

        expect(toast.error).toHaveBeenCalledWith('404 Not Found', {
            position: 'bottom-center',
        });
    });

    it('showApiError should show default error message for unknown error code', () => {
        mockT.mockReturnValue('An unknown error occurred');

        showApiError('unknown-error', mockT);

        expect(toast.error).toHaveBeenCalledWith('An unknown error occurred', {
            position: 'bottom-center',
        });
    });

    it('replaceVariablesInJson should replace variables in JSON string correctly', () => {
        const json = '{"name": {{name}}, "age": {{age}}}';
        const vars = [
            { name: 'name', value: 'John' },
            { name: 'age', value: '30' },
        ];

        const result = replaceVariablesInJson(json, vars);
        expect(result).toBe('{"name": "John", "age": 30}');
    });

    it('updateQueryParams should works correctly', () => {
        window.history.pushState = vi.fn();

        const params = new URLSearchParams('key1=value1&key2=value2');
        const pairs = [
            { key: 'key1', value: 'value1' },
            { key: 'key2', value: 'value2' },
        ];
        const index = 0;
        const path = '/test-path';

        updateQueryParams(params as ReadonlyURLSearchParams, pairs, index, path);

        expect(window.history.pushState).toHaveBeenCalledWith(
            {},
            '',
            '/test-path?key2=value2'
        );
    });
});
