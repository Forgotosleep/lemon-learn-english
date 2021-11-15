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

#### GET/classes/

> Gets all Class entities

_Request Header_

```
access_token
```

_Params_

```
not needed
```

_Query_

```
name,
categoryId,
levelId,
page,
teacherName
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "totalItems": 2,
    "result": [
        {
            "id": 2,
            "name": "Speaking Intermediate English",
            "teacherId": 1,
            "levelId": 2,
            "categoryId": 2,
            "ratings": null,
            "status": null,
            "teacher": {
                "id": 1,
                "username": "Mason",
                "email": "mason@mail.com",
                "name": "Mason",
                "photo": "https://cdn.onlinewebfonts.com/svg/img_181369.png",
                "phone": null,
                "address": null
            },
            "Category": {
                "id": 2,
                "name": "speaking"
            },
            "Level": {
                "id": 2,
                "name": "medium"
            }
        },
        {
            "id": 1,
            "name": "Beginner Listening",
            "teacherId": 1,
            "levelId": 1,
            "categoryId": 1,
            "ratings": null,
            "status": null,
            "teacher": {
                "id": 1,
                "username": "Mason",
                "email": "mason@mail.com",
                "name": "Mason",
                "photo": "https://cdn.onlinewebfonts.com/svg/img_181369.png",
                "phone": null,
                "address": null
            },
            "Category": {
                "id": 1,
                "name": "listening"
            },
            "Level": {
                "id": 1,
                "name": "beginner"
            }
        }
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

--OR--

{
    "message": "jwt malformed"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### GET/classes/:id

> Gets a single Class entity based on its ID

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
    "name": "Beginner Listening",
    "teacherId": 1,
    "levelId": 1,
    "categoryId": 1,
    "ratings": null,
    "status": null,
    "createdAt": "2021-11-13T12:09:27.364Z",
    "updatedAt": "2021-11-13T12:09:27.364Z"
}
```

_Response (400 - Bad Request)_

```
{
    "message": "Invalid input data type"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
}

```

_Response (404 - Not Found)_

```
{
    "message": "Material with ID 99 not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### GET/classes/teacherClasses/

> Gets Class entities based on current logged in Teacher's ID

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
        "name": "Beginner Listening",
        "teacherId": 1,
        "levelId": 1,
        "categoryId": 1,
        "ratings": null,
        "status": null,
        "Category": {
            "id": 1,
            "name": "listening"
        },
        "Level": {
            "id": 1,
            "name": "beginner"
        }
    },
    {
        "id": 2,
        "name": "Speaking Intermediate English",
        "teacherId": 1,
        "levelId": 2,
        "categoryId": 2,
        "ratings": null,
        "status": null,
        "Category": {
            "id": 2,
            "name": "speaking"
        },
        "Level": {
            "id": 2,
            "name": "medium"
        }
    }
]
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
}

```

_Response (404 - Not Found)_

```
{
    "message": "Material with ID 99 not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### GET/classes/active/

> Gets Class entities with 'active' status

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
{
    "totalItems": 1,
    "result": [
        {
            "id": 1,
            "name": "Beginner Listening",
            "teacherId": 1,
            "levelId": 1,
            "categoryId": 1,
            "ratings": null,
            "status": "active",
            "teacher": {
                "id": 1,
                "username": "Mason",
                "email": "mason@mail.com",
                "name": "Mason",
                "photo": "https://cdn.onlinewebfonts.com/svg/img_181369.png",
                "phone": null,
                "address": null
            },
            "Category": {
                "id": 1,
                "name": "listening"
            },
            "Level": {
                "id": 1,
                "name": "beginner"
            }
        }
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

--OR--

{
    "message": "Please check your ID"
}

```

_Response (404 - Not Found)_

```
{
    "message": "Material with ID 99 not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### POST/classes/

> Create a new Class entity

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
{
  name: string required,
  levelId: integer required,
  categoryId: integer required,
}
```

_Response (201)_

```
{
    "ratings": 0,
    "status": "active",
    "id": 3,
    "name": "Beginner's Guide to Ears",
    "teacherId": 1,
    "levelId": 1,
    "categoryId": 1,
    "updatedAt": "2021-11-14T13:49:17.773Z",
    "createdAt": "2021-11-14T13:49:17.773Z"
}
```

_Response (400 - Bad Request)_

```
{
    "message": [
        "Class name can't be empty",
        "levelId can't be empty",
        "categoryId can't be empty"
    ]
}
--OR--
{
    "message": [
        "levelId has to be a number",
        "categoryId has to be a number"
    ]
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
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

#### UPDATE/classes/:id

> Update a specific Class entity, based on its ID

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
{
  name: string,
  levelId: integer,
  categoryId: integer,
}
```

_Response (200)_

```
{
    "id": 3,
    "name": "Beginner's Guide to Ears",
    "teacherId": 1,
    "levelId": 1,
    "categoryId": 2,
    "ratings": 0,
    "status": "active",
    "createdAt": "2021-11-14T13:49:17.773Z",
    "updatedAt": "2021-11-14T13:55:13.008Z"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
}

```

_Response (403 - Forbidden)_

```
{
    "message": "Unauthorized access"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Class with ID 99 not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### PATCH/classes/status/:id

> Update a specific Class entity's status, based on its ID. Restricted to the teacher that owns the class.

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
{
  status: string
}
```

_Response (200)_

```
{
    "message": "Your class status has been updated"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
}

```

_Response (403 - Forbidden)_

```
{
    "message": "Unauthorized access"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Class with ID 99 not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### PATCH/classes/:id

> Update a specific Class entity's ratings, adding the new rating given by the student to the total that is in the table; based on its ID. Restricted to the students that have _completed_ the class.

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
{
  status: string
}
```

_Response (200)_

```
{
    "message": "Succeess in rating class Beginner Listening"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
}

```

_Response (403 - Forbidden)_

```
{
    "message": "Unauthorized access"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Class with ID 99 not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### DELETE/classes/:id

> Delete a Class entity, based on its ID. Restricted to the teacher that owns the class.

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
    "message": "Successfully deleted Class Beginner's Guide to Ears"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Material with ID 99 not found"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
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

### STUDENT-CLASSES

#### GET/student-class/

> Gets all classes that a logged-in student is enrolled in.

_Request Header_

```
access_token
```

_Params_

```
not needed
```

_Query_

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
        "studentId": 3,
        "classId": 1,
        "status": "complete",
        "createdAt": "2021-11-13T12:09:27.364Z",
        "updatedAt": "2021-11-13T12:09:27.364Z",
        "Class": {
            "id": 1,
            "name": "Beginner Listening",
            "teacherId": 1,
            "levelId": 1,
            "categoryId": 1,
            "ratings": 342,
            "status": "active",
            "createdAt": "2021-11-13T12:09:27.364Z",
            "updatedAt": "2021-11-14T14:40:03.656Z"
        }
    },
    {
        "id": 2,
        "studentId": 3,
        "classId": 2,
        "status": "hidden",
        "createdAt": "2021-11-13T12:09:27.364Z",
        "updatedAt": "2021-11-13T12:09:27.364Z",
        "Class": {
            "id": 2,
            "name": "Speaking Intermediate English",
            "teacherId": 1,
            "levelId": 2,
            "categoryId": 2,
            "ratings": 0,
            "status": null,
            "createdAt": "2021-11-13T12:09:27.364Z",
            "updatedAt": "2021-11-13T12:09:27.364Z"
        }
    }
]
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "jwt malformed"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### GET/student-class/:classId

> Gets all classes that a logged-in student is enrolled in. Students only.

_Request Header_

```
access_token
```

_Params_

```
not needed
```

_Query_

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
        "studentId": 3,
        "classId": 1,
        "status": "complete",
        "createdAt": "2021-11-13T12:09:27.364Z",
        "updatedAt": "2021-11-13T12:09:27.364Z",
        "Class": {
            "id": 1,
            "name": "Beginner Listening",
            "teacherId": 1,
            "levelId": 1,
            "categoryId": 1,
            "ratings": 342,
            "status": "active",
            "createdAt": "2021-11-13T12:09:27.364Z",
            "updatedAt": "2021-11-14T14:40:03.656Z"
        }
    },
    {
        "id": 2,
        "studentId": 3,
        "classId": 2,
        "status": "hidden",
        "createdAt": "2021-11-13T12:09:27.364Z",
        "updatedAt": "2021-11-13T12:09:27.364Z",
        "Class": {
            "id": 2,
            "name": "Speaking Intermediate English",
            "teacherId": 1,
            "levelId": 2,
            "categoryId": 2,
            "ratings": 0,
            "status": null,
            "createdAt": "2021-11-13T12:09:27.364Z",
            "updatedAt": "2021-11-13T12:09:27.364Z"
        }
    }
]
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "jwt malformed"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### POST/student-class/:classId

> Registers the logged-in student to a class, based on its class ID.

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
{
  name: string required,
  levelId: integer required,
  categoryId: integer required,
}
```

_Response (201)_

```
{
    "ratings": 0,
    "status": "active",
    "id": 3,
    "name": "Beginner's Guide to Ears",
    "teacherId": 1,
    "levelId": 1,
    "categoryId": 1,
    "updatedAt": "2021-11-14T13:49:17.773Z",
    "createdAt": "2021-11-14T13:49:17.773Z"
}
```

_Response (400 - Bad Request)_

```
{
    "message": [
        "Class name can't be empty",
        "levelId can't be empty",
        "categoryId can't be empty"
    ]
}
--OR--
{
    "message": [
        "levelId has to be a number",
        "categoryId has to be a number"
    ]
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
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

#### PATCH/student-class/hide/:id

> Changes the status of a student that is enrolled in a class into 'hidden'. This endpoint is meant to be hit if a student wants to quit from the class. Students only.

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
{
  status: string
}
```

_Response (200)_

```
{
    "message": "Success updating student's status"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
}

```

_Response (403 - Forbidden)_

```
{
    "message": "Unauthorized access"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Class with ID 99 not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### PATCH/student-class/:id

> Changes the status of a student that is enrolled in a class into 'incomplete'. This endpoint is meant to be hit if a student that has quit a class and wants to enroll again in the same class. The progress is saved and returned as is to the student. Students only.

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
{
  status: string
}
```

_Response (200)_

```
{
    "message": "Success updating student's status"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
}

```

_Response (403 - Forbidden)_

```
{
    "message": "Unauthorized access"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Class with ID 99 not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

### LEVELS

#### GET/levels/

> Gets all Level entities

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

> Gets a single Level entity based on its ID

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
    "name": "beginner"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Level with ID 99 not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### POST/levels/

> Create a new Level entity

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
{
  name: string required
}
```

_Response (201)_

```
{
    "message": "Successfully added a new Level"
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

#### UPDATE/levels/:id

> Update a specific Level entity, based on its ID

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
{
  name: string
}
```

_Response (200)_

```
{
    "message": "Successfully updated a level"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Level with ID 99 not found"
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

#### DELETE/levels/:id

> Delete a Level entity, based on its ID

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
    "message": "Successfully deleted a level"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Level with ID 99 not found"
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

### CATEGORIES

#### GET/categories/

> Gets all Category entities

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
        "name": "listening"
    },
    {
        "id": 2,
        "name": "speaking"
    }
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

#### GET/categories/:id

> Gets a single Category entity based on its ID

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
    "name": "listening"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
}

```

_Response (404 - Not Found)_

```
{
    "message": "Category with ID 99 not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### POST/categories/

> Create a new Category entity

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
{
  name: string required
}
```

_Response (201)_

```
{
    "message": "Succeessfully added a new category"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
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

#### UPDATE/categories/:id

> Update a specific Category entity, based on its ID

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
{
  name: string
}
```

_Response (200)_

```
{
    "message": "Category with ID 4 has been updated"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Category with ID 99 not found"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
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

#### DELETE/categories/:id

> Delete a Category entity, based on its ID

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
    "message": "Category with ID 4 has been deleted"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Category with ID 99 not found"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
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

### MATERIALS

#### GET/materials/

> Gets all Material entities

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
        "name": "Twinkle Twinkle Little Star",
        "description": "A popular song for children, easy to listen and a good song to start your listening with",
        "materialUrl": "https://www.youtube.com/watch?v=IIZn_cEP9Jg",
        "classId": 1,
        "createdAt": "2021-11-13T12:09:27.364Z",
        "updatedAt": "2021-11-13T12:09:27.364Z",
        "Class": {
            "name": "Beginner Listening"
        }
    },
    {
        "id": 2,
        "name": "Pi-Pi-Pi-Pi☆Pikachu! ",
        "description": "A song about Pikachu and his/her friends",
        "materialUrl": "https://www.youtube.com/watch?v=h4-ftQE3zEQ",
        "classId": 1,
        "createdAt": "2021-11-13T12:09:27.364Z",
        "updatedAt": "2021-11-13T12:09:27.364Z",
        "Class": {
            "name": "Beginner Listening"
        }
    }
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

#### GET/materials/:id

> Gets a single Material entity based on its ID

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
    "name": "Twinkle Twinkle Little Star",
    "description": "A popular song for children, easy to listen and a good song to start your listening with",
    "materialUrl": "https://www.youtube.com/watch?v=IIZn_cEP9Jg",
    "classId": 1,
    "createdAt": "2021-11-13T12:09:27.364Z",
    "updatedAt": "2021-11-13T12:09:27.364Z",
    "Class": {
        "name": "Beginner Listening"
    }
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
}

```

_Response (404 - Not Found)_

```
{
    "message": "Material with ID 99 not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### POST/materials/

> Create a new Material entity

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
{
  name: string required,
  description: string required,
  materialUrl: string,
  classId: integer required,
}
```

_Response (201)_

```
{
    "message": "Succeessfully added a new material"
}
```

_Response (400 - Bad Request)_

```
{
    "message": [
        "Name can't be empty",
        "Description can't be empty",
        "classId can't be empty"
    ]
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
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

#### UPDATE/materials/:id

> Update a specific Material entity, based on its ID

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
{
  name: string,
  description: string,
  materialUrl: string,
  classId: integer,
}
```

_Response (200)_

```
{
    "message": "Material with ID 4 has been updated"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
}

```

_Response (403 - Forbidden)_

```
{
    "message": "Unauthorized access"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Material with ID 99 not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### DELETE/materials/:id

> Delete a Material entity, based on its ID

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
    "id": 3,
    "name": "Mraz Best Compilation",
    "description": "Best of Jason Mraz. For testing purpoises.",
    "materialUrl": "https://www.youtube.com/watch?v=E105OqrWcjI",
    "classId": 1,
    "createdAt": "2021-11-13T13:25:01.031Z",
    "updatedAt": "2021-11-13T13:38:52.847Z"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Material with ID 99 not found"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
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

### TASKS

#### GET/tasks/

> Gets all Task entities

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
        "name": "Twinkle Twinkle Little Star",
        "description": "A popular song for children, easy to listen and a good song to start your listening with",
        "classId": 1,
        "question": "Sing-a-long!",
        "soundUrl": "https://www.youtube.com/watch?v=IIZn_cEP9Jg",
        "createdAt": "2021-11-13T12:09:27.364Z",
        "updatedAt": "2021-11-13T12:09:27.364Z"
    },
    {
        "id": 2,
        "name": "Pi-Pi-Pi-Pi☆Pikachu! ",
        "description": "A song about Pikachu and his/her friends",
        "classId": 1,
        "question": "Sing-a-long!",
        "soundUrl": "https://www.youtube.com/watch?v=h4-ftQE3zEQ",
        "createdAt": "2021-11-13T12:09:27.364Z",
        "updatedAt": "2021-11-13T12:09:27.364Z"
    }
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

#### GET/tasks/:id

> Gets a single Task entity based on its ID

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
    "name": "Twinkle Twinkle Little Star",
    "description": "A popular song for children, easy to listen and a good song to start your listening with",
    "classId": 1,
    "question": "Sing-a-long!",
    "soundUrl": "https://www.youtube.com/watch?v=IIZn_cEP9Jg",
    "createdAt": "2021-11-13T12:09:27.364Z",
    "updatedAt": "2021-11-13T12:09:27.364Z"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
}

```

_Response (404 - Not Found)_

```
{
    "message": "Material with ID 99 not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### POST/tasks/

> Create a new Task entity

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
{
  name: string required,
  description: string required,
  classId: integer required,
  question: string,
  soundUrl: string
}
```

_Response (201)_

```
{
    "result": {
        "id": 3,
        "name": "I believe I can fly",
        "description": "R.Kelly's most famous work. Somewhat of a meme song",
        "question": "Sing-a-long!",
        "soundUrl": "https://www.youtube.com/watch?v=LbUpPVOEkdA",
        "classId": 1,
        "updatedAt": "2021-11-13T18:19:01.113Z",
        "createdAt": "2021-11-13T18:19:01.113Z"
    }
}
```

_Response (400 - Bad Request)_

```
{
    "message": [
        "Task name can't be empty",
        "Description can't be empty",
        "classId can't be empty"
    ]
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
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

#### UPDATE/tasks/:id

> Update a specific Task entity, based on its ID

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
{
  name: string,
  description: string,
  classId: integer,
  question: string,
  soundUrl: string
}
```

_Response (200)_

```
{
    "result": {
        "id": 3,
        "name": "I believe I can fly",
        "description": "R.Kelly's most famous work. Somewhat of a meme song",
        "classId": 1,
        "question": "Come and Sing-a-long!",
        "soundUrl": "https://www.youtube.com/watch?v=LbUpPVOEkdA",
        "createdAt": "2021-11-13T18:19:01.113Z",
        "updatedAt": "2021-11-13T18:48:39.612Z"
    },
    "message": "Task with ID 3 Updated"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
}

```

_Response (403 - Forbidden)_

```
{
    "message": "Unauthorized access"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Material with ID 99 not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  message: Internal Server Error
}
```

#### DELETE/tasks/:id

> Delete a Task entity, based on its ID

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
    "message": "Deleted task with ID 3"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Material with ID 99 not found"
}
```

_Response (401 - Internal Server Error)_

```
{
  "message": "jwt must be provided"
}

--OR--

{
    "message": "Please check your ID"
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
