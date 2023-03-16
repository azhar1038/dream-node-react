FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["nodemon", "-L", "index.js"]