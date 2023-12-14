


sudo docker stop reactcicdcontainer || true


sudo docker rm reactcicdcontainer || true

# Delete the Docker image
sudo docker rmi reactcicdimage:latest || true



sudo docker build -t reactcicdimage:latest .


sudo docker run \
-e REACT_APP_BASE_URL='http://10.11.12.243:8083' \
-e REACT_APP_AUTH_SERVICE='http://10.11.12.243:8061/qfauthservice' \
-e REACT_APP_USER_SERVICE='http://10.11.12.243:8062/qfuserservice' \
-e REACT_APP_APP_SERVICE='http://10.11.12.243:8063/qfservice' \
-e REACT_APP_DASHBOARD_SERVICE='http://10.11.12.243:8064/qfdashboard' \
-e REACT_APP_REPORT_SERVICE='http://10.11.12.243:8065/qfreportservice' \
-e REACT_APP_BI_SERVICE='http://10.11.12.243:8066/biservice' \
-p 3000:3000 -d --name reactcicdcontainer reactcicdimage:latest

exit
