# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:17.4.0

# A directory within the virtualized Docker environment
WORKDIR /usr/server

# Copies everything in the current directory over to Docker environment
COPY . .

# Installs all node packages in Docker environment
RUN npm install

# Uses port which is used by the actual application
EXPOSE 5000

# Finally runs the application
CMD [ "yarn", "start-babel" ]
