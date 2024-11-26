import { getTokenSourceMapRange, isConstructorDeclaration } from "typescript";

import { createRequire } from 'module';
import { date } from "astro:schema";
const require = createRequire(import.meta.url);

const CLIENT_ID = "d04d74bf7a744a5fb16794a8e97f4ca8"
const CLIENT_SECRET = "1WaSwPRkeLiLZt/vOlRoGDOTGtSGSOs2"

var accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzYzQ0NTc3Zjg3ODM0NWE4NmYzOTA4ZGNkYmJhNDJhNSIsInVycyI6Ik9yZ2FuaXphdGlvbkFkbWluIiwiY3BzIjpbIkFjY2Vzc1B1YmxpY0RhdGEiLCJBY2Nlc3NUcmFuc2FjdGlvbnMiLCJDaGVja291dCJdLCJuYmYiOjE3MjcxMTg5NDQsImV4cCI6MTcyNzEyMDc0NCwiaXNzIjoiaHR0cHM6Ly9hcGkuaGVsbG9hc3NvLXNhbmRib3guY29tIiwiYXVkIjoiZDA0ZDc0YmY3YTc0NGE1ZmIxNjc5NGE4ZTk3ZjRjYTgifQ.jjCKgfCS-59zjvoXT_eajxrGoztZi6WLfR0ZVLHIllkdMc0q7NAZ7nTKIuLX_bdMZiL_luZYsMApf5Q78d8M00U_7bZwXiMXH_puBXowHgiQ2iGWK_6Q3S_sgo3Zthy4BI3AlzdLwS3MtuqxmSpyAASgMbZYPVo3U33uaRdLZSTe_53VoNR2tbem_lKMrGLWP8LLpxxElVo64UoIgGlEMHZ1jHeOdKUdbiH9IdPGA-2ykwbPPYVU4QHN9iaX8Bxlx3ryluTtsnAomJey0J5CEHyuFO8LLG-1HJFVVTaHWB0aQDuCzqbHKMgUeZiE8-XWslelFoEIsIXWZc9OanBBXQ";
var refreshToken = "CfDJ8HMwyxW6St1HhiexE9vvGOsCAhiV5B_HFfyN9D1niOd9brjQBq5mVPdbyUV9Av1sOPat4PJyfVj-JIiWywyM1VZi7I_ZrP9pNE4b5mm-sHK0jvUNsHjnLavn8BamPmMte44XC7ADDNYvwUNi_dYdLE1F3IMykIKd3fmxzqP7hx1JSOYIQnA3BUIXX1qd1j-T-26GxxHkNDRbExlKZYzF2u0GC5k0QXoOUPbn9yhCs-GADXy9YLNZtFJPeiT4XRP2u8U5jE6yNLPF3jfl9ZH1kT-jwh0DYst2YjAbte9ONSKVro9bBZB0JA5h0Iv2Yo5jKCopqnmeO_Ff7FExv0H2nl8";
var accessTokenTime = 0;
var refreshTokenTime = 0;

export const assoSlug = "pro-bono-test"

const accessTokenLimit = 1799; //30 minutes
const refreshTokenLimit = 30 * 24 * 60 * 60; //30 days

export function getToken() {
    console.log("getting token")
    console.log(accessToken)
    console.log(refreshToken)
    if (accessToken == "" || refreshToken == "" || refreshTokenTime + refreshTokenLimit < Date.now()) {
        const response = getAccessToken();
        accessToken = response.access_token;
        refreshToken = response.refresh_token;
        accessTokenTime = Date.now()
        refreshTokenTime = Date.now()
        console.log("generating new token")
        console.log(accessToken)
        console.log(refreshToken)
    }
    else if (accessTokenTime + accessTokenLimit < Date.now()) {
        const response = getRefreshToken(refreshToken);
        accessToken = response.access_token;
        refreshToken = response.refresh_token;
        accessTokenTime = Date.now()

        console.log("refreshing token")
        console.log(accessToken)
        console.log(refreshToken)

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

    const url = ' https://api.helloasso-sandbox.com/oauth2/token'; //sandbox
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
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));
}

function getRefreshToken(token) {
    const { URLSearchParams } = require('url');
    const fetch = require('node-fetch');
    const encodedParams = new URLSearchParams();
    encodedParams.set('refresh_token', token);

    encodedParams.set('grant_type', 'refresh_token');

    const url = 'https://api.helloasso.com/oauth2/token';
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
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));
}

export function initCheckout(token, body) {
    const fetch = require('node-fetch');
    body.backUrl = "";
    body.errorUrl = "";
    body.returnUrl = "";

    const url = 'https://api.helloasso.com/v5/organizations/'+assoSlug+'/checkout-intents';
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/*+json',
            authorization: 'Bearer ' + token
        },
        body: body
    };

    return fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));
}

export function verifyCheckout(token, id) {
    const fetch = require('node-fetch');

const url = 'https://api.helloasso.com/v5/organizations/'+assoSlug+'/checkout-intents/'+id+'?withFailedRefundOperation=false';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: 'Bearer ' + token
  }
};

return fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
}
