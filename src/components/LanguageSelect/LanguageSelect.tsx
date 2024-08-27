'use client';

import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

import { i18nConfig } from '../../../i18nConfig';

const LanguageSelect = () => {
    const router = useRouter();
    const currentPathname = usePathname();
    const { i18n, t } = useTranslation();
    const currentLocale = i18n.language;

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
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel variant="standard" htmlFor="language">
                {t('languages.label')}
            </InputLabel>
            <NativeSelect
                defaultValue={currentLocale}
                inputProps={{
                    name: 'language',
                    id: 'language',
                }}
                onChange={handleChange}
            >
                <option value="en">{t('languages.en')}</option>
                <option value="ru">{t('languages.ru')}</option>
            </NativeSelect>
        </FormControl>
    );
};

export { LanguageSelect };
