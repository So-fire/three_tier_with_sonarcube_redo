# -------- Stage 1: Build React App --------
FROM node:18-alpine AS build
# Set the working directory
WORKDIR /app
# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
# Install Babel plugin if required by the project
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object
# Copy the rest of the application code
COPY . .
# Build the React application
RUN npm run build

# -------- Stage 2: Serve with Nginx --------
FROM nginx:alpine
# Copy build output from the previous stage to Nginx's web directory
COPY --from=build /app/build /usr/share/nginx/html
# Replace default Nginx config with custom config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80 for HTTP traffic
EXPOSE 80
# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]