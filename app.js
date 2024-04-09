/* ------------------------- app.js -------------------------
Generate all necessary files, commands and instructions to setup 
a docker container for a directus instance

Listing of all placeholders see end of file
DEV: Work in progress
---------------------------------------------------------------*/


import fs from 'fs';
import path from 'path';
import { config } from './config/project-template.js';


// create project output folders

const rootPath = process.cwd();
const projectDirPath = path.join(rootPath, 'output', config.url);

try {
    if(!fs.existsSync(projectDirPath)) {
        fs.mkdir(projectDirPath, (error) => {
            if (error) console.log('mkdir error', error)
        });
    }
    if(!fs.existsSync(path.join(projectDirPath, 'Step-1'))) {
        fs.mkdir(path.join(projectDirPath, 'Step-1'), (error) => {
            if (error) console.log('mkdir error', error)
        });
    }
    if(!fs.existsSync(path.join(projectDirPath, 'Step-2'))) {
        fs.mkdir(path.join(projectDirPath, 'Step-2'), (error) => {
            if (error) console.log('mkdir error', error)
        });
    }
    
    const dockerComposeTemplateContent = fs.readFileSync(
        path.join(process.cwd(), '/templates/docker-compose-template.yml'),
        'utf8'
    );
    const apacheConfigTemplateStep1Content = fs.readFileSync(
        path.join(process.cwd(), '/templates/template-step-1.conf'),
        'utf8'
    );
    const apacheConfigTemplateStep2Content = fs.readFileSync(
        path.join(process.cwd(), '/templates/template-step-2.conf'),
        'utf8'
    );
        
    // validate label
    let validLabel = /^[a-z_]{1,10}$/.test(config.label);
    if (!validLabel){
        throw new Error('label must be shorter than 10 characters and contain lowercase letters and underscores only');
    }

    // docker compose file
    const dockerComposeReplacements = {
        '§§label§§': config.label,
        '§§name§§': config.name,
        '§§url§§': 'https://' + config.url,
        '§§instanceCounter§§': config.instanceCounter,
        '§§portCounter3306§§': 3306 + config.instanceCounter,
        '§§portCounter80§§': 8080 + config.instanceCounter,
        '§§portCounter8055§§': 8055 + config.instanceCounter,
        '§§pwRoot§§': config.pwRoot,
        '§§pwMariaDB§§': config.pwMariaDB,
        '§§adminEmail§§': config.adminEmail,
        '§§pwAdmin§§': config.pwAdmin
    };

    let dockerComposeContent = dockerComposeTemplateContent;
    
    for (let entry in dockerComposeReplacements) {
    dockerComposeContent = dockerComposeContent.replace(
        new RegExp(entry, 'g'),
        dockerComposeReplacements[entry]
        );
    }
        
    fs.writeFileSync(
        path.join(projectDirPath, 'docker-compose.yml'),
        dockerComposeContent
    );
    // apache config file
    const apacheConfigReplacements = {
        '§§url§§': config.url,
        '§§log§§': config.url.replace(/\./g, '_'),
        '§§port8085§§': 8085 + config.instanceCounter,
        '§§port8060§§': 8060 + config.instanceCounter,
    };

    // step 1: pre certbot

    let apacheConfigStep1Content = apacheConfigTemplateStep1Content;
    
    for (let entry in apacheConfigReplacements) {
        apacheConfigStep1Content = apacheConfigStep1Content.replace(
            new RegExp(entry, 'g'),
            apacheConfigReplacements[entry]
        );
    }
    fs.writeFileSync(
        path.join(projectDirPath, 'Step-1', `${config.url}.conf`),
        apacheConfigStep1Content
    );

    // step 2: post certbot
    let apacheConfigStep2Content = apacheConfigTemplateStep2Content;
    
    for (let entry in apacheConfigReplacements) {
        apacheConfigStep2Content = apacheConfigStep2Content.replace(
            new RegExp(entry, 'g'),
            apacheConfigReplacements[entry]
        );
    }
    fs.writeFileSync(
        path.join(projectDirPath, 'Step-2', `${config.url}.conf`),
        apacheConfigStep2Content
    );


    console.log('results see in: ', projectDirPath);
    console.log('docker-compose.yml created');
    console.log('apache config, Step 1, created');
    console.log('apache config, Step 2, created');
} catch (error) {
    console.log('error', error);
}




//// placeholders for docker-compose.yml

// §§label§§ placeholder for short label
// §§name§§ placeholder for project name
// §§url§§ placeholder for public URL
// §§instanceCounter§§ placeholder for instance counter
// §§portCounter3306§§ placeholder for port 3306 counter
// §§portCounter80§§ placeholder port 80 counter
// §§portCounter8055§§ placeholder port 8055 counter
// §§pwRoot§§ placeholder for root password
// §§pwMariaDB§§ placeholder for MariaDB password
// §§adminEmail§§ placeholder for admin email
// §§pwAdmin§§ placeholder for admin password