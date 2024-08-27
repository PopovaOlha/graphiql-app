import { render, screen } from '@testing-library/react';
import * as nextNavigation from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';

import NotFoundCatchAll from '../app/[locale]/[...not_found]/page';
import NotFound from '../app/[locale]/not-found';

vi.mock('next/navigation', () => ({
    notFound: vi.fn(),
}));

describe('Not Found page', () => {
    it('Page calls notFound', () => {
        NotFoundCatchAll();
        expect(nextNavigation.notFound).toHaveBeenCalled();
    });
    it('NotFound component should be rendered', () => {
        render(<NotFound />);
        expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('404');
    });
});
