# FROM node:11.1.0-alpine as build

FROM node:14.0.0-alpine as build

WORKDIR /app
COPY cicd/gitops-stack/webapp01/package*.json /app/
# COPY package*.json /app/

RUN npm install

# COPY ./ /app/
COPY cicd/gitops-stack/webapp01/ /app/

RUN npm run build

# FROM nginx:1.15.8-alpine
FROM nginx:1.17.10-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]