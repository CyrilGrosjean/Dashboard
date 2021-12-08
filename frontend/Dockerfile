#Specify Node Version an Image
# Name Image development
FROM node:14.18.1 AS development

# Specify Working directory inside the container
WORKDIR /frontend/src/app

# Copy package-lock.json and package.json to the container
COPY package.json yarn.lock ./

# Installation dependencies inside container
RUN yarn install
RUN yarn global add @angular/cli

# Bundle App Sources
COPY . .

RUN yarn run build

EXPOSE 4200