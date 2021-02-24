#!/bin/bash

docker login

docker build -t kristianw87/vrnoafqa-reverseproxy:latest -f ..\reverseproxy\Dockerfile.qa ..\reverseproxy
docker build -t kristianw87/vrnoafqa-acme-challenge:latest -f ..\acme-challenge\Dockerfile.qa ..\acme-challenge
docker build -t kristianw87/vrnoafqa-frontend:latest --build-arg WP_ENDPOINT=betawp\.vrnoaf\.no ..\frontend

docker push kristianw87/vrnoafqa-reverseproxy
docker push kristianw87/vrnoafqa-acme-challenge
docker push kristianw87/vrnoafqa-frontend
