#ls
##stop container and remove
#sudo docker rm -f reactcicd 
##remove image
#sudo docker rmi reactcicd

##build image
#sudo docker build -t reactcicd ../../ 

##run container
#sudo docker run \
#-e REACT_APP_BASE_URL=https://api.example.com \
#-e REACT_APP_authservice=http://10.11.12.243:8061 \
#-e REACT_APP_userservice=http://10.11.12.243:8062/qfuserservice \
#-e REACT_APP_qfservice=http://10.11.12.243:8063/qfservice \
#-e REACT_APP_dashboard=http://10.11.12.243:8064/qfdashboard \
#-e REACT_APP_report=http://10.11.12.243:8065/qfreportservice \
#-e REACT_APP_biservice=http://10.11.12.243:8066/bireport \
#-p 1122:3000 -d --name reactcicd reactcicd


#!/bin/bash

# Change to the directory where Jenkins workspace for ReactCICD is located
cd /var/lib/jenkins/workspace/ReactCICD


# Stop the existing container if it's running (ignore errors if it doesn't exist)
sudo docker stop reactcicdcontainer || true

# Remove the existing container if it exists (ignore errors if it doesn't exist)
sudo docker rm reactcicdcontainer || true

# Delete the Docker image
sudo docker rmi reactcicdimage:latest || true

# Navigate to your Spring Boot application directory
cd /var/lib/jenkins/workspace/ReactCICD/docker/dev

# Remove any files or directories starting with "package.json" (if they exist)
sudo rm -rf package.json

# Copy the built Spring Boot JAR to the current directory
sudo cp /var/lib/jenkins/workspace/ReactCICD .

# Build a Docker image with "latest" tag
sudo docker build -t reactcicdimage:latest .

# Run a Docker container from the created image
#sudo docker run -d -p 1122:3000 --name reactcicdcontainer reactcicdimage:latest

sudo docker run \
-e REACT_APP_BASE_URL='https://api.example.com' \
-e REACT_APP_authservice='http://10.11.12.243:8061' \
-e REACT_APP_userservice='http://10.11.12.243:8062/qfuserservice' \
-e REACT_APP_qfservice='http://10.11.12.243:8063/qfservice' \
-e REACT_APP_dashboard='http://10.11.12.243:8064/qfdashboard' \
-e REACT_APP_report='http://10.11.12.243:8065/qfreportservice' \
-e REACT_APP_biservice='http://10.11.12.243:8066/bireport' \
-p 1122:3000 -d --name reactcicdcontainer reactcicdimage:latest

exit
