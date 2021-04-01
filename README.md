# start the dev environment

## Packages

At the root of the project

> npm start

## Servers

In the directory of each server

> npm start

## Clients

In the directory of each client

> npm start

## Mercure server

In the directory of the Mercure server (/home/zougui/Downloads/mercure_0.11.0_Linux_x86_64/)

> sudo MERCURE_PUBLISHER_JWT_KEY='!ChangeMe!' MERCURE_SUBSCRIBER_JWT_KEY='!ChangeMe!' SERVER_NAME=':1572' ./mercure run -config Caddyfile.dev

## RabbitMQ

> sudo systemctl start rabbitmq
> sudo systemctl enable rabbitmq
