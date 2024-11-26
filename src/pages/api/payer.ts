import { getToken, initCheckout } from "./helloasso";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);


export const pay = async (data) => {
    const payer = {
        'firstName': data.firstName,
        'lastName': data.lastName,
        'email': data.email,
        'dateOfBirth': data.dateOfBirth,
        'address': data.address,
        'city': data.city,
        'zipCode': data.zipCode,
        'country': data.country,
        'companyName': data.companyName,
    };

    const metadata = {
        'donationType': data.donationType,
        'company': data.company,
        'monthlyDaySelector': data.monthlyDaySelector,
        'legal': data.legal,
        'siren': data.siren,
    };

    const body = {
        "containsDonation": true,
        "payer": payer,
        "totalAmount": data.totalAmount,
        "initialAmount": data.totalAmount,
        "itemName": "don",
        "backUrl": "donate/back.ts",
        "errorUrl": "donate/error.ts",
        "returnUrl": "/",
        "metadata": JSON.stringify(metadata),
    }

    const payerRequirements = ['firstName', 'lastName', 'email', 'dateOfBirth', 'address', 'city', 'zipCode', 'country'];
    const bodyRequirements = ['totalAmount', 'initialAmount', 'itemName', 'backUrl', 'errorUrl', 'returnUrl', 'containsDonation', 'metadata'];

    for (const field of payerRequirements) {
        if (!payer[field] || payer[field] === '') {
            return new Response(JSON.stringify({ error: `${field} is required` }), { status: 400 });
        }
    }

    for (const field of bodyRequirements) {
        if (!body[field] || body[field] === '') {
            return new Response(JSON.stringify({ error: `${field} is required` }), { status: 400 });
        }
    }

    if (metadata.company && (!metadata.legal || !metadata.siren)) {
        return new Response(JSON.stringify({ error: 'legal and siren are required for company' }), { status: 400 });
    }



    const token = getToken();
    const res = initCheckout(token, body);
    return res;

}
