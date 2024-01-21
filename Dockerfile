FROM node:lts-alpine
RUN npm install --force --verbose
EXPOSE 4200
ENTRYPOINT ["echo", "Dependencies successfully installed"]