import { ReactNode } from 'react';
import { ResourceLanguage } from 'i18next';

export interface Header {
    key: string;
    value: string;
}

export interface GraphiQLState {
    endpointUrl: string;
    sdlUrl: string;
    query: string;
    variables: string;
    headers: Header[];
    response: string;
    statusCode: number;
}

export interface ServiceAccount {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
    universe_domain: string;
}

export interface ErrorBoundaryProps {
    children: ReactNode;
}

export interface ApiErrorProps {
    errorCode: number;
    errorMessage: string;
}

export interface ClientProviderProps {
    children: ReactNode;
    locale: string;
    resources: Record<string, ResourceLanguage>;
    i18nNamespaces: string[];
}
