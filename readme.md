# Users API

## POST /users/register

Create a new user account.

- URL: `/users/register`
- Method: `POST`
- Headers: `Content-Type: application/json`

### Request body (JSON)
- fullname (object, required)
  - firstname (string, required) — minimum 3 characters
  - lastname (string, optional) — minimum 3 characters if present
- email (string, required) — must be a valid email address
- password (string, required) — minimum 6 characters

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "strongpassword"
}
```

### Validation rules & messages
- `email` — must be a valid email ("Invalid Email")
- `fullname.firstname` — min length 3 ("First name must be at least 3 charecters long")
- `password` — min length 6 ("Password  must be at least 6 charecters long")

### Responses

- 201 Created
  - Body: `{ "token": "<jwt>", "user": { ...userWithoutPassword } }`
  - The password is hashed on the server and is not returned.

Example success:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "6123abc...",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "socketId": null
  }
}
```

- 400 Bad Request
  - Returned when validation fails. Body: `{ "errors": [ { "msg": "...", "param": "..." } ] }`

Example validation error:
```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" }
  ]
}
```

- 500 Internal Server Error
  - Returned for unexpected server-side errors (e.g., database issues). Consider adding a specific 409 Conflict for duplicate email in future.

### Notes
- Ensure `Content-Type: application/json` header is set.
- Password is hashed using bcrypt before storing.

## User Login

### POST /users/login

Login a user.

**Headers:**
- `Content-Type: application/json`

**Request Body:**
- `email` (string, required): User's email address (must be valid email)
- `password` (string, required): User's password (min 6 characters)

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "6123abc...",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "socketId": null
  }
}
```

**Validation Error (400):**
```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" }
  ]
}
```

**Unauthorized (401):**
```json
{
  "message": "Invalid email or password"
}
```

**Internal Server Error (500):**
- Returns a generic error message.

## API Endpoints

### Get User Profile

- **URL:** `/users/profile`
- **Method:** `GET`
- **Auth required:** Yes (Bearer Token)
- **Description:** Retrieves the authenticated user's profile information.

#### Request Headers

| Key           | Value                |
|---------------|---------------------|
| Authorization | Bearer `<JWT Token>` |

#### Response

- **200 OK**

```json
{
  "user": {
    "id": "string",
    "email": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    // ...other user fields
  }
}
```

- **401 Unauthorized**  
  If the token is missing or invalid.

---

### Logout User

- **URL:** `/users/logout`
- **Method:** `POST`
- **Auth required:** Yes (Bearer Token)
- **Description:** Logs out the authenticated user and blacklist the token.

#### Request Headers

| Key           | Value                |
|---------------|---------------------|
| Authorization | Bearer `<JWT Token>` |

#### Response

- **200 OK**

```json
{
  "message": "User logged out successfully"
}
```

- **401 Unauthorized**  
  If the token is missing or invalid.




# Captain API

## POST /captains/register

Register a new captain.

- **URL:** `/captain/register`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`

### Request Body (JSON)
- `fullname` (object, required)
  - `firstname` (string, required, min 3 chars)
  - `lastname` (string, optional, min 3 chars if present)
- `email` (string, required, valid email)
- `password` (string, required, min 6 chars)
- `vehicle` (object, required)
  - `color` (string, required, min 3 chars)
  - `plate` (string, required, min 3 chars)
  - `capacity` (integer, required, min 1)
  - `vehicleType` (string, required, one of: car, bike, auto)

Example:
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Validation rules & messages
- `fullname.firstname` — min length 3 ("First name is required")
- `email` — must be a valid email ("Valid email is required")
- `password` — min length 6 ("Password must be at least 6 characters long")
- `vehicle.color` — min length 3 ("Vehicle color is required")
- `vehicle.plate` — min length 3 ("Vehicle plate is required")
- `vehicle.capacity` — integer, min 1 ("Vehicle capacity is required")
- `vehicle.vehicleType` — one of: car, bike, auto ("Vehicle type must be car, bike or auto")

### Responses

- **201 Created**
  - Body: `{ "token": "<jwt>", "captain": { ...captainWithoutPassword } }`
  - The password is hashed on the server and is not returned.

Example success:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "6123abc...",
    "fullname": { "firstname": "Jane", "lastname": "Doe" },
    "email": "jane@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

- **400 Bad Request**
  - Returned when validation fails. Body: `{ "errors": [ { "msg": "...", "param": "..." } ] }`

Example validation error:
```json
{
  "errors": [
    { "msg": "Valid email is required", "param": "email", "location": "body" }
  ]
}
```

- **400 Duplicate Email**
  - Returned when a captain with the email already exists.

Example duplicate email error:
```json
{
  "message": "Captain with this email already exists"
}
```

- **500 Internal Server Error**
  - Returned for unexpected server-side errors.

Example:
```json
{
  "message": "Internal server error"
}
```

---

## POST /captains/login

Login a captain.

- **URL:** `/captain/login`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`

### Request Body (JSON)
- `email` (string, required): Captain's email address (must be valid email)
- `password` (string, required): Captain's password (min 6 characters)

Example:
```json
{
  "email": "jane@example.com",
  "password": "securepassword"
}
```

### Responses

- **200 OK**
  - Body: `{ "token": "<jwt>", "captain": { ...captainWithoutPassword } }`

Example success:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "6123abc...",
    "fullname": { "firstname": "Jane", "lastname": "Doe" },
    "email": "jane@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

- **400 Bad Request**
  - Returned when validation fails. Body: `{ "errors": [ { "msg": "...", "param": "..." } ] }`

Example validation error:
```json
{
  "errors": [
    { "msg": "Valid email is required", "param": "email", "location": "body" }
  ]
}
```

- **401 Unauthorized**
  - Returned when email or password is invalid.

Example unauthorized error:
```json
{
  "message": "Invalid email or password"
}
```

- **500 Internal Server Error**
  - Returns a generic error message.

---

## GET /captains/profile

Get the authenticated captain's profile.

- **URL:** `/captain/profile`
- **Method:** `GET`
- **Auth required:** Yes (Bearer Token)
- **Description:** Retrieves the authenticated captain's profile information.

### Request Headers

| Key           | Value                |
|---------------|---------------------|
| Authorization | Bearer `<JWT Token>` |

### Response

- **200 OK**

```json
{
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": 1,
      "vehicleType": "car"
    }
    // ...other captain fields
  }
}
```

- **401 Unauthorized**  
  If the token is missing, invalid, or blacklisted.

---

## POST /captains/logout

Logout the authenticated captain and blacklist the token.

- **URL:** `/captain/logout`
- **Method:** `POST`
- **Auth required:** Yes (Bearer Token)
- **Description:** Logs out the authenticated captain and blacklists the token.

### Request Headers

| Key           | Value                |
|---------------|---------------------|
| Authorization | Bearer `<JWT Token>` |

### Response

- **200 OK**

```json
{
  "message": "Logged out successfully"
}
```

- **401 Unauthorized**  
  If the token is missing, invalid, or blacklisted.


 