FROM node:lts-alpine
WORKDIR /opt/docker/DormBackend
RUN rm -f package-lock.json
RUN rm -rf node_modules
RUN npm cache clean --force
RUN npm install --force --verbose
EXPOSE 4200
ENTRYPOINT ["echo", "Dependencies successfully installed"]