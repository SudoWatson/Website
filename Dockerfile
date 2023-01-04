FROM node:18

WORKDIR /app

EXPOSE 3000

RUN npm install -g sass serve

COPY package*.json ./

RUN npm install

COPY . .

RUN sass .

RUN npm run build

CMD ["serve", "-s", "build"]