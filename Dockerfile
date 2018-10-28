FROM node:8.12-alpine

WORKDIR /app
COPY package*.json /app/

# install required packages
RUN apk update && apk add openssl

# Create private key and SSL certificate
#
# This uses the '-nodes' switch to skip encrypting the private key which is A VERY BAD IDEA!
# DO NOT TRY THIS IN PRODUCTION!
RUN openssl req -x509 -sha256 -nodes -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -subj "/C=IN/ST=Karnataka/L=Bengaluru/O=Nagendra Mahesh/OU=Test/CN=localhost"

# Install the app and its dependencies
RUN npm install --only=production

# Copy all artifacts into the working directory
COPY . /app

# Set the right environment
ENV PORT=443
ENV KEYFILE='/app/key.pem'
ENV CERTFILE='/app/cert.pem'

# Start the app
CMD npm start

# Expose the port
EXPOSE 443
