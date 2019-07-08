# Server installation

## Requirements
- NodeJS LTS version 10.15.x
- MongoDB version 4.0.x

## Setup project
- Install `node_modules` with command `$ npm install`

# Run project

## Run project in dev mode
- `$ npm run start`

## Run project in production mode
- `$ npm run build`
- `$ npm run serve`

# Run tests
You have to close the server if running before run tests

- `$ npm run test`

Tests need to be run sequentially, so if you want to watch all files you have to run command `$ npx jest --watchAll --runInBand`

# Others commands

## Lint
- `$ npm run lint`
