# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm cache clean --force
RUN apk add --no-cache --virtual .gyp \
    python \
    make \
    g++ \
    && npm install \
    && npm install react-scripts@3.4.1 -g \
    && apk del .gyp

# add app
COPY . ./

# start app
CMD ["npm", "start"]
