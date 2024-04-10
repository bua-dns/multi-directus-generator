# Instructions for the deployment of Directus instances in Docker containters

## create directories on server

```bash
mkdir -p /var/www/§§url§§/data/database
mkdir /var/www/§§url§§/data/uploads
mkdir /var/www/§§url§§/data/extensions
```
## upload apache config file (Step 1)

Load config file /Step-1/§§url§§.conf onto server in /etc/apache2/sites-available.

Enable site:

```bash
a2ensite §§url§§.conf
```
Restart Apache webserver:

```bash
systemctl reload apache2
``` 
## certbot

Install SSL certificate with certbot: 

```bash
certbot certonly --webroot -w /var/www/html -d §§url§§  --agree-tos --preferred-challenges http
```
## upload apache config file (Step 2)

Load config file /Step-2/§§url§§.conf onto server in /etc/apache2/sites-available.

Note: Same file as in Step 1, with SSL-specific parts **not** commented out (as in Step 1)

Restart Apache Webserver:

```bash
systemctl reload apache2
``` 

## upload of docker-compose file 

Load docker-compose.yml onto server in /var/www/§§url§§.

Start Docker container:

```bash
cd /var/www/§§url§§
docker-compose up -d
```

## bugfix

For technical reasons the following command has to be run **after** the installation of the docker container is ready:

```bash
docker-compose exec -u root directus_NUMBER_ chown -R node:node /directus/database /directus/extensions /directus/uploads
```
Finally, restart the container:

```bash
docker-compose restart
```