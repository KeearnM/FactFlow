/** PLACEHOLDER **/

# GA Software Engineering Immersive: Project 3

# FactFlow App

## Technologies Used

![MongoDB](/public/mongoDB.png)
![Express](/public/express.png)
![React](/public/react.png)
![Node.js](/public/node.js.png)
![JS](/public/js.png)
![HTML5](/public/html5.png)
![CSS](/public/css.png)
![npm](/public/npm.png)
![Material UI](/public/material_ui.png)

## Getting Started

### Backend Configuration

- Go to the project backend folder and create a new package.json file

  `npm init -y`

- Install the packages:

  `npm i dotenv express-validator mongoose jsonwebtoken bcrypt uuid cors helmet express-rate-limit`

  - dotenv: A package used to load environment variables from a .env file into process.env.
  - Express-validator: A set of middleware functions to validate input data in Express.js applications.
  - mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straight-forward, schema-based solution to model application data.
  - Jsonwebtoken: A library to create and verify JSON Web Tokens (JWT) for secure communication between parties.
  - bcrypt: A library to help hash passwords securely.
  - Uuid: A package to generate universally unique identifiers (UUIDs).
  - Cors: A package to enable CORS (Cross-Origin Resource Sharing) in Express.js applications, allowing controlled access to resources from other domains.
  - Helmet: A package to secure Express.js apps by setting various HTTP headers.
  - Express-rate-limit: A middleware to limit repeated requests to your API to protect against abuse and improve stability.

- Create your .env and add the database path (like below for localhost)

  ` DATABASE=mongodb://127.0.0.1:27017/factflow`

### Frontend Configuration

- Get your API keys by creating an account at:
  - Perigon API https://www.goperigon.com/
  - Gemini API
- Create .env file and add the following (double check Perigon's website for the latest URL/version):
  - VITE_PERIGON_ARTICLES_URL=https://api.goperigon.com/v1/all
  - VITE_PERIGON_STORIES_URL=https://api.goperigon.com/v1/stories/all
  - VITE_PERIGON_API_KEY=<YOUR_API_KEY>
- Go to the project frontend folder and install react-app

  `npm i`

- Install react-router-dom

  `npm install react-router-dom`

- Install react-pro-sidebar

  `npm install react-pro-sidebar`

- Install Material UI

  `npm install @mui/material @emotion/react @emotion/styled`

- Install Material UI Icons

  `npm install @mui/icons-material`
- Install Google Gemini
  `npm install @google/generative-ai`

**NOTE:** If you run into dependency errors just run:
`npm config set legacy-peer-deps true`

## Features

## Architecture / Challenges

## Some Interesting stuff...

## Next Steps
