import { vi } from 'vitest';

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
    }),
}));
