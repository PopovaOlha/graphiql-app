import { render } from '@testing-library/react';

import { Preloader } from '@/components/Preloader/Preloader';
import { AppThemeProvider } from '@/theme/AppThemeProvider';

import '@testing-library/jest-dom';

describe('Preloader component', () => {
    it('renders Preloader correctly', () => {
        const { asFragment } = render(
            <AppThemeProvider>
                <Preloader />
            </AppThemeProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
