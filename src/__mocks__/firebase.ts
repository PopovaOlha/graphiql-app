export const mockAuth = {
    currentUser: {
        displayName: 'Mock User',
        email: 'mockuser@example.com',
        uid: 'mockUid',
        emailVerified: true,
        isAnonymous: false,
        phoneNumber: null,
        photoURL: null,
        providerId: 'firebase',
        metadata: {
            creationTime: '2023-01-01T00:00:00Z',
            lastSignInTime: '2023-09-01T12:00:00Z',
        },
        providerData: [
            {
                displayName: 'Mock User',
                email: 'mockuser@example.com',
                phoneNumber: null,
                photoURL: null,
                providerId: 'password',
                uid: 'mockUid',
            },
        ],
        refreshToken: 'mockRefreshToken',
        tenantId: null,

        delete: vi.fn(() => Promise.resolve()),

        getIdToken: vi.fn(() => Promise.resolve('mockIdToken')),

        getIdTokenResult: vi.fn(() =>
            Promise.resolve({
                token: 'mockIdToken',
                expirationTime: '2023-12-31T23:59:59Z',
                authTime: '2023-01-01T00:00:00Z',
                issuedAtTime: '2023-01-01T00:00:00Z',
                signInProvider: 'password',
                claims: {},
                signInSecondFactor: null,
            })
        ),

        reload: vi.fn(() => Promise.resolve()),

        toJSON: vi.fn(() => ({
            displayName: 'Mock User',
            email: 'mockuser@example.com',
            uid: 'mockUid',
            emailVerified: true,
            isAnonymous: false,
            phoneNumber: null,
            photoURL: null,
            providerId: 'firebase',
            metadata: {
                creationTime: '2023-01-01T00:00:00Z',
                lastSignInTime: '2023-09-01T12:00:00Z',
            },
            providerData: [
                {
                    displayName: 'Mock User',
                    email: 'mockuser@example.com',
                    phoneNumber: null,
                    photoURL: null,
                    providerId: 'password',
                    uid: 'mockUid',
                },
            ],
            refreshToken: 'mockRefreshToken',
            tenantId: null,
        })),
    },
};
