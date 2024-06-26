# L2B2-Frontend-Path-Assignment-6-Server-Starter-Pack

## Installation:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Rename `.env.example` to `.env`.
4. Run the server using `npm run dev`.

### Before Pushing Code:

1. Before pushing your code to the remote repository, ensure that you have run the following command in your terminal (Git Bash):
   ```bash
   rm -rf .git
   ```

## Configuration:

- Environment Variables:
  - `PORT`: Port number the server listens on. Default: 3000
  - `MONGODB_URI`: URI for MongoDB database.
  - `JWT_SECRET`: Secret key for JWT token generation.
  - `EXPIRES_IN`: Token expiration time.

## Usage:

- API Endpoints:

  - POST `/api/auth/login`

    - Description: Authenticates user and returns a JWT token.
    - Request:
      ```json
      {
        "email": "example@email.com",
        "password": "password"
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "message": "User registered successfully"
      }
      ```

  - POST `/api/auth/register`
    - Description: Registers a new user.
    - Request:
      ```json
      {
        "name": "John",
        "email": "example@email.com",
        "password": "password"
      }
      ```
    - Response:
      ```json
      {
        "success": true,
        "message": "Login successful",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBoMkBleGFtcGxlLmNvbSIsImlhdCI6MTcwNzg1MDYyMSwiZXhwIjoxNzA3OTM3MDIxfQ.7EahSgmPLPNuZ_T9ok-B6TayWCJVdxPzi_Nx4UfrhvY"
      }
      ```

## Dependencies:

- `bcrypt`: Library for hashing passwords.
- `cors`: Express middleware for enabling CORS.
- `dotenv`: Loads environment variables from .env file.
- `express`: Web framework for Node.js.
- `jsonwebtoken`: Library for generating and verifying JWT tokens.
- `mongodb`: MongoDB driver for Node.js.
- `nodemon`: Utility for automatically restarting the server during development.

‣㉬戭 ⴲ 獡楳湧敭瑮㘭戭捡敫摮匭浵楡慹㜱 ਸ਼

# UnityAid

After clone the code command "npm i" and to start command "npm run dev"

# Project Name: UnityAid

## Live Url: https://bespoke-churros-13e845.netlify.app

## Features:

- Login, Logout system
- Private route
- Can add donation post
- Also anyone can add his/her donation data
- logged In user can see dashboard pie chart with category wise donation data
- user can see grid and tabular form of donation post data
- logged in user can edit and delete any data

## Technology used:

    - react
    - react router dom
    - redux
    - RTK Query
    - express
    - mongodb
    - imgbb

‣潤慮楴湯瀭慬晴牯 ⵭ 慢正湥 ੤‣潤慮楴湯瀭慬晴牯 ⵭ 慢正湥 ੤
