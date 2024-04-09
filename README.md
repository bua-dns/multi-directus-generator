# Automated Directus Instance Creation

This tool creates all config files and console commands necessary to a deploy a Directus instance in a docker container on an Apache 2 webserver.

## Usage

```bash
npm i
```

Modify the details in /config/project-template for the new project. Make sure that the counter variables that are used to generate unique instance-specific variable names and port designations do not conflict with existing values of instances already running on the server you want to deploy to.

```bash
node app.js
```

## Prerequisits

- Linux Sever with Apache 2
- docker installed on server
- PM2 installed on server
- (sub)domain pointing to this server

## Status

WORK IN PROGRESS
