npm i
npm run build
docker build -t qf-react-app .
docker run -p 3009:80 qf-react-app
