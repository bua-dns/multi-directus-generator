# Automated Directus Instance Creation

This tool creates all config files and console commands necessary to a deploy a Directus instance in a docker container on an Apache 2 webserver.

## Usage

Fork this repo and install the dependencies.

```bash
npm install
```

Rename /config/project-config-sample-data into /config/project-config.js and fill in data for your project.

```js
export const config = {
    label: '',                      // max 10 characters, only lowercase letters and underscores
    name: '',                       // appears as comment in generated files
    url: '',                        // url under which directus will be accessible (without https://)
    instanceCounter: 0,             // has to be unique for each instance on given server
    adminEmail: '',                 // for Directus login
    pwAdmin: '',                    // for Directus login
    pwRoot: '',                     // for MariaDB
}
```
Then run app.js

```bash
node app.js
```
The script creates a subfolder of /output named like the given url. There you will find all necessary config files, console commands and instructions for the deployment of the docker container that runs your Directus instance.

## Errors, Problems

The "label" given in project-config.js is used as part of variable names and has to meet the following criteria:

* only lowercase letters of the English alphabet (a-z) and underscores (_)
* not longer as 10 characters

If you provide a non-valid label, the script will throw an error.

The "url" must correspond to the public url the Directus instance will run at. Make sure that the DNS records of this (sub) domain points to the server you want to deploy to. Format: sub.your-domain.org (without https://)

The "instanceCounter" value has to be unique for each instance you are deploying to your server. Values can range from 1 to 150.


## Prerequisits

- Linux Sever with Apache 2
- docker installed on server
- PM2 installed on server
- (sub)domain pointing to this server

## Status

WORK IN PROGRESS
