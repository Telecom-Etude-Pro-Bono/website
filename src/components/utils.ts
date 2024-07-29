export const localizePathByLang = (lang: string) => (path: string) => {
    if (lang === "en") {
        if (path !== "/") {
            return `/en${path}`;
        }
        return "/en";
    }
    return path;
};

//convert page name to slug
export const pageNameToSlug = (pageName: string) => {
    switch (pageName) {
        case "about": return "qui-sommes-nous";
        case "patron": return "devenez-mecene";
        case "support": return "ils-nous-supportent";
        case "blog": return "actualites";
        case "contact": return "contact";
        case "donate": return "donner";
        default: return "/";
    }
};

//
export const nameToSlug = (name: string) => {
    return name.toLowerCase().replace(/ /g, "-");
};

// Format the date to a string
export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    return new Date(date).toLocaleDateString(undefined, options);
};

// Format the date to an object of day, month, year
export function mdToDate(date: Date) : {day: string, month: string, year: string} {
    let day = new Date(date).toLocaleDateString("fr", {day: 'numeric'});
    let month = new Date(date).toLocaleDateString("fr", {month: 'long'});
    let year = new Date(date).toLocaleDateString("fr", {year: 'numeric'});

    return {day, month, year};
};

// Capitalize the first letter
export function capitalize(str: string): string {
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export function typeToString(type: string): string {
    switch (type) {
        case "information" : return "Information";
        case "ongoing": return "Projet en cours";
        case "completed": return "Projet terminé";
        default: return "Information";
    }
};


