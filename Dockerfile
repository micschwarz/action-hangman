# build app
FROM node:current AS base
WORKDIR /hangman

COPY package*.json ./

RUN npm install
COPY . .

ENV NODE_ENV=production
RUN npm run build

# run app
FROM nginx

COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=base /hangman/dist/ /usr/share/nginx/html/