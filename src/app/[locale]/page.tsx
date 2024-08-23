import { TranslationsProvider } from '@/components/TranslationsProvider';
import initTranslations from '../i18n';
import WelcomePage from './welcomepage/page';

const i18nNamespaces: string[] = ['mainPage'];

export default async function Home({
    params: { locale },
}: {
    params: { locale: string };
}) {
    const { resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
        >
            <WelcomePage />
        </TranslationsProvider>
    );
}
