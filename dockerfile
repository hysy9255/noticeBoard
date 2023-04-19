FROM node:16.15-alpine3.15
WORKDIR /app
COPY ./ /app/
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]