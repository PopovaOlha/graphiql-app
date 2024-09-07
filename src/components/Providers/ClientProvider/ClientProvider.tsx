'use client';

import { FC } from 'react';

import { TranslationsProvider } from '@/components/Providers/TranslationsProvider';
import { AppThemeProvider } from '@/theme/AppThemeProvider';
import { ClientProviderProps } from '@/types/interfaces';

import AuthProvider from '../authProvider';

const ClientProvider: FC<ClientProviderProps> = ({
    children,
    locale,
    resources,
    i18nNamespaces,
}) => {
    return (
        <AppThemeProvider>
            <AuthProvider>
                <TranslationsProvider
                    namespaces={i18nNamespaces}
                    locale={locale}
                    resources={resources}
                >
                    {children}
                </TranslationsProvider>
            </AuthProvider>
        </AppThemeProvider>
    );
};

export default ClientProvider;
