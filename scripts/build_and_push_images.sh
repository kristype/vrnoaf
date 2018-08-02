#!/bin/bash

docker login

docker build -t kristianw87/vrnoaf-reverseproxy:latest ..\reverseproxy
docker build -t kristianw87/vrnoaf-acme-challenge:latest ..\acme-challenge
docker build -t kristianw87/vrnoaf-frontend:latest --build-arg WP_ENDPOINT=wp\.vrnoaf\.no ..\frontend

docker push kristianw87/vrnoaf-reverseproxy
docker push kristianw87/vrnoaf-acme-challenge
docker push kristianw87/vrnoaf-frontend