# Google Earth OAuth2 Documentation

## Contents

- **Introduction**
- **OAuth2 in a nutshell**
    - **Google OAuth2 Token Flow Diagram**
- **Earth Engine API**
- **Playground**
- **Official Documentation**

## Introduction
Because Google Earth Engine can only be accessed by setting up an Earth Engine (EE) account, this requires use of OAuth2 in order to access the EE APIs.
In order to setup this, you need to create a Google App Engine project, and set up the proper credentials. You can find the steps [here](https://developers.google.com/earth-engine/app_engine_intro).

## OAuth2 in a nutshell

### How it works TL;DR
1. Obtain OAuth 2.0 credentials from the Google API Console.
2. Obtain an access token from the Google Authorization Server.
3. Examine scopes of access granted by the user.
4. Send the access token to an API.
5. Refresh the access token, if necessary.

There are several ways that OAuth2 can be implemented for a Google App. For our purposes in the context of Earth Engine, only two are relevant
1. Client Side Authentication
    - App users need to verify that they have an EE account.
2. Service Accounts
    - This is an account that belongs to the application, rather then a user. Allows anyone to use the application, not just someone with an EE account.
    - It identifies itself using a private key .json file. It obviously contains sensitive information.

For the interim, we will be implementing the Client Side Authentication, as it is relatively simpler, and requires less setup.

### Google OAuth2 Token Flow Diagram

The authorization sequence begins when your application redirects a browser to a Google URL; the URL includes query parameters that indicate the type of access being requested. Google handles the user authentication, session selection, and user consent.

The result is an access token, which the client should validate before including it in a Google API request. When the token expires, the application repeats the process.

![Token Flow Diagram](https://developers.google.com/accounts/images/tokenflow.png)

Earth Engine already has API calls to handle the nitty gritty of passing these tokens around, by allowing us to interact directly with the OAuth endpoints. Ideally we won't have to deal with redirecting, scopes, and handling server responses.

## Earth Engine API
- Thankfully EE allows us to bypass most of this through two function calls that automate most of the the above.

- ``ee.data.authenticateViaOauth()``

    This is what you initially use to attempt authorization. Definately call this function before doing ``ee.initialize``.
    ```javascript
    ee.data.authenticateViaOauth(
        clientId, // The application's OAuth client ID
        success, // What to do on a successful authentication
        error, // What to do on a failed authentication, passing an error message
        extraScopes, // Extra OAuth scopes to request, usually null
        onImmediateFailed // The function to call if automatic authentication fails.
    );
    ```
- ``ee.data.authenticateViaPopup()``

    This is almost always what you call for in ``onImmediateFailed``. It pops up a login screen for a user to enter in credentials. 
    ```javascript
    ee.data.authenticateViaPopup(
        success, // What to do on a successful authentication
        error// What to do on a failed authentication, passing an error message
    );
    ```
- A typical clientside OAuth Authentication looks like this:
    ```javascript
        // Load client library.
        var ee = require('@google/earthengine');

        // Initialize client library and run analysis.
        var initialize = function() {
            ee.initialize(null, null, function() {
                // ... run analysis ...
                analysis();
            }, function(e) {
                console.error('Initialization error: ' + e);
            });
        };

        // Authenticate using an OAuth pop-up.
        ee.data.authenticateViaOauth(YOUR_CLIENT_ID, initialize, function(e) {
            console.error('Authentication error: ' + e);
        }, null, function() {
            ee.data.authenticateViaPopup(initialize);
        });
    ```


### Playground
You can test out and play around with these concepts here on Google's [OAuth playground](https://developers.google.com/oauthplayground/). 

Do note however that it doesn't have access to the Earth Engine specific scopes. This is more for getting general ideas and flow. 

### Official Documentation
- [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/OAuth2)
- [OAuth 2.0 for Client-side Web Applications](https://developers.google.com/identity/protocols/OAuth2UserAgent)
- [Setting up a Earth Engine App Documenation](https://developers.google.com/earth-engine/app_engine_intro)
- [Earth Engine OAuth 2.0 API Documentation](https://developers.google.com/earth-engine/api_docs#ee.data.authenticateviaoauth)

