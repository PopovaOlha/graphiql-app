import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import '@testing-library/jest-dom';

import SecondaryLayout from '../components/SecondaryLayout/SecondaryLayout';

describe('Secondary Layout', () => {
    it('Should be rendered', () => {
        render(
            <SecondaryLayout>
                <span></span>
            </SecondaryLayout>
        );

        expect(screen.getByText('GraphiQL')).toBeInTheDocument();
    });
    it('Should renders children', () => {
        render(
            <SecondaryLayout>
                <span data-testid="test">Test</span>
            </SecondaryLayout>
        );

        expect(screen.getByTestId('test')).toBeInTheDocument();
    });
});
