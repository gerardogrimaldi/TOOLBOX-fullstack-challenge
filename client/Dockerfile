# Use Node.js 16 as the base image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install && npm install -g webpack webpack-cli

# Copy the rest of the application code
COPY . .

# Expose the frontend port
EXPOSE 3000

# Start the frontend
CMD ["npm", "start"]