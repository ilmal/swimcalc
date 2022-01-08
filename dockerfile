# pull official base image
FROM node:16

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies  // script the file to support multiple application at once, for the backend and frontend to share a single container
COPY package*json ./
RUN npm install

#installing backend
COPY /backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install
WORKDIR /app

# add app
COPY . ./

# start app
CMD ["npm", "run", "prod"]

