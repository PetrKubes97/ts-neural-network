FROM node:16-slim AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.19-alpine

# Hackary to listen on the port that cloud run expects
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

COPY index.html  /usr/share/nginx/html/
COPY main.css  /usr/share/nginx/html/
COPY --from=build /app/dist /usr/share/nginx/html/dist
