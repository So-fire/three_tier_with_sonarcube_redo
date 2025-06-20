# Use a lightweight Node.js base image
FROM node:18-alpine
# Set the working directory
WORKDIR /app
# Copy only the package files first (for caching layers)
COPY package*.json ./
RUN npm install
# Copy the rest of the backend code
COPY . .
# Add wait-for-it script to wait for the DB service
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
# Expose the backend API port
EXPOSE 4000
# Remove default entrypoint if any
ENTRYPOINT []
# Run the backend server after waiting for the database to be ready
CMD ["/wait-for-it.sh", "db", "3306", "--", "npm", "start"]


# # Use a lightweight Node.js base image
# FROM node:18-alpine

# # Install netcat (required by wait-for-it.sh)
# RUN apk add --no-cache netcat-openbsd

# # Set the working directory
# WORKDIR /app

# # Copy only the package files first (for caching layers)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the backend code
# COPY . .

# # Copy the wait-for-it script and make it executable
# COPY wait-for-it.sh /wait-for-it.sh
# RUN chmod +x /wait-for-it.sh

# # Expose the backend API port
# EXPOSE 4000

# # Start the app after waiting for db
# CMD ["/wait-for-it.sh", "db", "3306", "--", "npm", "start"]
