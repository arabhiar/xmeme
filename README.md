# xMeme

xMeme is a web application which can be used to post meme.

## Installation and Configuration

First of all you need to install node.

Then clone the repository

```bash
cd abhishekrotary2002-me_buildout_xmeme    # move to cloned project
```

For frontend

```bash
cd frontend/
npm install
```

For backend
```bash
cd backend/
npm install
export NODE_ENV=development
export MONGO_URI=<mongoDB_URL_to_database> # you can also make a .env file in backend directory ans paste these two environment variables
```
For running web application locally.
```bash
cd backend/
npm run dev        # for running front-end and back-end simultaneously using concurrently
npm run server     # for running server (by default the port is 8081)
npm run client     # for running client (by default the port is 3000)
```

## Routes

Routes for backend
``` bash
GET /memes - list all memes
GET /meme/:id - get a meme with the given ID
POST /memes - post a meme
PATCH /memes/:id - update a meme with the given ID
```

## Tech Stack Used


- ReactJS
- Redux
- NodeJS
- Express
- MongoDB



## Deployed Website
- [xMeme-Frontend](https://xmeme-arabhiar-f.netlify.app/)
- [xMeme-Backend](https://xmeme-arabhiar-local.herokuapp.com/)