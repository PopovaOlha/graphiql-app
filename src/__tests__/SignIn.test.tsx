import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import SignIn from '@/components/SignIn/SignIn';

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
        GoogleAuthProvider: vi.fn(() => ({})),
    };
});

vi.mock('firebase/firestore', () => {
    return {
        getFirestore: vi.fn(() => ({})),
    };
});

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
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

describe('SignIn Component', () => {
    const user = userEvent.setup();
    it('should render the sign-in form', () => {
        render(<SignIn />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByText('login')).toBeInTheDocument();
        expect(screen.getByText('loginGoogle')).toBeInTheDocument();
    });

    it('should display validation errors when email or password is missing', async () => {
        render(<SignIn />);

        await user.click(screen.getByText('login'));

        await waitFor(() => {
            expect(screen.getByText('errorEmpty')).toBeInTheDocument();
        });
    });

    it('should display email format error if email is invalid', async () => {
        render(<SignIn />);

        await user.type(screen.getByLabelText(/email/i), 'invalid-email');
        await user.type(screen.getByLabelText(/password/i), 'Validpassword1!');
        await user.click(screen.getByText('login'));

        await waitFor(() => {
            expect(screen.getByText('errorEmail')).toBeInTheDocument();
        });
    });

    it('should display password format error if password is invalid', async () => {
        render(<SignIn />);

        await user.type(screen.getByLabelText(/email/i), 'test@example.com');
        await user.type(screen.getByLabelText(/password/i), 'short');
        await user.click(screen.getByText('login'));

        await waitFor(() => {
            expect(screen.getByText('errorPassword')).toBeInTheDocument();
        });
    });
});
