import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const showApiError = (
    errorCode: string | number,
    t: (key: string) => string,
    errorMessage?: string
) => {
    let message = '';

    if (typeof errorCode === 'string' && errorCode.startsWith('auth/')) {
        message = t(`errors:${errorCode}`);
    } else if (typeof errorCode === 'number') {
        message = errorMessage || t(`errors:${errorCode.toString()}`);
    } else {
        message = t('errors:default');
    }

    toast.error(message, {
        position: 'bottom-center',
    });
};

export { showApiError };
