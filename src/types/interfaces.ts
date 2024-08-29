import { ReactNode } from 'react';

export interface Header {
    key: string;
    value: string;
}

export interface GraphQLResponse {
    data: Record<string, unknown> | null;
    errors?: Array<{ message: string; [key: string]: unknown }>;
}

export interface GraphiQLState {
    endpointUrl: string;
    sdlUrl: string;
    query: string;
    variables: string;
    headers: Header[];
    response: GraphQLResponse | null;
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
