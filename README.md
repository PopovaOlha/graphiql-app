# rest/graphql client

## Overview

This project is the [final task](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md) for the [React](https://rs.school/courses/reactjs) course offered by [RS School](https://rs.school/). It involves creating a lightweight application for working with APIs that combines the functionalities of platforms such as Postman and GraphiQL into a single tool.

## Key features of the project

### RESTful Client

**Method Selector:** Easily select HTTP methods (GET, POST, PUT, DELETE, etc.) for your requests.

**Endpoint URL Input:** Enter the URL of the API endpoint.

**Request Editor:** Craft and customize the body of your REST requests.

**Headers Editor:** Add, edit, and manage HTTP headers for your requests.

**Response Section:** View and analyze the server's response, including status code and body content.

### GraphiQL Client

**Endpoint URL Input:** Enter the URL of the GraphQL endpoint.

**Request Editor:** Write and edit your GraphQL queries or mutations.

**Variables Editor:** Define variables to be used in your GraphQL requests.

**Headers Editor:** Add and manage headers for your GraphQL requests.

**Documentation URL Input:** Specify the endpoint URL for retrieving the GraphQL schema documentation (SDL).

**Documentation Explorer:** Browse and explore the GraphQL schema documentation to understand the available queries, mutations, and types.

**Response Section:** View the results of your GraphQL queries or mutations, including data, errors, and more.

### Additional Features

**Authorization and Authentication:** Secure the application with authentication, ensuring that only authorized users can access the tool.

**History Section:** Keep a record of previously executed requests and quickly navigate to any specific request to review or re-execute it.

## Technology Stack

-   **frontend**
    -   **Next.js** - an open-source web development framework providing React-based web applications with server-side rendering and static website generation.
    -   **React** - a JavaScript library for building user interfaces.
    -   **TypeScript** - a statically typed superset of JavaScript that enhances code quality and developer productivity.
    -   **MUI** - an open-source React component library that implements Google's Material Design.
-   **authentication**
    -   **Firebase** - Firebase Authentication lets you add an end-to-end identity solution to the app for easy user authentication and sign-in.
-   **testing**
    -   **vitest** - a JS framework for unit testing.
-   **deployment**
    -   **Vercel** - provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more personalized web.
-   **version control**
    -   **git** - a distributed version control system for tracking changes in source code.
    -   **github** - for hosting the repository.
-   **additional tools**
    -   **Vite** - a project bundler.
    -   **ESLint** - a js linter for identifying and fixing code errors.
    -   **Prettier** - a code formatter.
    -   **husky** - running scripts before commits.

## Installation

-   clone the repository
    -   `git clone "repository url"`
-   Install dependencies
    -   **npm install**

## Usage

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Team

[Anna Babay](https://github.com/kot-vmeshke)

[Olha Popova](https://github.com/PopovaOlha)

[Svitlana Grytsai](https://github.com/SvitlanaG)

# Mentor

[Andrej Podlubnyj](https://github.com/andron13)
