import { render, screen } from '@testing-library/react';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

const ComponentWithError = () => {
    throw new Error('Mock error, everything is fine!');
};

describe('Error Boundary', () => {
    it('should render children without error', () => {
        render(
            <ErrorBoundary>
                <div>Child Component</div>
            </ErrorBoundary>
        );

        expect(screen.getByText('Child Component')).toBeInTheDocument();
    });

    it('should display error message when error is thrown', () => {
        render(
            <ErrorBoundary>
                <ComponentWithError />
            </ErrorBoundary>
        );

        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        expect(screen.getByText('Reset')).toBeInTheDocument();
    });
});
