# idcheckio-sdkweb-example-js

![image](https://www.ariadnext.com/wp-content/uploads/2019/01/idcheck.io-rvb.png)

This project is an example of an integration of the [idcheckio sdkweb](https://www.idcheck.io/) in a React App to easily integrate a document capture and identification solution in your user acquisition path.

## Getting started

1. First, you will need to create a `.env.local` file in the app's root directory.
2. Set your keycloak configuration by setting the values of the following environment variables in the `.env.local` file: `CIS_USERNAME`, `CIS_PASSWORD`, `CIS_REALM`.
3. With [npm](https://npmjs.org/) installed, run the following command to start the app in the development mode : ```npm start```
4. Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

## SDK-WEB configuration

By default, when you run the app for the first time, it will create a basic configuration with the code `githubDemo-Default`.

If you want to run the app with a custom SDKWEB configuration, you will have to add a new JSON file in the directory `middleware/configuration` and override the variable `CONFCODE` in your `.env.local` file with the code that has been provided in the new JSON file.
The new JSON configuration will be automatically pushed to the SDKWEB API when the app will start.

For more information, see the [idcheckio sdk-web documentation](https://sdkweb-test.idcheck.io/rest/api/index.html#_customerconf).

## Scenario

By default, the app will create onboarding links that will ask the user to provide an ID document (ID card, passport), then do a liveness check.

If you want to create a new onboarding scenario, you will have to create a JSON file in the directory `middleware/scenarios` containing your scenario's configuration, then you will need to override the variable `SCENARIO` in your `.env.local` file with the name of the JSON file _(without the .json extension)_.

For more information, see the [idcheckio sdk-web documentation](https://sdkweb-test.idcheck.io/rest/api/index.html#_onboardingdefinition).

## Email configuration

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

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Support

Please contact [AriadNEXT support team](https://support.ariadnext.com/hc/en-us) if you encounter any issue with your idcheckio sdk-web integration.