import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { url, headers, body } = await request.json();

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body,
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

export async function PUT(request: NextRequest) {
    try {
        const { url, headers, body } = await request.json();

        const response = await fetch(url, {
            method: 'PUT',
            headers,
            body,
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

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const url = searchParams.get('url');

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        const response = await fetch(url);

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

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const url = searchParams.get('url');

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        const response = await fetch(url, { method: 'DELETE' });

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
