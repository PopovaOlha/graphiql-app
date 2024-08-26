import { ApiErrorProps } from '@/types/interfaces';
import styles from './ApiError.module.scss';

const ApiError: React.FC<ApiErrorProps> = ({ errorCode, errorMessage }) => {
    let title = '';
    let message = '';

    switch (errorCode) {
        case 400:
            title = 'Bad Request';
            message =
                'The request could not be understood or was missing required parameters.';
            break;
        case 401:
            title = 'Unauthorized';
            message =
                'Authentication failed or user does not have permissions for the desired action.';
            break;
        case 403:
            title = 'Forbidden';
            message =
                'Authentication succeeded but authenticated user does not have access to the resource.';
            break;
        case 404:
            title = 'Not Found';
            message = 'The requested resource could not be found.';
            break;
        case 500:
            title = 'Internal Server Error';
            message = 'An error occurred on the server.';
            break;
        case 502:
            title = 'Bad Gateway';
            message = 'Received an invalid response from the upstream server.';
            break;
        case 503:
            title = 'Service Unavailable';
            message =
                'The server is currently unable to handle the request due to a temporary overload or maintenance.';
            break;
        default:
            title = `Error ${errorCode}`;
            message = errorMessage || 'An unexpected error occurred.';
            break;
    }

    return (
        <div className={styles.errorContainer}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
};

export default ApiError;
