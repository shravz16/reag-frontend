FROM node:18-alpine
WORKDIR /app


# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Install serve to run the production build
RUN npm install -g serve

# Expose port 3000 (serve default port)
EXPOSE 3000

# Start serve with the build directory
CMD ["serve", "-s", "build", "-l", "3000"]