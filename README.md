# Project Title

## Job API

## Description

This is a REST API application for managing job listings. It provides endpoints for registering and logging in users, creating, updating and deleting job listings.

## Used Technologies

In this build I used Node.js, Express.js, MongoDb, Mongoose, Typecript, Nodemon, Morgan, Dotenv, Helmet, CORS, XSS-Clean, Express Rate Limit.

## Documentation

https://jobs-api-d3kj.onrender.com/api-docs/#/

## How to install

Download and run npm install, then create a .env file at the root of the project and set the following environment variables:

```bash
PORT=
MONGO_URI=
JWT_SECRET=
```

Mongo uri example:

```bash
MONGO_URI=mongodb+srv://giorgi:yourClusterPassword@yourClusterName.zi9vxpj.mongodb.net/yourDatabaseName?retryWrites=true&w=majority
```

## API Reference

### Auth

#### Register

```http
  POST /api/v1/auth/register
```

You should send name, email, password
exapmle:

{
"name": "John Doe",
"email": "john.doe@example.com",
"password": "password123"
}

#### Login

```http
  POST /api/v1/auth/login
```

You should send email, password
exapmle:

{
"email": "john.doe@example.com",
"password": "password123"
}

### Jobs

### Important

To Get, Create, Update or Delete Job you need to first Register and then Log In. After logging in you will get a token in response. Copy the token and in Headers paste it as shown below

| Key             | Value               | Description                                       |
| :-------------- | :------------------ | :------------------------------------------------ |
| `Authorization` | `Bearer your-token` | Enter your copied token instead of the your-token |

Example: Authorization Bearer QdDzUrTziEhVj57A3rxcjjn3aL_YNMZUh-hcqwRVDb4ZFMqoDEWxcyvpaS6xvmQot99CdHGOaaPdpv4f3ZKHB4

#### Get jobs

```http
  GET /api/v1/jobs
```

#### Get single job

```http
  GET /api/v1/jobs/{id of your job}
```

#### Create job

```http
  POST /api/v1/jobs
```

Creates a new job listing with the provided title, description, company, and location. Requires a valid JWT token in the Authorization header.

| Parameter  | Type      | Description                                      |
| :--------- | :-------- | :----------------------------------------------- |
| `company`  | `string`  | **Required**. Your company name                  |
| `position` | `boolean` | **Required**. Your position in the company       |
| `status`   | `boolean` | **Optional**. "interview", "declined", "pending" |

#### Update job

```http
  PATCH /api/v1/jobs/{id of your job}
```

Updates an existing job listing with the provided ID. Requires a valid JWT token in the Authorization header.

| Parameter  | Type      | Description                                    |
| :--------- | :-------- | :--------------------------------------------- |
| `company`  | `string`  | **Required**. Your new company name            |
| `position` | `boolean` | **Required**. Your new position in the company |

#### Delete job

```http
  DELETE /api/v1/jobs/{id of your job}
```
