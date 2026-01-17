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


## POST /captains/register

Register a new captain.

- URL: `/captain/register`
- Method: `POST`
- Headers: `Content-Type: application/json`

### Request body (JSON)
- fullname (object, required)
  - firstname (string, required) — minimum 3 characters
- email (string, required) — must be a valid email address
- password (string, required) — minimum 6 characters
- vechicle (object, required)
  - color (string, required) — minimum 3 characters
  - plate (string, required) — minimum 3 characters
  - capacity (integer, required) — minimum 1
  - vechicleType (string, required) — must be one of: `car`, `bike`, `auto`

Example:
```json
{
  "fullname": {
    "firstname": "Jane"
  },
  "email": "jane@example.com",
  "password": "securepassword",
  "vechicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vechicleType": "car"
  }
}
```

### Validation rules & messages
- `fullname.firstname` — min length 3 ("First name is required")
- `email` — must be a valid email ("Valid email is required")
- `password` — min length 6 ("Password must be at least 6 characters long")
- `vechicle.color` — min length 3 ("Vechicle color is required")
- `vechicle.plate` — min length 3 ("Vechicle plate is required")
- `vechicle.capacity` — integer, min 1 ("Vechicle capacity is required")
- `vechicle.vechicleType` — must be `car`, `bike`, or `auto` ("Vechicle type must be car, bike or auto")

### Responses

- 201 Created
  - Body: `{ "token": "<jwt>", "captain": { ...captainWithoutPassword } }`
  - The password is hashed on the server and is not returned.
