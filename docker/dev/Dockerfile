#FROM node:18-alpine
#WORKDIR /qf_react
#COPY . .
#RUN npm i
#CMD ["npm","start"]




FROM node:16
 
# Set the working directory inside the container

WORKDIR /usr/src/app
 
# Copy package.json and package-lock.json to the working directory

COPY package*.json ./
 
# Install dependencies

RUN npm install
 
# Copy the rest of the application code

COPY . .
 
# Build the React app

#RUN npm run build
 
# Expose the port the app will run on

EXPOSE 3000
 
# Command to run the application

CMD ["npm", "start"]
