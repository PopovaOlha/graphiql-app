import { ToastContainer } from 'react-toastify';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { dir } from 'i18next';
import type { Metadata } from 'next';

import initTranslations from '@/app/i18n';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ClientProvider from '@/components/Providers/ClientProvider/ClientProvider';

import { i18nConfig } from '../../../i18nConfig';

import '@/app/globals.scss';

export function generateStaticParams() {
    return i18nConfig.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
    title: 'REST/GraphQL Client',
    description: 'Generated by create next app',
};

const i18nNamespaces: string[] = [
    'mainPage',
    'errors',
    'restClient',
    'authors',
    'welcomePage',
    'history',
    'graphqlClient',
];

export default async function RootLayout({
    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    const { resources } = await initTranslations(locale, i18nNamespaces);
    return (
        <html lang={locale} dir={dir(locale)}>
            <body>
                <ErrorBoundary>
                    <AppRouterCacheProvider>
                        <ClientProvider
                            locale={locale}
                            resources={resources}
                            i18nNamespaces={i18nNamespaces}
                        >
                            <Header />
                            <ToastContainer />
                            {children}
                            <Footer />
                        </ClientProvider>
                    </AppRouterCacheProvider>
                </ErrorBoundary>
            </body>
        </html>
    );
}
