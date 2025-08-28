FROM node:24

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Run tests 
RUN npm run test:ci