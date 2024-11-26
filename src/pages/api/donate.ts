
import { getToken, initCheckout } from "./helloasso";

export const prerender = false

export const POST = async ({ request }) => {
    const data = await request.formData();
    const payer = data.get("payer");

    const donation_type = data.get("donation-type");
    const once = donation_type === "once";
    const entity_type = data.get("entity-selector");
    const company = entity_type === 2;


    let custom_amount = data.get("custom-amount") * 100;
    let monthly_day_selector = data.get("monthly-day-selector");
    let legal = data.get("legal")
    let social_reason = data.get("social-reason");
    let siren = data.get("siren");
    let lname = data.get("lname");
    let fname = data.get("fname");
    let email = data.get("email");
    let confirm_email = data.get("confirm-email");
    let phone = data.get("phone");
    let birthday = data.get("birthday");
    let address = data.get("address");
    let city = data.get("city");
    let zip = data.get("zip");
    let country = data.get("country");

    if (!validateAmount(custom_amount)) {
        return new Response(JSON.stringify({
            field: "amount"
        }),
            { status: 400 }
        )
    }
    if (!monthly_day_selector(monthly_day_selector)) {
        return new Response(JSON.stringify({
            field: "monthly-day-selector"
        }),
            { status: 400 }
        )
    }

    if (company && !validateSocialReason(social_reason)) {
        return new Response(JSON.stringify({
            field: "social-reason"
        }),
            { status: 400 }
        )

    }

    if (company && !validateSiren(siren)) {
        return new Response(JSON.stringify({
            field: "siren"
        }),
            { status: 400 }
        )
    }

    if (company && !validateLegal(legal)) {
        return new Response(JSON.stringify({
            field: "legal"
        }),
            { status: 400 }
        )

    }

    if (!validateName(lname)) {
        return new Response(JSON.stringify({
            field: "lname"
        }),
            { status: 400 }
        )

    }

    if (!validateName(fname)) {
        return new Response(JSON.stringify({
            field: "fname"
        }),
            { status: 400 }
        )

    }

    if (!validateEmail(email)) {
        return new Response(JSON.stringify({
            field: "email"
        }),
            { status: 400 }
        )

    }

    if (!validateConfirmEmail(confirm_email, email)) {
        return new Response(JSON.stringify({
            field: "confirm-email"
        }),
            { status: 400 }
        )

    }

    if (!validateDate(birthday)) {
        return new Response(JSON.stringify({
            field: "birthday"
        }),
            { status: 400 }
        )

    }


    if (!validateAddress("address")) {
        return new Response(JSON.stringify({
            field: "address"
        }),
            { status: 400 }
        )

    }

    if (!validateCity(city)) {
        return new Response(JSON.stringify({
            field: "city"
        }),
            { status: 400 }
        )

    }

    if (!validateZip(zip)) {
        return new Response(JSON.stringify({
            field: "zip"
        }),
            { status: 400 }
        )

    }

    if (!validateCountry(country)) {
        return new Response(JSON.stringify({
            field: "country"
        }),
            { status: 400 }
        )

    }

    if (!validatePhone(phone)) {
        return new Response(JSON.stringify({
            field: "phone"
        }),
            { status: 400 }
        )

    }

    if (!validateNamesAreDifferent(lname, fname)) {
        return new Response(JSON.stringify({
            field: "lname"
        }),
            { status: 400 }
        )

    }

    if (!validateMonthlyDaySelector(monthly_day_selector)) {
        return new Response(JSON.stringify({
            field: "monthly-day-selector"
        }),
            { status: 400 }
        )

    }

    if (!validateAddress(address)) {
        return new Response(JSON.stringify({
            field: "address"
        }),
            { status: 400 }
        )

    }
    return new Response(JSON.stringify({
        success: true
    }),
        { status: 20 }
    )





}

export function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export function validatePhone(phone) {
    const re = /^\d+$/;
    return re.test(phone);
}

export function validateZip(zip) {
    const re = /^\d{5}$/;
    return re.test(zip);
}

export function validateAmount(amount) {
    amount *= 100;
    const re = /^\d+$/;
    return re.test(amount) && amount >= 1 && amount <= 9999999;
}

export function validateSiren(siren) {
    const re = /^\d{9}$/;
    return re.test(siren);
}

export function validateLegal(legal) {
    return false;
}

export function validateMonthlyDaySelector(monthly_day_selector) {
    return monthly_day_selector >= 1 && monthly_day_selector <= 28;
}

export function validateSocialReason(social_reason) {
    return social_reason.length > 0;
}

export function validateConfirmEmail(confirm_email, email) {
    return confirm_email === email;
}

export function validateAddress(address) {
    return address.length > 0;
}

export function validateCity(city) {
    return city.length > 0;
}

export function validateCountry(country) {
    return country.length > 0;
}

export function validateDate(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18;
}

export function validateName(name) {
    const forbiddenValues = ["firstname", "lastname", "unknown", "first_name", "last_name", "anonyme", "user", "admin", "name", "nom", "prénom", "test"];
    const specialCharsRegex = /[^a-zA-Zéèêëàâäùûüç'\-]/;
    const repetitiveCharsRegex = /(.)\1\1/;
    const noVowelRegex = /^[^aeiouyAEIOUY]*$/;
    const digitRegex = /\d/;

    if (forbiddenValues.includes(name.toLowerCase())) {
        return false;
    }
    if (specialCharsRegex.test(name)) {
        return false;
    }
    if (repetitiveCharsRegex.test(name)) {
        return false;
    }
    if (noVowelRegex.test(name)) {
        return false;
    }
    if (digitRegex.test(name)) {
        return false;
    }
    if (name.length <= 1) {
        return false;
    }
    return true;
}

export function validateNamesAreDifferent(lname, fname) {
    return lname.toLowerCase() !== fname.toLowerCase();
}



