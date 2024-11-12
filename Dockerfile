# Use an official Node.js image as the base
FROM node:18

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (if you have one)
# This allows Docker to cache dependencies, speeding up builds
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (make sure it matches the port your Node.js server uses)
EXPOSE 4000

# Define the command to run the application
CMD ["npm", "start"]