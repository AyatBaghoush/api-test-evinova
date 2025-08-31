FROM node:24

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Run tests 
CMD ["sh", "-c", "npm run test"]
#RUN npm run test:ci