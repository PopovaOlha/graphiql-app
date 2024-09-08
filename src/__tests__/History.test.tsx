import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import PagesLayout from '@/app/[locale]/history/layout';
import History from '@/app/[locale]/history/page';
import { AppThemeProvider } from '@/theme/AppThemeProvider';

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

vi.mock('next/navigation', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...(actual as object),
        useRouter: vi.fn(),
    };
});

vi.mock('next/font/google', () => {
    return {
        Inter: () => ({
            style: {
                fontFamily: 'Inter, sans-serif',
            },
        }),
    };
});

describe('History Page', () => {
    it('Should be rendered', () => {
        render(<History />);

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
            'history:title'
        );
    });

    it('Renders history items when they exist', () => {
        const historyItems = [
            {
                method: 'GET',
                url: 'https://example.com',
                timestamp: Date.now(),
                path: '/example',
            },
        ];

        localStorage.setItem('RGC-history', JSON.stringify(historyItems));

        render(
            <AppThemeProvider>
                <History />
            </AppThemeProvider>
        );

        expect(screen.getByText('GET')).toBeInTheDocument();
        expect(screen.getByText('URL:')).toBeInTheDocument();
        expect(screen.getByText('https://example.com')).toBeInTheDocument();
    });
});

describe('PagesLayout Component', () => {
    it('renders children inside SecondaryLayout', () => {
        const testChild = <div>Test Child</div>;

        render(<PagesLayout>{testChild}</PagesLayout>);

        expect(screen.getByText('Test Child')).toBeInTheDocument();
    });
});
