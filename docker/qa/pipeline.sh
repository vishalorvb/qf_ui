#ls
##stop container and remove
#sudo docker rm -f reactcicd 
##remove image
#sudo docker rmi reactcicd

##build image
#sudo docker build -t reactcicd ../../ 

##run container
#sudo docker run \
#-e BASE_URL=https://api.example.com \
#-e authservice=http://10.11.12.243:8061 \
#-e userservice=http://10.11.12.243:8062/qfuserservice \
#-e qfservice=http://10.11.12.243:8063/qfservice \
#-e dashboard=http://10.11.12.243:8064/qfdashboard \
#-e report=http://10.11.12.243:8065/qfreportservice \
#-e biservice=http://10.11.12.243:8066/bireport \
#-p 1122:3000 -d --name reactcicd reactcicd


#!/bin/bash

# Change to the directory where Jenkins workspace for ReactCICD is located
cd /var/lib/jenkins/workspace/QAReactCICD


# Stop the existing container if it's running (ignore errors if it doesn't exist)
sudo docker stop qareactcicdcontainer || true

# Remove the existing container if it exists (ignore errors if it doesn't exist)
sudo docker rm qareactcicdcontainer || true

# Delete the Docker image
sudo docker rmi qareactcicdimage:latest || true

# Navigate to your Spring Boot application directory
cd /var/lib/jenkins/workspace/QAReactCICD/docker/qa

sudo rsync -av --exclude=docker/  /var/lib/jenkins/workspace/QAReactCICD/ /var/lib/jenkins/workspace/QAReactCICD/docker/qa/
pwd
ls -l
# Build a Docker image with "latest" tag
sudo docker build -t qareactcicdimage:latest .

# Run a Docker container from the created image
#sudo docker run -d -p 1122:3000 --name reactcicdcontainer reactcicdimage:latest

sudo docker run \
-e BASE_URL='http://10.11.12.243:8050' \
-e AUTH_SERVICE='http://10.11.12.243:8050/qfauthservice' \
-e USER_SERVICE='http://10.11.12.243:8050/qfuserservice' \
-e APP_SERVICE='http://10.11.12.243:8050/qfservice' \
-e DASHBOARD_SERVICE='http://10.11.12.243:8050/qfdashboard' \
-e REPORT_SERVICE='http://10.11.12.243:8050/qfreportservice' \
-e BI_SERVICE='http://10.11.12.243:8050/biservice' \
-p 3001:3000 -d --name qareactcicdcontainer qareactcicdimage:latest

exit
