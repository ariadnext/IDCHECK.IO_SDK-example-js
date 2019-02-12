const fs = require('fs');
const path = require('path');

const configurationFolder = 'middleware/configuration';
const scenariosFolder = 'middleware/scenarios';

module.exports = {

    loadConfigurations: () => {
        const files = fs.readdirSync(path.resolve(configurationFolder));
        return files.map(file => {
            const content = fs.readFileSync(path.resolve(`${configurationFolder}/${file}`));
            return JSON.parse(content.toString());
        });
    },

    getConfiguration: (confCode) => {
        const configurations = this.loadConfigurations();
        const configuration = configurations.find(c => c.code === confCode);
        if (!configuration) {
            throw `Cannot find configuration with code '${confCode}' in directory ${configurationFolder}.`;
        }
        return configuration;
    },

    getScenario: (code) => {
        try {
            const file = fs.readFileSync(path.resolve(`${scenariosFolder}/${code}.json`));
            return JSON.parse(file);
        } catch (error) {
            throw `Cannot find scenario ${code} in directory ${scenariosFolder}.`;
        }
    }

};
