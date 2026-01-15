# /users/register Endpoint Documentation

## Endpoint
`POST /users/register`

## Description
Registers a new user in the system. This endpoint accepts user details, validates the input, and creates a new user account.

## Request Body

The following JSON fields are required in the request body:

```json
{
  "username": "string",   // Required: Unique username for the user
  "email": "string",      // Required: Valid email address
  "password": "string"    // Required: Password (minimum requirements may apply)
}
```

## Status Codes

- **201 Created**  
  User registered successfully.

- **400 Bad Request**  
  Missing or invalid input data.

- **409 Conflict**  
  Username or email already exists.

- **500 Internal Server Error**  
  An unexpected error occurred on the server.

## Example Request

```http
POST /users/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

## Example Response (201 Created)

```json
{
  "message": "User registered successfully."
}
```
