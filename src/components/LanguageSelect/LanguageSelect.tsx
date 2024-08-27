'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { i18nConfig } from '../../../i18nConfig';
import styles from './LanguageSelect.module.scss';

const LanguageSelect = () => {
    const { i18n, t } = useTranslation();
    const currentLocale = i18n.language;
    const router = useRouter();
    const currentPathname = usePathname();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;

        const days = 30;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = date.toUTCString();
        document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

        if (currentLocale === i18nConfig.defaultLocale) {
            router.push('/' + newLocale + currentPathname);
        } else {
            router.push(
                currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
            );
        }

        router.refresh();
    };

    return (
        <select
            onChange={handleChange}
            value={currentLocale}
            className={styles.languageSelect}
        >
            <option value="en">{t('English')}</option>
            <option value="ru">{t('Russian')}</option>
        </select>
    );
};

export { LanguageSelect };
