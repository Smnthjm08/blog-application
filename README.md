# Node.js, Express, EJS & MongoDB Blog - CRUD

This is a simple CRUD (Create, Read, Update, Delete) blog application built using Node.js, Express, EJS (Embedded JavaScript), and MongoDB. It allows users to create, view, update, and delete blog posts.

## Features

- Create, Read, Update, and Delete blog posts.
- User-friendly interface.
- Secure authentication using JSON Web Tokens (JWT).

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript)
- MongoDB

## Prerequisites

- Node.js installed on your machine.
- MongoDB Free Cluster or a locally running MongoDB instance.
- Create a `.env` file to store your credentials. Example below:
  MONGODB_URI=mongodb+srv://:@clusterName.xxxxxxx.mongodb.net/blog JWT_SECRET=MySecretBlog

## Getting Started

### Installation

To install and run this project:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using npm:

$ npm install

### Usage

To start the server, run:

$ npm run dev

Access the blog application by visiting `http://localhost:3000` in your web browser.
