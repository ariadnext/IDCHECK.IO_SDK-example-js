# idcheckio-sdkweb-example-js

![image](https://www.ariadnext.com/wp-content/uploads/2019/01/idcheck.io-rvb.png)

AriadNEXT IDCHECK.IO SDK Web enables you to easily integrate a document capture and
identity verification workflow into your user onboarding or verification process, thanks to an
API and a widget.

This project is an example of an integration of the [idcheckio sdkweb](https://www.idcheck.io/) in a React App to easily integrate a document capture and identification solution in your user acquisition path.

## Prerequisites

Before started, please make sure you have been in contact with the [AriadNEXT team](contact+sdkwebexample@idcheck.io) and they provide you **credentails to the Demo platform**.

Technically you will need :

- [NodeJS > v10.15](https://nodejs.org/en/download/)

## Getting started

1. First, you will need to create a `.env` file in the root directory.
2. Set your keycloak configuration by setting the values of the following environment variables in the `.env` file: `CIS_USERNAME`, `CIS_PASSWORD`, `CIS_REALM`.
3. With [npm](https://npmjs.org/) installed, run `npm install` or `yarn install` to install dependencies
4. Run the following command to start the app in the development mode : `npm start`
5. Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

## Examples

A basic integration with several configurations is also available.
Open [https://localhost:3000/examples/0](https://localhost:3000/examples/0) to view a basic configuration `examples/0-basic.html`
Change the last number in the url to switch between ID.

| ID  | Name        | Description                                                               |
| :-- | :---------- | :------------------------------------------------------------------------ |
| 0   | basic       | Default configuration for DEMO platform                                   |
| 1   | wording     | Override wordings labels                                                  |
| 2   | images      | Override images and document illustration area                            |
| 3   | styles      | Override styles and theming (background text and button colors and shape) |
| 4   | fonts       | Override default font (Your font need to be imported first)               |
| 5   | events      | Subscribe to events                                                       |
| 6   | layout      | Change layout (header, stepper or background)                             |
| 7   | skipPages   | Hide pages (welcome page, camera permission, documents list or end page)  |
| 8   | displayMode | Use a simplified layout (Not applicable to legacy theme)                  |

## SDKWEB configuration

SDKWeb configuration is a set of parameters to customize the web application your customers will use to capture their documents by branding it to your logo, colors and wordings and set up the technical options (callback url for example).

By default, when you run the app for the first time, it will create a basic configuration with the code `githubDemo-Default` and add it to your account.

If you want to run the app with a custom SDKWEB configuration, you will have to add a new JSON file in the directory `server/src/configuration` and override the variable `CONFCODE` in your `.env` file with the code that has been provided in the new JSON file.
The new JSON configuration will be automatically pushed to the SDKWEB API when the app will start.

For more information, see the [idcheckio sdk-web documentation](https://sdkweb-test.idcheck.io/rest/api/index.html#_customerconf).

## Onboarding scenario

By default, the app will create onboarding links that will ask the user to provide an ID document (ID card, passport), then do a liveness check.

If you want to create a new onboarding scenario, you will have to create a JSON file in the directory `server/src/scenarios` containing your scenario's configuration, then you will need to override the variable `SCENARIO` in your `.env` file with the name of the JSON file _(without the .json extension)_.

For more information, see the [idcheckio sdk-web documentation](https://sdkweb-test.idcheck.io/rest/api/index.html#_onboardingdefinition).

## Email configuration

By default, the app will start the SDKWeb onboarding into an iframe.

If you provide an email address as the value of the variable `CONTACT_EMAIL` in your `.env` file, an email will be sent to the provided email address containing the onboarding link.

## Environment variables

The default values of the environment variables are defined in the `.env` file in the app's root directory.

| Variable             | Description                                                                                                                        | Required |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :------: |
| CIS_USERNAME         | a valid username that provides access to the idcheckio sdk-web and the CIS API                                                     |   true   |
| CIS_PASSWORD         | the password associated to the given username                                                                                      |   true   |
| CIS_REALM            | the realm associated to the given username                                                                                         |   true   |
| CONFCODE             | the configuration code that will be used when generating onboarding links                                                          |  false   |
| LANGUAGE             | the language that will be used in the generated onboarding links (ex: EN, FR...)                                                   |  false   |
| SCENARIO             | the scenario that will be used in the generated onboarding links                                                                   |  false   |
| CONTACT_EMAIL        | if specified, the generated onboarding links will be delivered to the given email address instead of being served in the React app |  false   |
| ERROR_REDIRECT_URL   | the user will be redirected to this url when an error occurs during the sdk-web scenario                                           |  false   |
| SUCCESS_REDIRECT_URL | the user will be redirected to this url at the end of the sdk-web scenario                                                         |  false   |

## Integration

For futher integration support please refer to :

- [idcheckio sdk-web documentation](https://sdkweb-test.idcheck.io/rest/api/index.html)
- integration guide provided by your AriadNEXT contact. - our support email below

### Documentation

[npm](https://www.npmjs.com/package/idcheckio-sdk)

## Troubleshooting

- **"an ancestor violates the following Content Security Policy directive"**

  We are limiting iframe integration to <https://localhost:3000>.
  To allow your domain please make a request to support Team.

## Support

Please contact [AriadNEXT IDCHECKIO support team](contact+sdkwebexample@idcheck.io) if you encounter any issue with your idcheckio sdk-web integration.
