# Use Node.js image from Docker Hub
FROM node:18-alpine

# Set the working directory to /app in the container
WORKDIR /app

# Copy package.json và package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies for the frontend
RUN npm ci

# Copy all source code into the container
COPY . .

# Run the command to start the frontend
CMD ["npm", "start"]

