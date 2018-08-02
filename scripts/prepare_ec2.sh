#!/bin/bash

sudo yum update -y

sudo yum install -y docker git

sudo service docker start
sudo usermod -a -G docker ec2-user

curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose