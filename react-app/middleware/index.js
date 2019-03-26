const ApiClient = require('./api');
const {getConfiguration, getScenario} = require('./files');

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

module.exports = {

    init: async () => {
        console.log('initialization...');
        await client.login(username, password, realm);
        try {
            await client.getConfiguration(confCode);
        } catch (error) {
            if (error.response && error.response.status && error.response.status === 404) {
                const configuration = getConfiguration(confCode);
                console.log(`creating configuration ${confCode}...`);
                await client.createConfiguration(configuration);
            } else {
                throw error;
            }
        }
    },

    start: async () => {
        await client.login(username, password, realm);
        const scenario = getScenario(scenarioCode);
        const fileUid = `GithubDemo-${new Date().getTime()}`;
        const {data} = await client.sendLink(scenario, {
            confCode,
            cisRealm: realm,
            fileUid,
            language,
            contactEmail,
            errorRedirectUrl,
            successRedirectUrl,
        });
        return {...data, fileUid, email: !!contactEmail};
    },

    getResults: async (fileUid) => {
        await client.login(username, password, realm);
        const {data: reportData} = await client.getResults(realm, fileUid);
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
        const {data} = await client.getImage(realm, documentUid, imageUid);
        return Buffer.from(data, 'binary');
    }

};
