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
