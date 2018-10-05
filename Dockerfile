FROM node:8.12-alpine
WORKDIR /app
COPY package*.json /app/
RUN npm install --only=production
COPY . /app
CMD npm start
EXPOSE 8765
ENV PORT=8765
