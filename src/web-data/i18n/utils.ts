import { ui, defaultLang, showDefaultLang, routes } from './ui.ts';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: keyof typeof ui = lang) {
    const pathName = path.replaceAll('/', '') as keyof typeof routes[typeof lang]
    const hasTranslation = routes[l] !== undefined && routes[l][pathName] !== undefined
    const translatedPath = hasTranslation ? '/' + routes[l][pathName] : path

    return !showDefaultLang && l === defaultLang ? translatedPath : `/${l}${translatedPath}`
  }
}

export function getRouteFromUrl(url: URL): string | undefined {
    const pathname = new URL(url).pathname;
    const parts = pathname?.split('/');


    const currentLang = getLangFromUrl(url);

    const path = (parts.pop() || parts.pop()) as keyof typeof routes[typeof currentLang];

    if (path === undefined) {
      return undefined;
    }

    if (defaultLang === currentLang) {
      const route = Object.values(routes)[0];
      return route[path] !== undefined ? route[path] : undefined;
    }

    const getKeyByValue = (obj: Record<string, string>, value: string): string | undefined  => {
        return Object.keys(obj).find((key) => obj[key] === value);
    }

    const reversedKey = getKeyByValue(routes[currentLang], path);

    if (reversedKey !== undefined) {
      return reversedKey;
    }

    return undefined;
  }
