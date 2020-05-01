
  ## Description

### Application features

- can create a new company with POST /api/companies
- can get a single company with /api/companies/:companyId
- can create a new report with POST /api/reports/:companyId
- can get a list of all reports with GET /api/reports
- can get a list of reports of type 'X' with GET /api/reports?type=X
- can get a list of reports of company 'Y' with GET /api/reports?companyId=Y
- can get a list of reports with pagination with /api/reports?page=2

## Request body

- To create company 

```
{
  name: "string",
  address: "string",
  email: "string",
  description: "string"
}
```

- To create report

```
{
  name: "string",
  type: "string",
  period: "string",
  year: number,
  assignee: "string",
  deadline: "2020-05-01T06:55:41.872Z",
  submitted: boolean,
  url: "string"
}
```

### Technologies Used

- NodeJs
- NestJs
- MongoDB
- TypeScript
- Mongoose

### Prerequisites

- Node (>= 8.9.0)
- Docker

## Installation

- Install [**Node JS**](https://nodejs.org/en)
- Install [**Nest JS**](https://nestjs.com/)
- Clone this repository[**repository here**](https://gitlab.com/Sojisoyoye/ereporter)
- [**cd**] into the root of the **project directory**
- Run `npm install` on the terminal to install project dependencies

## How to run the application with docker-compose

- To run the application with docker you will need to install Docker

### Run

```bash
npm run init
```

### To stop the server

- Press Control + C
- then run
```
npm run stop:init
```

### App Documentation

Visit your browser in:

`http://localhost:8080/api/docs`



## How to run the application manually
### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

### App Documentation
Visit your browser in:

`http://localhost:3000/api/docs`


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


- Author - [Soji Soyoye](https://www.linkedin.com/in/soyoye-olusoji-134257133/)

