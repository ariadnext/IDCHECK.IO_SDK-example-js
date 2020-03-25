const axios = require("axios");
const qs = require('qs');

class Client {

    constructor(sdkWebUrl, keycloakUrl, cisUrl) {
        this.sdkWebApi = `${sdkWebUrl}/rest/v1/idcheckio-sdk-web`;
        this.keycloakUrl = keycloakUrl;
        this.cisApi = `${cisUrl}/rest/v1`;
    }

    async login(username, password, broker) {
        const { data } = await axios({
            method: 'POST',
            url: `${this.keycloakUrl}/auth/realms/customer-identity/protocol/openid-connect/token`,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: qs.stringify({
                grant_type: 'password',
                client_id: 'sdk-web',
                username: username,
                password: password,
                broker: broker,
            }),
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
        return data;
    }

    async getConfiguration(code) {
        return axios.get(`${this.sdkWebApi}/configuration/${code}`);
    }

    async createConfiguration(configuration) {
        return axios.post(`${this.sdkWebApi}/configuration`, configuration);
    }

    async sendLink(scenario, props={}) {
        const { confCode, cisRealm, fileUid, language, contactEmail, errorRedirectUrl, successRedirectUrl } = props;
        return axios.post(`${this.sdkWebApi}/onboarding/sendlink`, {
            ...scenario,
            interfaceSettings: {
                ...scenario.interfaceSettings,
                confCode: confCode,
                language: language,
            },
            contactData: contactEmail ? {notificationType: 'EMAIL', value: contactEmail} : null,
            resultHandler: {
                cisConf: {
                    "realm": cisRealm,
                    "fileUid": fileUid,
                    "fileLaunchCheck": true,
                    "fileCheckWait": true
                }
            },
            options: {
                "iframeDisplay": !contactEmail,
                "iframeRedirectParent": true
            },
            redirectionData: {
                "errorRedirectUrl": errorRedirectUrl,
                "successRedirectUrl": `${successRedirectUrl}?fileUid=${fileUid}`,
            }
        });
    }

    async getResults(realm, fileUid) {
        return axios.get(`${this.cisApi}/${realm}/file/${fileUid}`);
    }

    async getDocument(realm, uid) {
        return axios.get(`${this.cisApi}/${realm}/document/${uid}`);
    }

    async getImage(realm, documentUid, uid) {
        return axios.get(`${this.cisApi}/${realm}/document/${documentUid}/image/${uid}`, {
            responseType: 'arraybuffer'
        });
    }

}

module.exports = Client;