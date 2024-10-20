# Use Node.js image from Docker Hub
FROM node:18-alpine

# Set the working directory to /app in the container
WORKDIR /app

# Copy package.json và package-lock.json để cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies cho backend
RUN npm ci

# Copy toàn bộ mã nguồn vào container
COPY . .

# Chạy lệnh để khởi động backend
CMD ["npm", "start"]
