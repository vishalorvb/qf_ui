FROM node:lts-alpine3.16 as build
WORKDIR /qf_react_cicd
COPY package.json .
RUN npm i
COPY . .
RUN npm run build



FROM nginx
EXPOSE 1122
COPY default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
COPY --from=build /qf_react/dist .
ENTRYPOINT ["nginx","-g","daemon off;"]