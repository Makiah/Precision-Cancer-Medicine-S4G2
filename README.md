Precision Cancer Medicine Tool
=======

## Goals

Shift off of SMART Sandbox (thus to DSTU3).
Improve comparison effectiveness.

## Synopsis

SMART on FHIR application. Compare genotypes of similar patients within a FHIR server. Currently works solely with the SMART Sandbox (https://sandbox.smarthealthit.org).

## Installation

`Node.js` / `NPM` is required. 

To build & test web-tool:

```
git clone https://github.com/Makiah/PrecisionCancerMedicine
cd PrecisionCancerMedicine
npm install

# launch web-tool
npm start
```
Now, create an account on https://sandbox.smarthealthit.org and register a new app.

```
App Type: Public Client
App Name: SMART PCM Tool
App Launch URI: (e.g. http://0.0.0.0:8080/launch.html)
APP Redirect URIs: (e.g. http://0.0.0.0:8080/index.html)
Allow Offline Access: No
Patient Scoped App: Yes
```
Once you've registered the app, replace the `clientId` string in `launch.html` with the string generated in the SMART Sandbox.

Clicking launch on this new registered application will bring up a list of patients. The chosen patient will be compared to the rest of the patients within the server.
