![communitypost](https://user-images.githubusercontent.com/126908332/225225840-3ed84c53-1727-46cb-a5ca-a06f784db473.png)

## Description

Welcome to the Community Post Backend Application! This application is designed to provide the backend functionality for a social media application. This readme file will provide an overview of the application's features and how to use them.

## Running locally in development mode
To get started, just clone the repository and run npm install && npm run dev:

```bash 
git clone https://github.com/iaincollins/nextjs-starter.git
npm install
npm run dev
```

Note: If you are running on Windows run install --noptional flag (i.e. npm install --no-optional) which will skip installing fsevents.

## Building and deploying in production
If you wanted to run this site in production, you should install modules then build the site with npm run build and run it with npm start:

```bash
npm install
npm run build
npm start
```

You should run npm run build again any time you make changes to the site.

Note: If you are already running a webserver on port 80 (e.g. Macs usually have the Apache webserver running on port 80) you can still start the example in production mode by passing a different port as an Environment Variable when starting (e.g. PORT=3000 npm start).

## License

[MIT](https://choosealicense.com/licenses/mit/)
