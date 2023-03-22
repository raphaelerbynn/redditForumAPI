
# reddit-style Forum API

## Overview
This is a reddit-style Forum RESTful API . The API provides the ability to create, read, update, and delete posts and comments.

## Running the API
### To run the API, follow these steps:

- Clone the repository to your local machine
- Install the required dependencies by running npm install
- Create a .env file at the root directory of the project and add the following environment variables:
  - PORT (the port number on which the server will run)
  - DB_NAME (the database name)
  - DB_USERNAME (Database username)
  - DB_PASSWORD (database password)
  - DB_DIALECT (the database dialect)
  - JWT_SECRET_KEY (a secret key used to sign and verify JSON Web Tokens)
- Start the server by running: npm run start

## Endpoints
### Authentication
- **POST** /register: Register a new user with a email, and password
- **POST** /login: Log in a user with their email and password and receive a JSON Web Token (JWT) that must be included in the Authorization header for all endpoints except one with GET method.

### Posts
- **GET** /post: Get a list of all posts
- **POST** /post: Create a new post with a title and a content
- **GET** /post/:post_id: Get a specific post by its ID
- **PUT** /post/:post_id: Update a specific post by its ID with a new
- **DELETE** /post/:post_id: Delete a specific post by its ID along with all comments relating to it

### Comments
- **GET** /post/:post_id/comment: Get all comments for a post
- **POST** /post/:post_id/comment: Create a new comment for a post
- **GET** /post/:post_id/comment/:comment_id: Get a comment by ID for a post
- **PUT** /post/:post_id/comment/:comment_id: Update a comment by ID for a post
- **DELETE** /post/:post_id/comment/:comment_id: Delete a comment by ID for a post



