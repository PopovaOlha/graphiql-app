import { i18nRouter } from 'next-i18n-router';
import { i18nConfig } from '../i18nConfig';
import { NextRequest } from 'next/server';
import { verifyIdToken } from './utils/tokenUtils';

export async function middleware(request: NextRequest) {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (token) {
        try {
            const decodedToken = await verifyIdToken(token);
            console.log('Decoded token:', decodedToken);
        } catch (error) {
            console.error('Error verifying token:', error);
        }
    }

    return i18nRouter(request, i18nConfig);
}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)',
};
