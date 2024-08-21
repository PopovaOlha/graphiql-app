'use client';

import { I18nextProvider } from 'react-i18next';
import initTranslations from '../app/i18n';
import { createInstance, Resource } from 'i18next';
import { FC, ReactNode } from 'react';

export interface TranslationProviderProps {
    children: ReactNode;
    locale: string;
    namespaces: string[];
    resources: Resource;
}

const TranslationsProvider: FC<TranslationProviderProps> = ({
    children,
    locale,
    namespaces,
    resources,
}) => {
    const i18n = createInstance();

    initTranslations(locale, namespaces, i18n, resources);

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export { TranslationsProvider };
