FROM node:18 as build
COPY . ./app
WORKDIR /app
RUN npm ci
RUN npm run build


FROM nginx:alpine
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
