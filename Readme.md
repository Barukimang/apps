# Aragon Web App

This package holds the web-app that allows user to interact with Zaragoza. It is a [ReactJS](https://reactjs.org) based webapp.

## Getting Started

Start a Vite development server at http://localhost:3000 using

```bash
yarn dev
```

Other available commands include

```bash
npm run lint
```

```bash
npm run build
```

```bash
npm run test
```

## Tech stack

The web-app is built using the following tools:

- [ReactJS](https://reactjs.org)
- [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Jest](https://jestjs.io)
- [Testing Library](https://testing-library.com)
- [Tailwindcss](https://tailwindcss.com)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)

### DevOps

The CI/CD pipelines for the Aragon Web App use GitHub Actions, once completed successfully, the static site generated will be hosted on:

- [Fleek](https://fleek.co/): For stagging on IPFS Network.
- [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine): For development and testing.
