import { TranslationsProvider } from '@/components/TranslationsProvider';
import initTranslations from '../i18n';
import styles from './page.module.css';
import { LanguageSelect } from '@/components/LanguageSelect';

const i18nNamespaces: string[] = ['mainPage'];

export default async function Home({
    params: { locale },
}: {
    params: { locale: string };
}) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
        >
            <main className={styles.main}>
                <div className={styles.description}>
                    <h1>{t('title')}</h1>
                    <div style={{marginTop: '50px'}}>
                        <LanguageSelect/>
                    </div>
                </div>
            </main>
        </TranslationsProvider>
    );
}
