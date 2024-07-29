export const languages = {
    fr: 'Français',
};

export const defaultLang = 'fr';

export const showDefaultLang = false;

export const ui = {
    fr: {
        'nav.home': '',
        'nav.about': 'Qui sommes-nous ?',
        'nav.patron': 'Devenez mécène',
        'nav.support': 'Ils nous supportent',
        'nav.blog': 'Actualités',
        'nav.contact': 'Contact',
        'nav.donate': 'Faire un don',

    },
} as const;

export const routes = {
    fr: {
        home: '/',
        about: '/qui-sommes-nous',
        patron: '/devenez-mecene',
        support: '/ils-nous-soutiennent',
        blog: '/actualites',
        contact: '/contact',
        donate: '/donner',
    }

} as const;
