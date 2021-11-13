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

#### POST/login

> Login to the server with an registered account's credentials

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": string required,
  "password": string required,
}
```

_Response (200)_

```
{
  "access_token"
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
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### GET/users/

> Gets all the users, with pagination implemented. Admin ONLY.

_Request Header_

```
access_token
```

_Params_

```
page,
username,
email,
role,
phone,
address
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "totalItems": 4,
    "result": [
        {
            "id": 4,
            "username": "mactavish",
            "email": "mactavish@mail.com",
            "name": "MacTavish",
            "photo": "http://www.internationalhero.co.uk/m/mactavish1.jpg",
            "phone": null,
            "address": null
        },
        ...
    ],
    "totalPages": 1,
    "currentPage": 1
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}
```

_Response (403 - Forbidden)_

```
{
    "message": "Unauthorized access"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### GET/users/:id

> Gets one specific user.

_Request Header_

```
access_token
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "id": 3,
    "username": "soap",
    "email": "soap@mail.com",
    "name": "Soap",
    "photo": "https://www.how-to-draw-funny-cartoons.com/image-files/cartoon-soap-007.jpg",
    "phone": null,
    "address": null
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
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}
```

_Response (403 - Forbidden)_

```
{
    "message": "Unauthorized access"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### PUT/users/:id

> Edits a specific user's data. Limited to the User him/herself and the Admin.

_Request Header_

```
access_token
```

_Request Body_

```
{
  "username": string,
  "email": string,
  "password": string,
  "role": string,
  "name": string,
  "address": string,
  "phone": string,
  "photo": string
}
```

_Response (200)_

```
{
    "message": "User with id 1 has been updated"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}
```

_Response (403 - Forbidden)_

```
{
    "message": "Unauthorized access"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### DELETE/users/:id

> Deletes a User entity. Limited to the User him/herself and the Admin.

_Request Header_

```
access_token
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "User with id 5 has been deleted"
}
```

_Response (401 - Unauthorized)_

```
{
  "message": "jwt must be provided"
}
```

_Response (403 - Forbidden)_

```
{
    "message": "Unauthorized access"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```
