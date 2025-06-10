import type { Handle } from '@sveltejs/kit';
import { locales } from '$lib/i18n.svelte';

export const handle: Handle = async ({ event, resolve }) => {
	const locale = event.cookies.get('locale');
	if (!locale) {
		const acceptLanguageHeader = event.request.headers.get('accept-language');
		if (acceptLanguageHeader) {
			const preferredLanguage = acceptLanguageHeader
				.split(',')
				.map((lang) => lang.split(';')[0].trim().split('-')[0])
				.find((lang) => locales.includes(lang));

			if (preferredLanguage) {
				event.locals.userLocale = preferredLanguage;
			}
		}
	} else {
		event.locals.userLocale = locale;
	}
	if (!event.locals.userLocale) {
		event.locals.userLocale = 'en';
	}

	return await resolve(event);
};
