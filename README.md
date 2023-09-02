## Description

A Simple CRUD Books Store API with NestJs, Postgres, Prisma.

## Installation

```bash
git clone git@github.com:minhtc-tech/p_nest-books-store.git
```

## Running the app

- cd into `p_nest-books-store`

```bash
yarn install
```

- run `npx prisma generate`, make sure you have prisma cli

```bash
npx prisma db pull
```

- run `docker compose up -d`, make sure you have docker in your local machine

- rename `.env.sample` to `.env` and populate the required parameters

- run `yarn start:dev` for the APIs server at: http://localhost:3333

- the swagger api at: http://localhost:3333/api

- run `npx prisma studio` to view the prisma admin page at: http://localhost:5555
