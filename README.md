# idcheckio-sdkweb-example-js

![image](https://www.ariadnext.com/wp-content/uploads/2019/01/idcheck.io-rvb.png)

AriadNEXT IDCHECK.IO SDK Web enables you to easily integrate a document capture and
identity verification workflow into your user onboarding or verification process, thanks to an
API and a responsive web app.

This project is an example of an integration of the [idcheckio sdkweb](https://www.idcheck.io/) in a React App to easily integrate a document capture and identification solution in your user acquisition path. 

## Prerequisites

Before started, please make sure you have been in contact with the [AriadNEXT team](contact+sdkwebexample@idcheck.io) and they provide you **credentails to the Demo platform**.

Technically you will need :

- [NodeJS > v10.15](https://nodejs.org/en/download/)

## Getting started

1. First, you will need to create a `.env.local` file in the app's root directory.
2. Set your keycloak configuration by setting the values of the following environment variables in the `.env.local` file: `CIS_USERNAME`, `CIS_PASSWORD`, `CIS_REALM`.
3. With [npm](https://npmjs.org/) installed, run the following command to start the app in the development mode : ```npm start```
4. Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

## SDKWEB configuration

SDKWeb configuration is a set of parameters to customize the web application your customers will use to capture their documents by branding it to your logo, colors and wordings and set up the technical options (callback url for example).

By default, when you run the app for the first time, it will create a basic configuration with the code `githubDemo-Default` and add it to your account.

If you want to run the app with a custom SDKWEB configuration, you will have to add a new JSON file in the directory `middleware/configuration` and override the variable `CONFCODE` in your `.env.local` file with the code that has been provided in the new JSON file.
The new JSON configuration will be automatically pushed to the SDKWEB API when the app will start.

For more information, see the [idcheckio sdk-web documentation](https://sdkweb-test.idcheck.io/rest/api/index.html#_customerconf).

## Onboarding scenario

By default, the app will create onboarding links that will ask the user to provide an ID document (ID card, passport), then do a liveness check.

If you want to create a new onboarding scenario, you will have to create a JSON file in the directory `middleware/scenarios` containing your scenario's configuration, then you will need to override the variable `SCENARIO` in your `.env.local` file with the name of the JSON file _(without the .json extension)_.

For more information, see the [idcheckio sdk-web documentation](https://sdkweb-test.idcheck.io/rest/api/index.html#_onboardingdefinition).

## Email configuration

By default, the app will start the SDKWeb onboarding into an iframe.

If you provide an email address as the value of the variable `CONTACT_EMAIL` in your `.env.local` file, an email will be sent to the provided email address containing the onboarding link.

## Environment variables

The default values of the environment variables are defined in the `.env` file in the app's root directory. 
These values can be override in the `.env.local` file.

|Variable|Description|Required|
|:-------|:----------|:------:|
|CIS_USERNAME | a valid username that provides access to the idcheckio sdk-web and the CIS API |true |
|CIS_PASSWORD | the password associated to the given username |true |
|CIS_REALM    | the realm associated to the given username    |true |
|CONFCODE     | the configuration code that will be used when generating onboarding links |false|
|LANGUAGE     | the language that will be used in the generated onboarding links (ex: EN, FR...)|false|
|SCENARIO     | the scenario that will be used in the generated onboarding links|false|
|CONTACT_EMAIL| if specified, the generated onboarding links will be delivered to the given email address instead of being served in the React app|false|
|ERROR_REDIRECT_URL| the user will be redirected to this url when an error occurs during the sdk-web scenario |false|
|SUCCESS_REDIRECT_URL| the user will be redirected to this url at the end of the sdk-web scenario |false|

## Integration

For futher integration support please refer to :
    - [idcheckio sdk-web documentation](https://sdkweb-test.idcheck.io/rest/api/index.html)
    - integration guide provided by your AriadNEXT contact.
    - our support email below

## Support

Please contact [AriadNEXT IDCHECKIO support team](contact+sdkwebexample@idcheck.io) if you encounter any issue with your idcheckio sdk-web integration.