'use client';

import { FC } from 'react';
import { Provider } from 'react-redux';

import { TranslationsProvider } from '@/components/Providers/TranslationsProvider';
import { store } from '@/store/store';
import { AppThemeProvider } from '@/theme/AppThemeProvider';
import { ClientProviderProps } from '@/types/interfaces';

const ClientProvider: FC<ClientProviderProps> = ({
    children,
    locale,
    resources,
    i18nNamespaces,
}) => {
    return (
        <Provider store={store}>
            <AppThemeProvider>
                <TranslationsProvider
                    namespaces={i18nNamespaces}
                    locale={locale}
                    resources={resources}
                >
                    {children}
                </TranslationsProvider>
            </AppThemeProvider>
        </Provider>
    );
};

export default ClientProvider;
