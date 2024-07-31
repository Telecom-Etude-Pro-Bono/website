import { useTranslatedPath } from "../web-data/i18n/utils";
import type { ui } from "../web-data/i18n/ui";

export const localizePathByLang = (lang: string) => (path: string) => {
    if (lang === "en") {
        if (path !== "/") {
            return `/en${path}`;
        }
        return "/en";
    }
    return path;
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
export function mdToDate(lang : keyof typeof ui, date: Date) : {day: string, month: string, year: string} {
    let day = new Date(date).toLocaleDateString(lang.toString(), {day: 'numeric'});
    let month = new Date(date).toLocaleDateString(lang.toString(), {month: 'long'});
    let year = new Date(date).toLocaleDateString(lang.toString(), {year: 'numeric'});

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

export const isSelected = (lang : keyof typeof ui, url: URL) => (pagename: string) : boolean => {
    // console.log(useTranslatedPath(lang)(pagename));
    console.log(url.pathname.includes(useTranslatedPath(lang)(pagename)));
    return url.pathname.includes(useTranslatedPath(lang)(pagename));
}


