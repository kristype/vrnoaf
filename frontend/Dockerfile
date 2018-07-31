### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:9 as builder

ARG WP_ENDPOINT

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

RUN echo "Endpoint -> $WP_ENDPOINT"

RUN sed -i "s/\(.*wpApiUrl: 'http:\/\/\).*\(\/wp-json\/wp\/v2\/',\)/\1$WP_ENDPOINT\2/" src/environments/environment.prod.ts

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod --build-optimizer


### STAGE 2: Setup ###

FROM nginx:1

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]