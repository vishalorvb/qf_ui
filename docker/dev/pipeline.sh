


sudo docker stop reactcicdcontainer || true


sudo docker rm reactcicdcontainer || true

# Delete the Docker image
sudo docker rmi reactcicdimage:latest || true



sudo docker build -t reactcicdimage:latest .


sudo docker run \
-e REACT_APP_BASE_URL='https://api.example.com' \
-e REACT_APP_authservice='http://10.11.12.243:8061' \
-e REACT_APP_userservice='http://10.11.12.243:8062/qfuserservice' \
-e REACT_APP_qfservice='http://10.11.12.243:8063/qfservice' \
-e REACT_APP_dashboard='http://10.11.12.243:8064/qfdashboard' \
-e REACT_APP_report='http://10.11.12.243:8065/qfreportservice' \
-e REACT_APP_biservice='http://10.11.12.243:8066/biservice' \
-e REACT_APP_SAVE_USER_LOCAL_GIT_DETAILS='http://10.11.12.243:8062/qfuserservice/userexecutionparameters/saveUserExecutionParameters' \
-p 3000:3000 -d --name reactcicdcontainer reactcicdimage:latest

exit
