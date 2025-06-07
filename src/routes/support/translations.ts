import type { Translations } from '$lib/i18n.svelte';
import { loadTranslationsForRoute } from '$lib/i18n.svelte';

const translations: Translations = {
	de: {
		// Support page translations
		'support.title': 'Unterstützen Sie WheelCheck',
		'support.desc': 'Helfen Sie, WheelCheck besser zu machen',
		'support.intro':
			'WheelCheck ist eine kostenlose App, die aus persönlicher Leidenschaft für Technik und Autos entwickelt wurde. Ihre Unterstützung hilft, die App zu verbessern und neue Funktionen zu entwickeln.',

		// Why support us section
		'support.why.title': 'Warum uns unterstützen?',
		'support.why.description':
			'WheelCheck ist ein kostenloses Tool, das von <a class="underline" href="https://www.buymeacoffee.com/bebu" target="_blank">mir</a> entwickelt und gepflegt wird.',
		'support.why.helpIntro':
			'Ihre Unterstützung hilft, die App am Laufen zu halten und zu verbessern (ich hasse Werbebanner).',

		// How your support helps
		'support.how.title': 'Wie Ihre Unterstützung hilft',
		'support.how.description':
			'Jeder Beitrag, egal wie klein, macht einen Unterschied. Ihre Unterstützung finanziert direkt:',
		'support.how.development.title': 'Entwicklung',
		'support.how.development.description':
			'Verbesserung von Algorithmen, Hinzufügen neuer Funktionen und Verbesserung der Benutzererfahrung',
		'support.how.infrastructure.title': 'Infrastruktur',
		'support.how.infrastructure.description':
			'Abdeckung von Serverkosten, Domainregistrierung und anderen betrieblichen Ausgaben',

		// Support options
		'support.options.title': 'Unterstützungsmöglichkeiten',
		'support.donate.title': 'Spenden',
		'support.donate.desc':
			'Wenn Sie WheelCheck nützlich finden, können Sie durch eine kleine Spende helfen, die Entwicklungskosten zu decken.',
		'support.donate.button': 'Jetzt spenden',

		'support.feedback.title': 'Feedback geben',
		'support.feedback.desc':
			'Ihre Meinung ist wichtig! Teilen Sie Ihre Erfahrungen, Vorschläge oder berichten Sie Probleme.',
		'support.feedback.button': 'Feedback senden',

		'support.share.title': 'Teilen Sie die App',
		'support.share.desc':
			'Helfen Sie anderen, WheelCheck zu entdecken, indem Sie es mit Freunden und in sozialen Medien teilen.',
		'support.share.button': 'Teilen',

		// Thank you section
		'support.thanks.title': 'Vielen Dank!',
		'support.thanks.desc':
			'Jede Form der Unterstützung wird sehr geschätzt. Wir sind bestrebt, WheelCheck kontinuierlich zu verbessern und Ihre Erfahrung zu optimieren.',
		'support.thanks.message': 'Danke, dass Sie eine Spende in Betracht ziehen. Jeder Kaffee zählt!',

		// Navigation
		'nav.backToHome': 'Zurück zur Startseite'
	},
	en: {
		// Support page translations
		'support.title': 'Support WheelCheck',
		'support.desc': 'Help Make WheelCheck Better',
		'support.intro':
			'WheelCheck is a free app developed from a personal passion. Your support helps to keep the wheels turning.',

		// Why support us section
		'support.why.title': 'Why Support?',
		'support.why.description':
			"WheelCheck is a free tool developed and maintained by <a class='underline' href='https://www.buymeacoffee.com/bebu' target='_blank'>me</a>.",
		'support.why.helpIntro':
			'Your support helps to keep the app running and improving (I hate ads).',

		// How your support helps
		'support.how.title': 'How Your Support Helps',
		'support.how.description':
			'Every contribution, no matter how small, makes a difference. Your support directly funds:',
		'support.how.development.title': 'Development',
		'support.how.development.description':
			'Improving algorithms, adding new features, and enhancing the user experience',
		'support.how.infrastructure.title': 'Infrastructure',
		'support.how.infrastructure.description':
			'Covering server costs, domain registration, and other operational expenses',

		// Support options
		'support.options.title': 'Ways to Support',
		'support.donate.title': 'Donate',
		'support.donate.desc':
			'If you find WheelCheck useful, consider a small donation to help cover development costs.',
		'support.donate.button': 'Donate Now',

		'support.feedback.title': 'Provide Feedback',
		'support.feedback.desc':
			'Your opinion matters! Share your experiences, suggestions, or report issues.',
		'support.feedback.button': 'Send Feedback',

		'support.share.title': 'Share the App',
		'support.share.desc':
			'Help others discover WheelCheck by sharing it with friends and on social media.',
		'support.share.button': 'Share',

		// Thank you section
		'support.thanks.title': 'Thank You!',
		'support.thanks.desc':
			'Any form of support is greatly appreciated. We are committed to continuously improving WheelCheck and optimizing your experience.',
		'support.thanks.message': 'Thank you for considering a donation. Every coffee counts!',

		// Navigation
		'nav.backToHome': 'Back to home'
	}
};

// Register translations for the support route
loadTranslationsForRoute('support', translations);

export default translations;
