ls
#stop container and remove
sudo docker rm -f reactcicd 
#remove image
sudo docker rmi reactcicd

#build image
sudo docker build -t reactcicd . 

#run container
sudo docker run \
-e REACT_APP_BASE_URL=https://api.example.com \
-e REACT_APP_authservice= http://10.11.12.243:8061\
-e REACT_APP_userservice=http://10.11.12.243:8062/qfuserservice \
-e REACT_APP_qfservice=http://10.11.12.243:8063/qfservice \
-e REACT_APP_dashboard=http://10.11.12.243:8064/qfdashboard \
-e REACT_APP_report=http://10.11.12.243:8065/qfreportservice \
-e REACT_APP_biservice=http://10.11.12.243:8066/bireport \
-p 1122:3000 -d --name reactcicd reactcicd


echo "shel executed successfully"

