import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Footer from '@/components/Footer/Footer';

import '@testing-library/jest-dom';

describe('Footer Component', () => {
    it('should render the Footer with GitHub button, current year, and RS School link', () => {
        render(<Footer />);

        expect(
            screen.getByRole('button', { name: /show authors' github/i })
        ).toBeInTheDocument();

        const currentYear = new Date().getFullYear();
        expect(screen.getByText(`© ${currentYear}`)).toBeInTheDocument();

        const rsSchoolLink = screen.getByRole('link', { name: /rs school/i });
        expect(rsSchoolLink).toBeInTheDocument();
        expect(screen.getByAltText('RS School')).toBeInTheDocument();
    });

    it('should toggle GitHub authors list visibility when the button is clicked', async () => {
        const user = userEvent.setup();
        render(<Footer />);

        const githubButton = screen.getByRole('button', {
            name: /show authors' github/i,
        });

        expect(screen.queryByText('Olha Popova')).not.toBeVisible();

        await user.click(githubButton);
        await waitFor(() => {
            expect(screen.getByText('Olha Popova')).toBeVisible();
        });

        await user.click(githubButton);
        await waitFor(() => {
            expect(screen.queryByText('Olha Popova')).not.toBeVisible();
        });
    });

    it('should contain correct GitHub links for the authors', async () => {
        render(<Footer />);

        const githubButton = screen.getByRole('button', {
            name: /show authors' github/i,
        });
        const user = userEvent.setup();
        await user.click(githubButton);

        expect(screen.getByRole('link', { name: /olha popova/i })).toHaveAttribute(
            'href',
            'https://github.com/PopovaOlha'
        );
        expect(
            screen.getByRole('link', { name: /svitlana grytsai/i })
        ).toHaveAttribute('href', 'https://github.com/SvitlanaG');
        expect(screen.getByRole('link', { name: /hanna babai/i })).toHaveAttribute(
            'href',
            'https://github.com/kot-vmeshke'
        );
    });
});
