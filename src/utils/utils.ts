import { ReadonlyURLSearchParams } from 'next/navigation';

import { KeyValuePair } from '@/types/interfaces';

interface Variable {
    name: string;
    value: string;
}

export const replaceVariablesInJson = (json: string, vars: Variable[]): string => {
    vars.forEach((variable) => {
        const regex = new RegExp(`{{${variable.name}}}`, 'g');
        let replacement: string;

        if (isValidJson(variable.value)) {
            replacement = variable.value;
        } else {
            replacement = `"${variable.value}"`;
        }
        json = json.replace(regex, replacement);
    });
    return json;
};

const isValidJson = (str: string): boolean => {
    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
};

export const updateQueryParams = (
    params: ReadonlyURLSearchParams,
    pairs: KeyValuePair[],
    index: number,
    path: string
) => {
    const currentParams = new URLSearchParams(params.toString());
    currentParams.delete(pairs[index].key);
    const newQuery = currentParams.toString();
    const newUrl = newQuery ? `${path}?${newQuery}` : `${path}`;
    window.history.pushState({}, '', newUrl);
};
