import { getTokenSourceMapRange, isConstructorDeclaration } from "typescript";

import { createRequire } from 'module';
import { date } from "astro:schema";
const require = createRequire(import.meta.url);

const CLIENT_ID = "2ef5ac8078b74bde85e0efb33091318e"
const CLIENT_SECRET = "P9dXoRh48ForrYouyVlmgmTmijBRW0q+"

const sandbox = "-sandbox" // write -sandbox to enable sandbox middleware on helloasso

var accessToken = "";
var refreshToken ="";
var accessTokenTime = 0;
var refreshTokenTime = 0;

export const assoSlug = "telecom-pro-bono"

const accessTokenLimit = 1799; //30 minutes
const refreshTokenLimit = 30 * 24 * 60 * 60; //30 days

export async function getToken() {
    console.log("getting token")
    console.log(accessToken)
    console.log(refreshToken)
    if (accessToken == undefined || refreshToken == undefined || refreshTokenTime + refreshTokenLimit < Date.now()) {
        const response = await getAccessToken();
        accessToken = response.access_token;
        refreshToken = response.refresh_token;
        accessTokenTime = Date.now()
        refreshTokenTime = Date.now()
        console.log("generating new token")
        console.log("access_token = " + accessToken)
        console.log("refesh_token = " +refreshToken)
    }
    else if (accessTokenTime + accessTokenLimit < Date.now()) {
        const response = await getRefreshToken(refreshToken);
        accessToken = response.access_token;
        refreshToken = response.refresh_token;
        accessTokenTime = Date.now()

        console.log("refreshing token")

        console.log("access_token = " + accessToken)
        console.log("refesh_token = " +refreshToken)

    }

    return accessToken;
}

function getAccessToken() {
    const { URLSearchParams } = require('url');
    const fetch = require('node-fetch');
    const encodedParams = new URLSearchParams();

    encodedParams.set('grant_type', 'client_credentials');
    encodedParams.set('client_id', CLIENT_ID);
    encodedParams.set('client_secret', CLIENT_SECRET);

    const url = ' https://api.helloasso'+sandbox+'.com/oauth2/token'; //sandbox
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encodedParams
    };

    return fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error('error:' + err));
}

function getRefreshToken(token) {
    const { URLSearchParams } = require('url');
    const fetch = require('node-fetch');
    const encodedParams = new URLSearchParams();
    encodedParams.set('refresh_token', token);

    encodedParams.set('grant_type', 'refresh_token');

    const url = 'https://api.helloasso'+sandbox+'.com/oauth2/token';
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encodedParams
    };

    return fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error('error:' + err));
}

export function initCheckout(token, body) {
    const fetch = require('node-fetch');
    body.backUrl = "https://localhost/donner";
    body.errorUrl = "https://localhost/donner";
    body.returnUrl = "https://localhost/donner";

    const url = 'https://api.helloasso'+sandbox+'.com/v5/organizations/'+assoSlug+'/checkout-intents';
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/*+json',
            authorization: 'Bearer ' + token
        },
        body: JSON.stringify(body)
    };

    return fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error('error:' + err));
}

export function verifyCheckout(token, id) {
    const fetch = require('node-fetch');

const url = 'https://api.helloasso'+sandbox+'.com/v5/organizations/'+assoSlug+'/checkout-intents/'+id+'?withFailedRefundOperation=false';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: 'Bearer ' + token
  }
};

return fetch(url, options)
  .then(res => res.json())
  .catch(err => console.error('error:' + err));
}
