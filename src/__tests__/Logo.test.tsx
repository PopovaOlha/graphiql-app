import { render } from '@testing-library/react';

import { Logo } from '@/components/Logo/Logo';
import { AppThemeProvider } from '@/theme/AppThemeProvider';

import '@testing-library/jest-dom';

describe('Logo component', () => {
    it('renders Logo correctly', () => {
        const { asFragment } = render(
            <AppThemeProvider>
                <Logo />
            </AppThemeProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
