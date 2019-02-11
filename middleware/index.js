const fs = require('fs');
const path = require('path');
const { login, getConfiguration, createConfiguration, sendLink } = require('./api');

const configurationFolder = 'middleware/configuration';
const scenariosFolder = 'middleware/scenarios';
const defaultConfCode = 'githubDemo-Default';

if (!process.env.CONFCODE) {
    process.env.CONFCODE = defaultConfCode;
}

if (!process.env.LANGUAGE) {
    process.env.LANGUAGE = 'EN';
}

const {
    CIS_USERNAME: username,
    CIS_PASSWORD: password,
    CIS_REALM: realm,
    CONFCODE: confCode,
    CONTACT_EMAIL: contactEmail,
    SCENARIO: scenarioCode,
    LANGUAGE: language,
} = process.env;

function loadConfigurations() {
    const files = fs.readdirSync(path.resolve(configurationFolder));
    return files.map(file => {
        const content = fs.readFileSync(path.resolve(`${configurationFolder}/${file}`));
        return JSON.parse(content.toString());
    });
}

function getScenario(code) {
    const file = fs.readFileSync(path.resolve(`${scenariosFolder}/${code}.json`));
    return JSON.parse(file);
}

module.exports = {

    init: async () => {
        console.log('initialization...');
        await login(username, password, realm);
        try {
            await getConfiguration(confCode);
        }catch(error){
            if (error.response.status && error.response.status === 404) {
                const configurations = loadConfigurations();
                const configuration = configurations.find(c => c.code === confCode);
                if (configuration) {
                    console.log(`creating configuration ${confCode}...`);
                    await createConfiguration(configuration);
                }else{
                    throw `Cannot find configuration with code '${confCode}' in directory ${configurationFolder}.`;
                }
            }else{
                throw error;
            }
        }
    },

    start: async () => {
        await login(username, password, realm);
        const scenario = getScenario(scenarioCode);
        const { data } = await sendLink(scenario, confCode, realm, language, contactEmail);
        return { ...data, email: !!contactEmail };
    }

};
