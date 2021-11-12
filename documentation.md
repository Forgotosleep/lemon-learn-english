# Lemon, Learn English With Pokemon Server

Lemon, Learn English With Pokemon!

This app has :

- RESTFUL Endpoints
- JSON formatted response

## Endpoints List:

- Users
  - `POST/register`
  - `POST/login`
  - `GET/users`
  - `GET/users/:id`
  - `PUT/users/:id`
  - `DELETE/users/:id`
  <!-- - `POST/users/login-google` -->

&nbsp;

## RESTFUL Endpoints

### USERS

#### POST/register

> Registers a new User entity

_Request Header_

```
not needed
```

_Request Body_

```
{
  "username": string,
  "email": string required,
  "password": string required,
  "role": string required,
  "name": string required,
  "address": string,
  "phone": string,
  "photo": string required default
}
```

_Response (201)_

```
{
  "id": 3,
  "username": "studentA",
  "email": "student@mail.com",
  "role": "student",
  "name": "student A",
  "photo": "pasfoto",
  "phone": "08-study",
  "address": "studentvilee"
}
```

_Response (400 - Bad Request)_

```
{
    "message": [
        "Email can't be empty",
        "Password can't be empty"
    ]
}

--OR--

{
    "message": [
        "Please enter a valid email"
    ]
}

--OR--

{
    "message": [
        "email must be unique"
    ]
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```
