import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { url, headers, query, variables } = await request.json();

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                ...headers,
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        if (!response.ok) {
            return NextResponse.json(
                {
                    error: `Request to ${url} failed with status ${response.status}: ${response.statusText}`,
                },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json(
            { error: errorMessage },
            {
                status: 500,
            }
        );
    }
}
