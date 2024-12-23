import { AstroComponentInstance } from "astro/runtime/server/index.js";
import { getToken, initCheckout } from "./helloasso";
import { createRequire } from 'module';
import { getDefaultFormatCodeSettings } from "typescript";

const require = createRequire(import.meta.url);
var countries = require("i18n-iso-countries");

function getTerms(monthlyDaySelector, amount) {
    var terms = [];
    var date = new Date()
    console.log(date);
    date.setDate(monthlyDaySelector);

    for (var i = 0; i < 11; i++) {
        if (date.getMonth() == 11)
            date.setFullYear(date.getFullYear()+1)
        date.setMonth((date.getMonth()+1)%12)
        console.log(date);
        terms.push({
                "amount": amount,
                "date": date.toISOString().split('T')[0]
            });
        }
    return terms;

}

export const pay = async (data, lang, server_url) => {

    console.log(data);
    const payer = {
        'firstName': data.firstName,
        'lastName': data.lastName,
        'email': data.email,
        'dateOfBirth': data.dateOfBirth,
        'address': data.address,
        'city': data.city,
        'zipCode': data.zipCode,
        'country': countries.getAlpha3Code(data.country, lang),
        'companyName': data.companyName
    };

    const metadata = {
        'donationType': data.donationType,
        'company': data.company,
        'monthlyDaySelector': data.monthlyDaySelector,
        'legal': data.legal,
        'siren': data.siren,
    };
    console.log(data.donation_type)
    const totalAmount = data.totalAmount * 100;
    var terms = undefined;
    if (data.donationType == "monthly")
        terms = getTerms(data.monthlyDaySelector, totalAmount);
    console.log(terms);
    console.log(totalAmount);
    const body = {
        "containsDonation": true,
        "payer": payer,
        "totalAmount": data.donationType == "monthly" ? totalAmount * 12 :  totalAmount,
        "initialAmount": data.donationType == "monthly" ? terms[0].amount : totalAmount,
        "itemName": "don",
        "backUrl": server_url,
        "errorUrl": server_url,
        "returnUrl": server_url,
        "metadata": metadata,
        "terms" : terms
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

    console.log(JSON.stringify(body));

    const token = await getToken();
    const res = await initCheckout(token, body); // Ensure body is a JSON string
    return res;

}

