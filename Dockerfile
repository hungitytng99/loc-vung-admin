FROM node:16-alpine3.11
# set working directory
WORKDIR /app
# install app dependencies
COPY . .
RUN npm install 
RUN npx browserslist@latest --update-db
# start app
CMD ["npm", "start"]
