FROM node:18 as build
WORKDIR /app
COPY . ./
CMD npm ci
CMD npm run build
CMD npm run start


#FROM nginx:alpine
#COPY --from=build /app/out /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
