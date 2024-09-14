import { fireEvent, render } from '@testing-library/react';
import { Resource } from 'i18next';

import { LanguageSelect } from '@/components/LanguageSelect/LanguageSelect';
import { TranslationsProvider } from '@/components/Providers/TranslationsProvider';

import '@testing-library/jest-dom';

vi.mock('next/navigation', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...(actual as object),
        notFound: vi.fn(),
        usePathname: vi.fn(() => ''),
        useRouter: vi.fn(() => ({
            push: vi.fn(),
            refresh: vi.fn(),
        })),
        useParams: vi.fn(() => ({
            method: 'GET',
        })),
        useSearchParams: () => ({
            entries: () =>
                [
                    ['param1', 'value1'],
                    ['param2', 'value2'],
                ][Symbol.iterator](),
        }),
    };
});

vi.mock('react-i18next', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...(actual as object),
        I18nextProvider: ({ children }: { children: React.ReactNode }) => (
            <div>{children}</div>
        ),
        useTranslation: () => ({
            t: (key: string) => key,
            i18n: {
                language: 'en',
                changeLanguage: vi.fn(),
            },
        }),
    };
});

const mockResources: Resource = {
    en: {
        mainPage: {
            languages: {
                ru: 'Russian',
                en: 'English',
                label: 'Language',
            },
        },
    },
    ru: {
        mainPage: {
            languages: {
                ru: 'Русский',
                en: 'Английский',
                label: 'Язык',
            },
        },
    },
};

describe('LanguageSelect component', () => {
    it('renders LanguageSelect correctly', () => {
        const { asFragment } = render(
            <TranslationsProvider
                namespaces={['mainPage']}
                locale={'en'}
                resources={mockResources}
            >
                <LanguageSelect />
            </TranslationsProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('changes language and sets cookie on selection', () => {
        const { getByRole } = render(
            <TranslationsProvider
                namespaces={['mainPage']}
                locale={'en'}
                resources={mockResources}
            >
                <LanguageSelect />
            </TranslationsProvider>
        );

        const select = getByRole('combobox');
        fireEvent.change(select, { target: { value: 'ru' } });

        expect(document.cookie).toContain('NEXT_LOCALE=ru');
    });
});
