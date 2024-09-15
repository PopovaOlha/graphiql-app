import { useAuthState } from 'react-firebase-hooks/auth';
import { fireEvent, render, screen } from '@testing-library/react';

import { mockAuth } from '@/__mocks__/firebase';
import WelcomePage from '@/app/[locale]/welcomepage/page';

import '@testing-library/jest-dom';

vi.mock('firebase/app', () => ({
    initializeApp: vi.fn(() => ({})),
}));

vi.mock('firebase/auth', () => ({
    getAuth: vi.fn(() => ({
        signInWithEmailAndPassword: vi.fn(() =>
            Promise.resolve({ user: { uid: '12345' } })
        ),
        onAuthStateChanged: vi.fn(() => () => {}),
        currentUser: { uid: '12345', displayName: 'Test User' },
    })),
    GoogleAuthProvider: vi.fn(() => ({})),
}));

vi.mock('firebase/firestore', () => ({
    getFirestore: vi.fn(() => ({})),
}));

vi.mock('next/font/google', () => ({
    Inter: () => ({
        style: {
            fontFamily: 'Inter, sans-serif',
        },
    }),
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

vi.mock('react-firebase-hooks/auth', () => ({
    useAuthState: vi.fn(),
}));

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('WelcomePage', () => {
    it('should render welcome back message when user is logged in', () => {
        (useAuthState as ReturnType<typeof vi.fn>).mockReturnValue([
            mockAuth.currentUser,
            false,
            undefined,
        ]);

        render(<WelcomePage />);

        expect(screen.getByRole('heading', { level: 1 }).textContent).toContain(
            'welcomePage:welcomeBack'
        );
        expect(
            screen.getByText('welcomePage:appDescriptionLoggedIn')
        ).toBeInTheDocument();
        expect(screen.getByText('welcomePage:restClient')).toBeInTheDocument();
        expect(screen.getByText('welcomePage:graphiqlClient')).toBeInTheDocument();
        expect(screen.getByText('welcomePage:history')).toBeInTheDocument();
    });

    it('should render welcome message when user is not logged in', () => {
        (useAuthState as ReturnType<typeof vi.fn>).mockReturnValue([
            null,
            false,
            undefined,
        ]);

        render(<WelcomePage />);

        const heading = screen.getByRole('heading', { level: 1 });

        expect(heading).toHaveTextContent('welcomePage:welcome');
        expect(
            screen.getByText('welcomePage:appDescriptionLoggedOut')
        ).toBeInTheDocument();
        expect(screen.getByText('welcomePage:signIn')).toBeInTheDocument();
        expect(screen.getByText('welcomePage:signUp')).toBeInTheDocument();
    });

    it('should navigate to sign in page when Sign In button is clicked', () => {
        (useAuthState as ReturnType<typeof vi.fn>).mockReturnValue([
            null,
            false,
            undefined,
        ]);

        render(<WelcomePage />);

        const signInButton = screen.getByText('welcomePage:signIn');
        fireEvent.click(signInButton);

        expect(mockPush).toHaveBeenCalledWith('/signin');
    });

    it('should navigate to sign up page when Sign Up button is clicked', () => {
        (useAuthState as ReturnType<typeof vi.fn>).mockReturnValue([
            null,
            false,
            undefined,
        ]);

        render(<WelcomePage />);

        const signUpButton = screen.getByText('welcomePage:signUp');
        fireEvent.click(signUpButton);

        expect(mockPush).toHaveBeenCalledWith('/signup');
    });

    it('should navigate to rest client page when Rest Client button is clicked', () => {
        (useAuthState as ReturnType<typeof vi.fn>).mockReturnValue([
            mockAuth.currentUser,
            false,
            undefined,
        ]);

        render(<WelcomePage />);

        const restClientButton = screen.getByText('welcomePage:restClient');
        fireEvent.click(restClientButton);

        expect(mockPush).toHaveBeenCalledWith('/restful/GET');
    });
});
