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

- Classes
  - `GET/classes`
  - `GET/classes/:id`
  - `POST/classes`
  - `PUT/classes/:id`
  - `DELETE/classes/:id`
- StudentClasses
  - `GET/categories`
  - `GET/categories/:id`
  - `POST/categories/:id`
  - `PUT/categories/:id`
  - `PATCH/categories/:id`
  - `PATCH/categories/hide/:id`
- Levels
  - `GET/levels`
  - `GET/levels/:id`
  - `POST/levels`
  - `PUT/levels/:id`
  - `DELETE/levels/:id`
- Categories
  - `GET/categories`
  - `GET/categories/:id`
  - `POST/categories`
  - `PUT/categories/:id`
  - `DELETE/categories/:id`
- Materials
  - `GET/materials`
  - `GET/materials/:id`
  - `POST/materials`
  - `PUT/materials/:id`
  - `DELETE/materials/:id`
- Tasks
  - `GET/tasks`
  - `GET/tasks/:id`
  - `POST/tasks`
  - `PUT/tasks/:id`
  - `DELETE/tasks/:id`
- Scores
  - `GET/scores`
  - `GET/scores/:id`
  - `POST/scores`
  - `PUT/scores/:id`
  - `DELETE/scores/:id`

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

### CLASSES

### STUDENT-CLASSES

### LEVELS

#### GET/levels/

> Gets all the Level entities.

_Request Header_

```
access_token
```

_Params_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
    {
        "id": 1,
        "name": "beginner"
    },
    {
        "id": 2,
        "name": "medium"
    },
    ...
]
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### GET/levels/:id

> Gets all the Level entities.

_Request Header_

```
access_token
```

_Params_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
    {
        "id": 1,
        "name": "beginner"
    },
    {
        "id": 2,
        "name": "medium"
    },
    ...
]
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### POST/levels/

> Gets all the Level entities.

_Request Header_

```
access_token
```

_Params_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
    {
        "id": 1,
        "name": "beginner"
    },
    {
        "id": 2,
        "name": "medium"
    },
    ...
]
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

### CATEGORIES

### MATERIALS

### TASKS

### SCORES

#### GET /scores/

> Gets all the scores. Admin ONLY.
> _Request Header_

```
access_token
```

_Params_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
    {
        "id": 1,
        "score": 90,
        "studentId": 3,
        "taskId": 1,
        "answer": "Twinkle Twinkle Little Star",
        "soundUrl": "https://www.youtube.com/watch?v=IIZn_cEP9Jg",
        "createdAt": "2021-11-13T16:09:08.588Z",
        "updatedAt": "2021-11-13T16:09:08.588Z"
    },
    {
        "id": 2,
        "score": 100,
        "studentId": 3,
        "taskId": 2,
        "answer": "Pi-Pi-Pi-Pi☆Pikachu! ",
        "soundUrl": "https://www.youtube.com/watch?v=h4-ftQE3zEQ",
        "createdAt": "2021-11-13T16:09:08.588Z",
        "updatedAt": "2021-11-13T16:09:08.588Z"
    },
    {
        "id": 3,
        "score": 85,
        "studentId": 1,
        "taskId": 1,
        "answer": "https://www.youtube.com/watch?v=IIZn_cEP9Jg\n",
        "soundUrl": "https://www.youtube.com/watch?v=IIZn_cEP9Jg",
        "createdAt": "2021-11-13T17:43:54.063Z",
        "updatedAt": "2021-11-14T03:20:18.522Z"
    }
]
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

#### GET/scores/:id

> Gets one specific score.

_Request Header_

```
access_token
```

_Params_

```
id
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "id": 1,
    "score": 90,
    "studentId": 3,
    "taskId": 1,
    "answer": "Twinkle Twinkle Little Star",
    "soundUrl": "https://www.youtube.com/watch?v=IIZn_cEP9Jg",
    "createdAt": "2021-11-13T16:09:08.588Z",
    "updatedAt": "2021-11-13T16:09:08.588Z"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Score with ID 5 not found"
}

```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### POST /scores

> Registers a new scores entity

_Request Header_

```
access_token
```

_Request Body_

```
{
  "score": integer,
  "studentId": integer required,
  "taskId": integer required,
  "soundUrl": string required,
  "answer": string required,
}
```

_Response (201)_

```
{
    "id": 3,
    "score": 90,
    "studentId": 1,
    "taskId": 1,
    "soundUrl": "https://www.youtube.com/watch?v=IIZn_cEP9Jg",
    "answer": "https://www.youtube.com/watch?v=IIZn_cEP9Jg\n",
    "createdAt": "2021-11-13T17:43:54.063Z",
    "updatedAt": "2021-11-13T17:43:54.063Z"
}
```

_Response (400 - Bad Request)_

```
{
    "message": [
        "Score can't be empty",
        "Student Id can't be empty",
        "Task Id can't be empty"
    ]
}

--OR--

{
    "message": [
        "Please enter a valid email"
    ]
}

--OR--


```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### PUT /scores/:id

> Edit a registered score data

> _Request Header_

```
access_token
```

_Params_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "id": 3,
    "score": 85,
    "studentId": 1,
    "taskId": 1,
    "answer": "https://www.youtube.com/watch?v=IIZn_cEP9Jg\n",
    "soundUrl": "https://www.youtube.com/watch?v=IIZn_cEP9Jg",
    "createdAt": "2021-11-13T17:43:54.063Z",
    "updatedAt": "2021-11-14T03:20:18.522Z"
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

#### DELETE /scores/:id

> Delete a score by id. Admin ONLY.

> _Request Header_

```
access_token
```

_Params_

```
not needed
```

_Request Body_

```
access_token
```

_Response (200)_

```
{
    "id": 3,
    "score": 85,
    "studentId": 1,
    "taskId": 1,
    "answer": "https://www.youtube.com/watch?v=IIZn_cEP9Jg\n",
    "soundUrl": "https://www.youtube.com/watch?v=IIZn_cEP9Jg",
    "createdAt": "2021-11-13T17:43:54.063Z",
    "updatedAt": "2021-11-14T03:20:18.522Z"
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
