FROM node:lts-alpine
ENV NODE_ENV=production
ENV SAMPLE_VAR=asd
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "yarn.lock", "./"]
# RUN npm install --production --silent && mv node_modules ../
RUN yarn
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
