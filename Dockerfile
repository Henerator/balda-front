FROM node:21-alpine AS build

WORKDIR /app

COPY package*.json ./

# install depedencies
RUN npm install

# copy all files
COPY . .

# build app
RUN npm run build --prod

FROM nginx:1.25-alpine

# clean directory
RUN rm -rf /usr/share/nginx/html/*

# copy app from build step
COPY --from=build /app/dist/balda-front /usr/share/nginx/html

# copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# open ports
EXPOSE 80
EXPOSE 443

# run nginx
CMD ["nginx", "-g", "daemon off;"]
