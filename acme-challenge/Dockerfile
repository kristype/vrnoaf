FROM nginx:1

## Copy our default nginx config
COPY nginx/nginx.conf /etc/nginx/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

CMD ["nginx", "-g", "daemon off;"]