# Consumer UI (web)

Consumer frontend of WeCreate built on top of Next.js, Material UI and Apollo Client.

## Setup

1. Install Node.js dependencies.

```
npm i
```

2. Generate typings from GraphQL schema.

```
npm run generate:graphql
```

## Development

1. Start GraphQL Faker to provide mocked data.

```
npm run mock
```

2. Start Next.js development environment.

```
npm run dev
```

3. Start Storybook for component development.

```
npm run open:storybook
```

## Production

1. Build production bundle.

```
npm run build
```

2. Start Next.js production environment.

```
npm run start
```
