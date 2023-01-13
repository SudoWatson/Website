FROM node:18

WORKDIR /app

EXPOSE 5000

# Setup final file and folder locations
RUN mkdir build && mkdir src
WORKDIR /app/build
RUN mkdir ./server && mkdir ./client
COPY package*.json ./
RUN npm i
WORKDIR /app/src
RUN mkdir ./server && mkdir ./client

# Install node packages
RUN npm install -g sass serve

COPY package*.json ./

COPY ./client/package*.json ./client/

COPY ./server/package*.json ./server/

RUN npm run install-packages

# Copy over the rest of the program
COPY . .

# Transpile scss files
RUN sass .

# Build Apps
RUN npm run build

# Move built apps
RUN cp -r ./server/. ../build/server
RUN cp -r ./client/build/. ../build/client

WORKDIR /app
# Remove everything outside of build folder
WORKDIR /app/build

CMD ["npm", "run", "start-prod"]