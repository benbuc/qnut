import globalTranslations from '$lib/translations';

export interface Translations {
	[locale: string]: {
		[key: string]: string;
	};
}

interface TranslationRegistry {
	[namespace: string]: Translations;
}

const translationsRegistry: TranslationRegistry = {
	global: globalTranslations
};

export const locales = Object.keys(globalTranslations) as string[];

export const locale = $state({ current: 'en' });

interface TranslationVars {
	[key: string]: string;
}

export function registerTranslations(namespace: string, translationsObj: Translations): void {
	translationsRegistry[namespace] = translationsObj;
}

function translate(locale: string, key: string, vars: TranslationVars): string {
	// Parse the key to check for namespace
	const [namespace, actualKey] = key.includes(':') ? key.split(':', 2) : ['global', key];

	const translationSet = translationsRegistry[namespace] || translationsRegistry.global;

	let text =
		translationSet[locale]?.[actualKey] ||
		translationSet.en?.[actualKey] ||
		globalTranslations[locale]?.[actualKey] ||
		globalTranslations.en?.[actualKey] ||
		`${locale}.${key}`;

	Object.keys(vars).forEach((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		text = text.replace(regex, vars[k]);
	});

	return text;
}

export const t = (key: string, vars: TranslationVars = {}): string => {
	return translate(locale.current, key, vars);
};

export function loadTranslationsForRoute(routeName: string, translations: Translations): void {
	registerTranslations(routeName, translations);
}
