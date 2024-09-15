import { initReactI18next } from 'react-i18next/initReactI18next';
import { createInstance, i18n, Resource, TFunction } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

import { i18nConfig } from '../../i18nConfig';

interface InitTranslationsReturn {
    i18n: i18n;
    resources: Resource;
    t: TFunction;
}

export default async function initTranslations(
    locale: string,
    namespaces: string[],
    i18nInst: i18n = createInstance(),
    resources?: Resource
): Promise<InitTranslationsReturn> {
    const i18nInstance = i18nInst || createInstance();

    i18nInstance.use(initReactI18next);

    if (!resources) {
        i18nInstance.use(
            resourcesToBackend(
                (language: string, namespace: string) =>
                    import(`../../public/locales/${language}/${namespace}.json`)
            )
        );
    }

    await i18nInstance.init({
        lng: locale,
        resources,
        fallbackLng: i18nConfig.defaultLocale,
        supportedLngs: i18nConfig.locales,
        defaultNS: namespaces[0],
        fallbackNS: namespaces[0],
        ns: namespaces,
        preload: resources ? [] : i18nConfig.locales,
    });

    return {
        i18n: i18nInstance,
        resources: i18nInstance.services.resourceStore.data,
        t: i18nInstance.t,
    };
}
