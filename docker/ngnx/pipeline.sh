sudo docker stop reactcicdnginxcontainer || true


sudo docker rm reactcicdnginxcontainer || true

# Delete the Docker image
sudo docker rmi reactcicdnginximage:latest || true



sudo docker build -t reactcicdnginximage:latest .


sudo docker run \
-e REACT_APP_BASE_URL='http://10.11.12.243:8083' \
-e REACT_APP_AUTH_SERVICE='http://10.11.12.243:8060/qfauthservice' \
-e REACT_APP_USER_SERVICE='http://10.11.12.243:8060/qfuserservice' \
-e REACT_APP_APP_SERVICE='http://10.11.12.243:8060/qfservice' \
-e REACT_APP_DASHBOARD_SERVICE='http://10.11.12.243:8060/qfdashboard' \
-e REACT_APP_REPORT_SERVICE='http://10.11.12.243:8060/qfreportservice' \
-e REACT_APP_BI_SERVICE='http://10.11.12.243:8060/biservice' \
-p 3005:3000 -d --name reactcicdnginxcontainer reactcicdnginximage:latest

exit
