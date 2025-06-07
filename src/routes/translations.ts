import type { Translations } from '$lib/i18n.svelte';
import { loadTranslationsForRoute } from '$lib/i18n.svelte';

const translations: Translations = {
	de: {
		title: 'WheelCheck - Radunwuchten Erkennen',
		meta: 'Erkennen Sie Radunwuchten mit den Sensoren Ihres Smartphones während der Fahrt.',
		// Hero Section
		'detect.title': 'Erkennen Sie Radunwuchten mit Ihrem Smartphone',
		'detect.description':
			'WheelCheck verwendet die integrierten Sensoren Ihres Smartphones, um potentielle Unwuchten zu erkennen.',

		// How It Works Section
		'how.title': 'So funktioniert WheelCheck',
		'how.link': 'Mehr Details →',
		'how.measure.title': '1. Vibrationen Messen',
		'how.measure.description':
			'Befestigen Sie Ihr Telefon sicher auf einer harten Oberfläche in Ihrem Fahrzeug. Die App verwendet den Beschleunigungssensor, um Vibrationen zu erkennen. Unwuchtige Räder erzeugen charakteristische Vibrationsmuster, die sich mit der Geschwindigkeit ändern.',
		'how.analyze.title': '2. Analysieren & Visualisieren',
		'how.analyze.description':
			'Die App verarbeitet Vibrationsdaten und stellt sie als Spektrogramm dar, das Frequenzmuster bei verschiedenen Geschwindigkeiten anzeigt, um potentielle Radprobleme zu identifizieren.',

		// Safety Warning
		'safety.title': 'Wichtiger Sicherheitshinweis',
		'safety.never': 'Bedienen Sie WheelCheck NIEMALS während der Fahrt',
		'safety.passenger': 'Lassen Sie immer einen Beifahrer die App während der Messungen bedienen',
		'safety.mount': 'Befestigen Sie Ihr Telefon sicher, damit es sich nicht bewegt',
		'safety.drive': 'Fahren Sie sicher und befolgen Sie alle Verkehrsregeln',
		'safety.professional':
			'Dieses Tool gibt nur Hinweise - konsultieren Sie einen professionellen Mechaniker für die Diagnose',

		// Support Section
		'supportSection.title': 'Unterstützen Sie WheelCheck',
		'supportSection.description':
			'WheelCheck ist kostenlos nutzbar. Wenn Sie es nützlich finden, können Sie die Entwicklung unterstützen. Ich würde mich sehr darüber freuen!',

		// Requirements Section
		'req.title': 'Was Sie benötigen',
		'req.smartphone': 'Ein Smartphone mit Bewegungssensoren (Beschleunigungsmesser)',
		'req.gps': 'GPS-Fähigkeit zur Geschwindigkeitserkennung',
		'req.mount':
			'Eine sichere Telefonhalterung in Ihrem Fahrzeug mit so wenig Dämpfung wie möglich',
		'req.passenger': 'Einen Beifahrer, der die App sicher bedient',

		// Get Started Section
		'getStarted.button': 'Messung starten',
		'getStarted.safetyNote': 'Stellen Sie sicher, dass ein Beifahrer die App bedient'
	},
	en: {
		title: 'WheelCheck - Detect Wheel Imbalances',
		meta: "Detect wheel imbalances using your smartphone's sensors while driving.",
		// Hero Section
		'detect.title': 'Detect Wheel Imbalances with Your Phone',
		'detect.description':
			"WheelCheck uses your smartphone's built-in sensors to help identify potential wheel imbalances while you drive.",

		// How It Works Section
		'how.title': 'How WheelCheck Works',
		'how.link': 'What to expect? →',
		'how.measure.title': '1. Measure Vibrations',
		'how.measure.description':
			"Mount your phone securely on a hard surface in your vehicle. The app uses your phone's accelerometer to detect vibrations while driving. Imbalanced wheels create distinctive vibration patterns that vary with speed.",
		'how.analyze.title': '2. Analyze & Visualize',
		'how.analyze.description':
			'The app processes vibration data and displays it as a spectrogram, showing frequency patterns across different speeds to help identify potential wheel issues.',

		// Safety Warning
		'safety.title': 'Important Safety Notice',
		'safety.never': 'Never operate WheelCheck while driving',
		'safety.passenger': 'Always have a passenger handle the app during measurements',
		'safety.mount': 'Securely mount your phone to prevent it from moving',
		'safety.drive': 'Drive safely and follow all traffic laws',
		'safety.professional':
			'This tool provides indicators only - consult a professional mechanic for diagnosis',

		// Support Section
		'supportSection.title': 'Support WheelCheck',
		'supportSection.description':
			'WheelCheck is free to use. If you find it helpful, consider supporting the development. I would appreciate it a lot!',

		// Requirements Section
		'req.title': "What You'll Need",
		'req.smartphone': 'A smartphone with motion sensors (accelerometer)',
		'req.gps': 'GPS capability for speed detection',
		'req.mount': 'A secure phone mount in your vehicle with as little damping as possible',
		'req.passenger': 'A passenger to operate the app safely',

		// Get Started Section
		'getStarted.button': 'Start Measuring',
		'getStarted.safetyNote': 'Make sure you have a passenger to operate the app safely'
	}
};

// Register translations for the home route
loadTranslationsForRoute('home', translations);

export default translations;
