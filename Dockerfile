FROM node:alpine
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ $NODE_ENV = "development" ]; \
  then npm install; \
  else npm install --only=production; \
  fi


COPY . ./
ENV PORT 80 
EXPOSE $PORT
# CMD ["node", "src/server.js"]