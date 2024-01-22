FROM node:lts-alpine
WORKDIR /usr/src/DormServer
COPY . .
RUN npm install --force --verbose
EXPOSE 4200
ENTRYPOINT ["echo", "Dependencies successfully installed"]