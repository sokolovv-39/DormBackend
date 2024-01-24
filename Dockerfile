FROM node:lts-alpine
WORKDIR /usr/src/DormServer
COPY . .
RUN npm install --force --verbose
EXPOSE 4200
CMD echo "Dependencies was successfully installed" \
&& npm run migration-run \
&& echo "Migrations was applied" \
&& npm run build \
&& npm run start:prod \
&& echo "Backend is working in prod mode"