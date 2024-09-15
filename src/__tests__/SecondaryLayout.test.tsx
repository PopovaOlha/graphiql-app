import { render, screen } from '@testing-library/react';

import SecondaryLayout from '@/components/SecondaryLayout/SecondaryLayout';

import '@testing-library/jest-dom';

describe('Secondary Layout', () => {
    it('Should be rendered', () => {
        render(
            <SecondaryLayout>
                <span></span>
            </SecondaryLayout>
        );

        expect(screen.getByText('clients.graph')).toBeInTheDocument();
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
