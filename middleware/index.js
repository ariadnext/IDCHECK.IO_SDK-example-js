const fs = require('fs');
const path = require('path');
const ApiClient = require('./api');

const configurationFolder = 'middleware/configuration';
const scenariosFolder = 'middleware/scenarios';

const {
    SDKWEB_URL: sdkWebUrl,
    KEYCLOAK_URL: keycloakUrl,
    CIS_URL: cisUrl,
    CIS_USERNAME: username,
    CIS_PASSWORD: password,
    CIS_REALM: realm,
    CONFCODE: confCode,
    CONTACT_EMAIL: contactEmail,
    SCENARIO: scenarioCode,
    LANGUAGE: language,
    ERROR_REDIRECT_URL: errorRedirectUrl,
    SUCCESS_REDIRECT_URL: successRedirectUrl,
} = process.env;

const client = new ApiClient(sdkWebUrl, keycloakUrl, cisUrl);

function loadConfigurations() {
    const files = fs.readdirSync(path.resolve(configurationFolder));
    return files.map(file => {
        const content = fs.readFileSync(path.resolve(`${configurationFolder}/${file}`));
        return JSON.parse(content.toString());
    });
}

function getScenario(code) {
    try {
        const file = fs.readFileSync(path.resolve(`${scenariosFolder}/${code}.json`));
        return JSON.parse(file);
    }catch(error){
        throw `Cannot find scenario ${code}.`;
    }
}

module.exports = {

    init: async () => {
        console.log('initialization...');
        await client.login(username, password, realm);
        try {
            await client.getConfiguration(confCode);
        }catch(error){
            if (error.response && error.response.status && error.response.status === 404) {
                const configurations = loadConfigurations();
                const configuration = configurations.find(c => c.code === confCode);
                if (configuration) {
                    console.log(`creating configuration ${confCode}...`);
                    await client.createConfiguration(configuration);
                }else{
                    throw `Cannot find configuration with code '${confCode}' in directory ${configurationFolder}.`;
                }
            }else{
                throw error;
            }
        }
    },

    start: async () => {
        await client.login(username, password, realm);
        const scenario = getScenario(scenarioCode);
        const fileUid = `GithubDemo-${new Date().getTime()}`;
        const { data } = await client.sendLink(scenario, {
            confCode,
            cisRealm: realm,
            fileUid,
            language,
            contactEmail,
            errorRedirectUrl,
            successRedirectUrl,
        });
        return { ...data, fileUid, email: !!contactEmail };
    },

    getResults: async (fileUid) => {
        await client.login(username, password, realm);
        const { data: reportData } = await client.getResults(realm, fileUid);
        const documents = await Promise.all(reportData.documents.map(doc => {
            return client.getDocument(realm, doc.uid);
        }));
        return {
            report: reportData.lastReport,
            documents: documents.map(doc => doc.data),
        };
    },

    getImage: async (documentUid, imageUid) => {
        await client.login(username, password, realm);
        const { data } = await client.getImage(realm, documentUid, imageUid);
        return Buffer.from(data, 'binary');
    }

};
