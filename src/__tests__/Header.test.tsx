import { useAuthState } from 'react-firebase-hooks/auth';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signOut } from 'firebase/auth';

import Header from '@/components/Header/Header';

import '@testing-library/jest-dom';

vi.mock('firebase/app', () => {
    return {
        initializeApp: vi.fn(() => ({})),
    };
});

vi.mock('firebase/auth', () => {
    return {
        getAuth: vi.fn(() => ({
            signInWithEmailAndPassword: vi.fn(() =>
                Promise.resolve({ user: { uid: '12345' } })
            ),
            onAuthStateChanged: vi.fn(() => {
                return () => {};
            }),
            currentUser: { uid: '12345', displayName: 'Test User' },
        })),
        signOut: vi.fn(() => Promise.resolve()),
        GoogleAuthProvider: vi.fn(() => ({})),
    };
});

vi.mock('firebase/firestore', () => {
    return {
        getFirestore: vi.fn(() => ({})),
    };
});

const mockPush = vi.fn();
const mockPathname = '/';
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
    usePathname: () => mockPathname,
}));

vi.mock('next/font/google', () => {
    return {
        Inter: () => ({
            style: {
                fontFamily: 'Inter, sans-serif',
            },
        }),
    };
});

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: {
            language: 'en',
        },
    }),
}));

vi.mock('react-firebase-hooks/auth', () => ({
    useAuthState: vi.fn(),
}));

describe('Header Component', () => {
    const user = userEvent.setup();

    it('should render the Header with Logo, LanguageSelect, and sign-in/sign-up buttons when user is not authenticated', () => {
        (useAuthState as ReturnType<typeof vi.fn>).mockReturnValue([
            null,
            false,
            undefined,
        ]);

        render(<Header />);

        expect(screen.getByRole('link', { name: /logo/i })).toBeInTheDocument();
        expect(
            screen.getByRole('combobox', { name: /language/i })
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /signIn/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /signUp/i })).toBeInTheDocument();
    });

    it('should render the main page and sign-out buttons when user is authenticated', () => {
        (useAuthState as ReturnType<typeof vi.fn>).mockReturnValue([
            { uid: '12345', displayName: 'Test User' },
            false,
            undefined,
        ]);

        render(<Header />);

        expect(
            screen.getByRole('button', { name: /mainPage/i })
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /signOut/i })).toBeInTheDocument();
    });

    it('should navigate to sign-in page when clicking on the sign-in button', async () => {
        (useAuthState as ReturnType<typeof vi.fn>).mockReturnValue([
            null,
            false,
            undefined,
        ]);

        render(<Header />);

        await user.click(screen.getByRole('button', { name: /signIn/i }));

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/signin');
        });
    });

    it('should navigate to sign-up page when clicking on the sign-up button', async () => {
        (useAuthState as ReturnType<typeof vi.fn>).mockReturnValue([
            null,
            false,
            undefined,
        ]);

        render(<Header />);

        await user.click(screen.getByRole('button', { name: /signUp/i }));

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/signup');
        });
    });

    it('should sign out the user when clicking on the sign-out button', async () => {
        (useAuthState as ReturnType<typeof vi.fn>).mockReturnValue([
            { uid: '12345', displayName: 'Test User' },
            false,
            undefined,
        ]);

        render(<Header />);

        await user.click(screen.getByRole('button', { name: /signOut/i }));

        await waitFor(() => {
            expect(signOut).toHaveBeenCalled();
            expect(mockPush).toHaveBeenCalledWith('/');
        });
    });

    it('should update header style when scrolling', () => {
        (useAuthState as ReturnType<typeof vi.fn>).mockReturnValue([
            { uid: '12345', displayName: 'Test User' },
            false,
            undefined,
        ]);

        render(<Header />);

        window.scrollY = 100;
        window.dispatchEvent(new Event('scroll'));

        const header = screen.getByRole('banner');
        expect(header).toHaveStyle('padding: 1.25rem');
    });
});
