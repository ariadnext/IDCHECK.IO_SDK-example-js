const axios = require("axios");
const qs = require('qs');

const sdkWebApi = 'https://desktoptomobile.rennes.ariadnext.com:1443/rest/v1/idcheckio-sdk-web';
const keycloakUrl = 'https://keycloak.rennes.ariadnext.com:8443';

module.exports = {
    login: async (username, password, broker) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: `${keycloakUrl}/auth/realms/customer-identity/protocol/openid-connect/token`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: qs.stringify({
                    grant_type: 'password',
                    client_id: 'sdk-web',
                    username: username,
                    password: password,
                    broker: broker,
                }),
            }).then(({ data }) => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
                resolve(data);
            }).catch(reject);
        });
    },
    getConfiguration: async (code) => {
        return axios.get(`${sdkWebApi}/configuration/${code}`);
    },
    createConfiguration: async (configuration) => {
        return axios.post(`${sdkWebApi}/configuration`, configuration);
    },
    sendLink: async (scenario, confCode, cisRealm, language, contactEmail) => {
        const timestamp = new Date().getTime();
        return axios.post(`${sdkWebApi}/onboarding/sendlink`,{
            ...scenario,
            businessUid: `bus-${timestamp}`,
            interfaceSettings: {
                ...scenario.interfaceSettings,
                confCode: confCode,
                language: language,
            },
            contactData: contactEmail ? { notificationType: 'EMAIL', value: contactEmail } : null,
            resultHandler: {
                cisConf: {
                    "realm": cisRealm,
                    "fileUid": `GithubDemo-${timestamp}`,
                    "fileLaunchCheck" : true,
                    "fileCheckWait" : true
                }
            },
            options: {
                "iframeDisplay": !contactEmail,
                "iframeRedirectParent" : true
            },
        });
    }
};
