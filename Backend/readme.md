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
