import globalTranslations from '$lib/translations';

// Simple state for the current locale
export const locale = $state({ current: 'de' });

// Define the translation structure
export interface Translations {
	[locale: string]: {
		[key: string]: string;
	};
}

// Keep track of registered translation objects
interface TranslationRegistry {
	[namespace: string]: Translations;
}

const translationsRegistry: TranslationRegistry = {
	global: globalTranslations
};

// Update the locales based on all available translations
export const locales = Object.keys(globalTranslations) as string[];

interface TranslationVars {
	[key: string]: string;
}

// Register route-specific translations
export function registerTranslations(namespace: string, translationsObj: Translations): void {
	translationsRegistry[namespace] = translationsObj;
}

function translate(locale: string, key: string, vars: TranslationVars): string {
	// Parse the key to check for namespace
	const [namespace, actualKey] = key.includes(':') ? key.split(':', 2) : ['global', key];

	// Get translations from the appropriate namespace, fall back to global
	const translationSet = translationsRegistry[namespace] || translationsRegistry.global;

	// Get the text for the current locale and key, with fallbacks
	let text =
		translationSet[locale]?.[actualKey] ||
		translationSet.de?.[actualKey] ||
		globalTranslations[locale]?.[actualKey] ||
		globalTranslations.de?.[actualKey] ||
		`${locale}.${key}`;

	// Replace variables in the text
	Object.keys(vars).forEach((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		text = text.replace(regex, vars[k]);
	});

	return text;
}

export const t = (key: string, vars: TranslationVars = {}): string => {
	return translate(locale.current, key, vars);
};

// Helper function to auto-load translations from route
export function loadTranslationsForRoute(routeName: string, translations: Translations): void {
	registerTranslations(routeName, translations);
}
