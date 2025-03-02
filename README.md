# X Clone
### A MERN Web Application, crafting a Twitter clone from scratch.
### The Application Incorporates key features such as User Authentication, the ability to follow/unfollow other users, posting tweets, engaging with content through liking and unliking and the users can explore the followers and followings of different accounts.
### Additionally, the application integrates Socket.io, enabling real-time chat functionality for users to engage in private conversations within the platform.
[LINK : X Clone](https://xclonebyme.netlify.app)

## Description
X Clone is a web application designed to mimic the core features of Twitter. It allows users to create an account, post tweets, follow other users, and engage with their content through likes and unlikes. The application also features a real-time chat functionality using Socket.io, enabling users to have private conversations.

## Features
* User Authentication: Users can create an account and log in to access the application's features.
* Posting Tweets: Users can post tweets, which are displayed on their profile and the homepage.
* Following/Unfollowing: Users can follow and unfollow other users to see their tweets on the homepage.
* Liking/Unliking: Users can like and unlike tweets to engage with content.
* Real-time Chat: Users can have private conversations with each other using Socket.io.
* Profile Exploration: Users can view their own profile and the profiles of other users, including their tweets and followers.

## Technologies Used
* Frontend: React, CSS, JavaScript
* Backend: Node.js, Express.js
* Database: MongoDB
* APIs/Libraries: Socket.io, Mongoose, Bcryptjs, JsonWebToken

## Installation
```bash
# Install dependencies for the server
cd server
npm install

# Start the server
node index.js

# Install dependencies for the client
cd ../client
npm install

# Start the client
npm run dev
```

## Usage Guide
1. Create an account by clicking on the "Sign Up" button and filling out the registration form.
2. Log in to your account using the "Log In" button.
3. Post a tweet by clicking on the "Post A Tweet" button and typing in the tweet box.
4. Follow another user by clicking on their profile and then clicking the "Follow" button.
5. Like or unlike a tweet by clicking on the like or unlike button below the tweet.
6. Start a private conversation with another user by clicking on their profile and then clicking the "Message" button.

## API Documentation
| Endpoint | Method | Description |
| --- | --- | --- |
| /auth/signup | POST | Create a new user account |
| /auth/signin | POST | Log in to an existing user account |
| /user/getuser | GET | Get a user's profile information |
| /user/follow | PATCH | Follow another user |
| /user/unfollow | PATCH | Unfollow another user |
| /post/tweet | POST | Post a new tweet |
| /post/like | PATCH | Like a tweet |
| /post/unlike | PATCH | Unlike a tweet |
| /chat/sendMessage | PATCH | Send a message to another user |

## Project Structure
* `client/`: The React frontend application
* `server/`: The Node.js backend application
* `server/models/`: MongoDB schema definitions
* `server/controllers/`: Backend logic for handling requests
* `server/routes/`: Backend routes for handling requests

#### LINK : [X Clone](https://xclonebyme.netlify.app)
[NOTE : THE FIRST REQUEST TO THE SERVER WILL TAKE TIME(FOR STARTING THE SERVER). (i.e THE FIRST LOADING IN THE WEBSITE WILL TAKE AT MOST 1-2Minutes And Others Will Be Normal)]

### Sign-Up Page
![Screenshot (773)](https://github.com/shubhamjaiswar43/xClone/assets/118053732/67f20e2c-63a5-4883-90f5-02a73c7ea50f)

### Sign-In Page
![Screenshot (775)](https://github.com/shubhamjaiswar43/xClone/assets/118053732/b82e147f-0523-4bb5-87d3-ad55383ee655)

### Home Page
![Screenshot (776)](https://github.com/shubhamjaiswar43/xClone/assets/118053732/6d55e1b6-261a-4904-88ad-ca021cf7c4e8)

### Post Page
![Screenshot (777)](https://github.com/shubhamjaiswar43/xClone/assets/118053732/55dbe8fd-91ba-449b-8358-21cb3576e928)

### Profile Page
![Screenshot (778)](https://github.com/shubhamjaiswar43/xClone/assets/118053732/199213b0-0c3b-4465-aeb2-ae9ada74a8d0)

### Followings/Followers Page
![Screenshot (779)](https://github.com/shubhamjaiswar43/xClone/assets/118053732/952c9033-f740-4a08-9c27-95d358fef586)

### Seeing Profile Of Different Users
![Screenshot (971)](https://github.com/shubhamjaiswar43/xClone/assets/118053732/4f29755c-28b0-4b7f-b8e9-bda6f15bcc62)

### Messages Page
![Screenshot (973)](https://github.com/shubhamjaiswar43/xClone/assets/118053732/b1a92b73-abf0-4598-a340-bf924ac94b6e)

### Chatting Page
![Screenshot (972)](https://github.com/shubhamjaiswar43/xClone/assets/118053732/3a6710b0-4034-4022-86a7-c6655b2eb527)

