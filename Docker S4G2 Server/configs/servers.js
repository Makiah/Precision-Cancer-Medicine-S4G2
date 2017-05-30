'use strict'
let hapi_url = 'http://localhost:8080/FHIR-server_dstu3/baseDstu3'


module.exports = {
  fhirServer: process.env.API_SERVER || hapi_url,
  ga4ghServer: process.env.GA4GH_SERVER || 'http://localhost:8000',
  baseUrl: process.env.BASE_URL || 'https://stub-dstu2.smarthealthit.org',
  jwtSecret: process.env.SECRET || "thisisasecret",
  hapi_url:hapi_url,
  is_open: process.env.IS_OPEN_SERVER == 1 || false
};
