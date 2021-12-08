#Specify Node Version an Image
# Name Image development
FROM node:14.18.1 AS development

# Specify Working directory inside the container
WORKDIR /api/src/app

# Copy package-lock.json and package.json to the container
COPY package.json yarn.lock ./

# Installation dependencies inside container
RUN yarn install

# Bundle App Sources
COPY . .

RUN yarn run build

EXPOSE 3000



################
## PRODUCTION ##
################
# Below is the Production image named production
FROM node:14.18.1 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Specify Working directory inside the container
WORKDIR /api/src/app

# Copy package-lock.json and package.json to the container
COPY --from=development /api/src/app .

EXPOSE 3000

# run app
CMD ["node", "dist/main"]