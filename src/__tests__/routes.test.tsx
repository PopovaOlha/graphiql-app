import { NextRequest } from 'next/server';

import { POST as GraphQLPost } from '../app/api//graphql/route';
import { DELETE, GET, POST, PUT } from '../app/api/restful/route';

describe('Restful route', () => {
    it('GET should works', async () => {
        const req = new NextRequest(
            'https://test?url=https://jsonplaceholder.typicode.com/todos/1',
            {
                method: 'GET',
            }
        );
        const response = await GET(req);

        expect(response.status).toBe(200);
        expect(await response.json()).toMatchObject({
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: false,
        });
    });

    it('DELETE should works', async () => {
        const req = new NextRequest(
            'https://test?url=https://jsonplaceholder.typicode.com/todos/1',
            {
                method: 'DELETE',
            }
        );
        const response = await DELETE(req);

        expect(response.status).toBe(200);
        expect(await response.json()).toMatchObject({});
    });

    it('POST should works', async () => {
        const req = new NextRequest('https://test', {
            method: 'POST',
            body: JSON.stringify({
                url: 'https://jsonplaceholder.typicode.com/posts',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: 'delectus aut autem',
                }),
            }),
        });
        const response = await POST(req);

        expect(response.status).toBe(201);
        expect(await response.json()).toMatchObject({
            id: 101,
        });
    });

    it('PUT should works', async () => {
        const req = new NextRequest('https://test', {
            method: 'PUT',
            body: JSON.stringify({
                url: 'https://jsonplaceholder.typicode.com/posts/1',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: 'delectus aut autem',
                }),
            }),
        });
        const response = await PUT(req);

        expect(response.status).toBe(200);
        expect(await response.json()).toMatchObject({
            id: 1,
        });
    });
});

describe('GraphQL route', () => {
    it('POST should works', async () => {
        const query = `{
        launchesPast(limit: 10) {
        mission_name
        launch_date_local
        launch_site {
            site_name_long
        }
        links {
            article_link
            video_link
        }
        rocket {
            rocket_name
        }
        }
    }`;
        const req = new NextRequest('https://test', {
            method: 'POST',
            body: JSON.stringify({
                url: 'https://spacex-production.up.railway.app/',
                headers: { 'Content-Type': 'application/json' },
                query,
                variables: { '': 0 },
            }),
        });

        const response = await GraphQLPost(req);

        expect(response.status).toBe(200);
    });

    it('POST should return response with error', async () => {
        const req = new NextRequest('https://test', {
            method: 'POST',
            body: JSON.stringify({
                url: 'https://spacex-production.up.railway.app/',
                query: '',
                variables: { '': 0 },
            }),
        });

        const response = await GraphQLPost(req);

        expect(response.ok).toBe(false);
    });

    it('POST  should return a 500 error on invalid JSON', async () => {
        const req = new NextRequest('https://test', {
            method: 'POST',
            body: 'invalid json',
        });

        const response = await GraphQLPost(req);
        const jsonResponse = await response.json();

        expect(response.status).toBe(500);
        expect(jsonResponse).toEqual({
            error: `Unexpected token 'i', "invalid json" is not valid JSON`,
        });
    });
});
