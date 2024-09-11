import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import SignUp from '@/components/SignUp/SignUp';

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

describe('SignUp Component', () => {
    const user = userEvent.setup();

    it('should render the sign-up form', () => {
        render(<SignUp />);

        expect(screen.getByLabelText(/userName/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(screen.getByLabelText(/passwordConfirm/i)).toBeInTheDocument();
        expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
    });

    it('should show validation errors for empty fields', async () => {
        render(<SignUp />);

        await user.click(screen.getByTestId('submit-btn'));

        await waitFor(() => {
            expect(screen.getByText('errorEmpty')).toBeInTheDocument();
        });
    });

    it('should show error for invalid email format', async () => {
        render(<SignUp />);

        await user.type(screen.getByLabelText(/userName/i), 'TestUser');
        await user.type(screen.getByLabelText(/email/i), 'invalid-email');
        await user.type(screen.getByTestId('password-input'), 'ValidPassword1!');
        await user.type(
            screen.getByLabelText(/passwordConfirm/i),
            'ValidPassword1!'
        );
        await user.click(screen.getByTestId('submit-btn'));

        await waitFor(() => {
            const errorMessage = screen.getByTestId('email-input');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it('should show error for invalid password format', async () => {
        render(<SignUp />);

        await user.type(screen.getByLabelText(/email/i), 'test@example.com');
        await user.type(screen.getByTestId('password-input'), 'short');
        await user.type(screen.getByLabelText(/passwordConfirm/i), 'short');
        await user.click(screen.getByTestId('submit-btn'));

        await waitFor(() => {
            const errorMessage = screen.getByTestId('password-input');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it('should show error when passwords do not match', async () => {
        render(<SignUp />);

        await user.type(screen.getByLabelText(/userName/i), 'TestUser');
        await user.type(screen.getByLabelText(/email/i), 'test@example.com');
        await user.type(screen.getByTestId('password-input'), 'ValidPassword1!');
        await user.type(
            screen.getByLabelText(/passwordConfirm/i),
            'DifferentPassword1!'
        );
        await user.click(screen.getByTestId('submit-btn'));

        await waitFor(() => {
            const errorMessage = screen.getByTestId('confirm-password-input');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it('should sign up user successfully', async () => {
        render(<SignUp />);

        await user.type(screen.getByLabelText(/userName/i), 'TestUser');
        await user.type(screen.getByLabelText(/email/i), 'test@example.com');
        await user.type(screen.getByTestId('password-input'), 'ValidPassword1!');
        await user.type(
            screen.getByLabelText(/passwordConfirm/i),
            'ValidPassword1!'
        );
        await user.click(screen.getByTestId('submit-btn'));

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/welcomepage');
        });
    });
});
