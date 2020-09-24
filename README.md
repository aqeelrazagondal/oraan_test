# Technical Test - Back End Developer

The purpose of the back-end is to serve two REST API end-points to any client application.

AVAILABLE ENDPOINTS DEMO [SWAGGER DOCS DEMO](https://localhost:3000/swagger-html)

When running the project locally with `watch-server`, being `.env` file config the very same as `.example.env` file, the swagger docs will be deployed at: `http:localhost:3000/swagger-html`

# Getting Started
- Clone the repository
```
git clone --depth=1 https://github.com/aqeelrazagondal/oraan_test.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Run the project directly in TS
```
npm run watch-server
```

- Build and run the project in JS
```
npm run build
npm run start
```

- Run integration or load tests
```
npm run test:integration:local (newman needed)
npm run test:load (locust needed)
```