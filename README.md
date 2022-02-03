# Basic MERN App

### Front-End - React + Redux

### Back-End - Node.js, Express.js & MongoDB

To run it locally -

## Steps:-

1. Fork the repo and clone it.
2. Make sure you have Node.js & MongoDB pre-installed in your system.
3. [Only once] Run (from the root) `npm install` and `cd client && npm install`.
4. Open two terminal windows (one for running Server and other for the UI).
5. Start MongoDB service with `sudo service mongod start`.
6. Run `npm run start-babel` to start the server. By default it will run on `port 5000`.
7. For UI run `npm run client` and it will open on a new tab on `port 3000`.

## Steps to run client & server in docker containers locally:-

1. Fork the repo and clone it.
2. Create a file named `.env` (from the root) and add the following entry `MONGODB_DOMAIN=host.docker.internal`.
3. MongoDB pre-installed in your system.
4. [Only once] Run (from the root) `npm install` and `cd client && npm install`.
5. Open two terminal windows (one for running Server and other for the UI).
6. Start MongoDB service with `sudo service mongod start`.
7. Start Docker.
8. Build the server by running `docker build .` (from the root). Then run the server by running `docker run -p 5000:5000 [IMAGE ID]`. By default it will run on `port 5000`.
9. Build the client by running `docker build .` (from `client/`). Then run the client by running `docker run -p 3000:3000 [IMAGE ID]`. By default it will run on `port 3000`.
