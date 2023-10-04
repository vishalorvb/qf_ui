FROM node:alpine3.16 as nodework
WORKDIR /qf_react
COPY package.json .
RUN npm i
COPY . .
RUN npm run build



FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=nodework /qf_react/build .
ENTRYPOINT ["nginx","-g","daemon off;"]