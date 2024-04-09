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
    
    const dockerComposeTemplateContent = fs.readFileSync(
        path.join(process.cwd(), '/templates/docker-compose-template.yml'),
        'utf8'
        );
        
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
    console.log('results see in: ', projectDirPath);
    console.log('docker-compose.yml created');
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