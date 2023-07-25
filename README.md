## NestJS take-home Boilerplate

The idea of this repository is to have a boilerplate to take as reference for a NestJS API. 
You're free to use it as you want.
If you have any question, please contact me at hung.do@traderinteractive.com

## Description

Within this project you'll find an example of : 

- Single endpoint to list a users
- Unit testing for Controller and Service
- E2E testing for the endpoint
- Typeorm configuration
- Repository pattern

## Stack

- NestJS - NodeJs (TypeScript)
- Typeorm - ORM
- MariaDB - Database
- Jest + Supertest - Testing
- Yarn


## Requirements
- NodeJS >= 18.14.0
- Yarn >= 1.22.17

## Steps to run this project using local environment:

1. Run `yarn install` command
2. Copy `.env.example` to `.env` and fill the variables
3. Run `yarn run start` command


## Commands to run locally

You'll find the following commands in the `package.json` file:

### API

```bash

# Start development API
$ yarn run start:dev

# Build API
$ yarn run build

# Start production API
$ yarn run start:prod

```
### Testing

```bash
# Run unit tests
$ yarn run test

# Run specific unit test file
$ yarn run test -- users.controller.spec.ts

# Run e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```