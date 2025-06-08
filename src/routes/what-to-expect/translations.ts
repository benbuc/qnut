import type { Translations } from '$lib/i18n.svelte';
import { loadTranslationsForRoute } from '$lib/i18n.svelte';

const translations: Translations = {
	de: {
		// Page title and meta
		title: 'Was zu erwarten ist - Qnut',
		meta: 'Erfahren Sie, worauf Sie in der Spektrogramm-Visualisierung von Qnut bei der Erkennung von Radunwuchten achten müssen.',

		// Navigation
		'nav.backToHome': 'Zurück zur Startseite',
		'nav.backToMeasure': 'Zurück zur Messung',

		// Page Header
		'header.title': 'Auswertung',
		'header.description': 'Auswertung der Visualisierung zum Erkennen von Unwuchten',

		// Spectrogram Visualization
		'sample.title': 'Beispiel-Spektrogramm - Unwuchtiges Rad',
		'sample.description': 'Das charakteristische Muster eines unwuchtigen Rads',

		// What to Look For Section
		'lookFor.title': 'Worauf Sie achten sollten',

		// Diagonal Pattern Section
		'diagonal.title': 'Das diagonale Linienmuster',
		'diagonal.description':
			'Ein unwuchtiges Rad erzeugt ein charakteristisches diagonales Linienmuster im Spektrogramm, das am Ursprung (unten links) beginnt und nach oben verläuft. Diese Linie repräsentiert den Zusammenhang zwischen Radgeschwindigkeit und Vibrationen.',

		// Pattern Explanation Section
		'why.title': 'Warum dieses Muster entsteht',
		'why.point1':
			'<strong>Räder drehen sich schneller, je schneller Sie fahren</strong> - dadurch entstehen Vibrationen mit höheren Frequenzen',
		'why.point2':
			'<strong>Vibrationen werden stärker mit der Geschwindigkeit</strong> - unwuchtige Räder vibrieren stärker bei Autobahngeschwindigkeiten',
		'why.point3':
			'<strong>Die Linie durch den Ursprung</strong> - zeigt diesen direkten Zusammenhang zwischen Geschwindigkeit und Vibration',
		'why.point4':
			'<strong>Fokus auf höhere Geschwindigkeiten</strong> - Vibrationen werden normalerweise erst über 40-50 km/h bemerkbar',

		// Color Meaning Section
		'colors.title': 'Was die Farben bedeuten',
		'colors.point1': '<strong>Dunkelblau/Lila</strong> - Geringe Vibrationsintensität (normal)',
		'colors.point2': '<strong>Grün/Gelb</strong> - Mittlere Vibrationsintensität',
		'colors.point3': '<strong>Helles Gelb</strong> - Hohe Vibrationsintensität (mögliche Unwucht)',

		// Speed Importance Section
		'speed.title': 'Warum höhere Geschwindigkeiten wichtig sind',
		'speed.description':
			'Die Visualisierung konzentriert sich auf höhere Geschwindigkeiten, da Radunwuchten typischerweise keine spürbaren Vibrationen unter 40-50 km/h erzeugen. Für eine genauere Diagnose sind Messungen bei Autobahngeschwindigkeiten (70-150 km/h) besonders wertvoll, da die Auswirkungen von Unwuchten bei diesen Geschwindigkeiten verstärkt werden. Messungen bei niedrigeren Geschwindigkeiten können normale Vibrationsstärken zeigen, selbst wenn eine Unwucht vorhanden ist.',

		// Interpretation Guide Section
		'interpret.title': 'Ihre Ergebnisse interpretieren',
		'interpret.balanced.title': 'Ausgewuchtete Räder',
		'interpret.balanced.description':
			'Zufällige, verstreute Vibrationen ohne klares diagonales Muster. Farben bleiben bei allen Geschwindigkeiten meist blau/lila.',
		'interpret.imbalance.title': 'Mögliche Unwucht',
		'interpret.imbalance.description':
			'Klares diagonales Linienmuster mit hellen Farben (gelb), das auf starke Vibrationen hinweist, die mit der Geschwindigkeit zunehmen. Achten Sie besonders auf Messungen bei höheren Geschwindigkeiten (über 40-50 km/h), da Radunwuchten bei niedrigeren Geschwindigkeiten typischerweise nicht spürbar sind.',
		'interpret.next.title': 'Nächste Schritte',
		'interpret.next.description':
			'Wenn Sie ein starkes diagonales Muster sehen, sollten Sie Ihre Räder von einem qualifizierten Mechaniker professionell auswuchten lassen.',

		// Disclaimer Section
		'disclaimer.title': 'Wichtiger Hinweis',
		'disclaimer.description':
			'Qnut ist ein Diagnosewerkzeug, das nur Indikatoren liefert. Konsultieren Sie immer einen qualifizierten Mechaniker für professionelle Diagnose und Reparatur. Viele Faktoren können Vibrationen in Fahrzeugen verursachen, nicht nur Radunwuchten.',

		// Navigation Button
		'nav.test': 'Bereit, Ihre Räder zu testen 🚀'
	},
	en: {
		// Page title and meta
		title: 'What to Expect - Qnut',
		meta: "Learn what to look for in Qnut's spectrogram visualization when detecting wheel imbalances.",

		// Navigation
		'nav.backToHome': 'Back to Home',
		'nav.backToMeasure': 'Back to Measurement',

		// Page Header
		'header.title': 'What to Expect in Your Spectrogram',
		'header.description': 'Understanding the visualization that reveals wheel imbalances',

		// Spectrogram Visualization
		'sample.title': 'Sample Spectrogram - Imbalanced Wheel',
		'sample.description': 'This shows what an imbalanced wheel pattern looks like',

		// What to Look For Section
		'lookFor.title': 'What to Look For',

		// Diagonal Pattern Section
		'diagonal.title': 'The Diagonal Line Pattern',
		'diagonal.description':
			'An imbalanced wheel creates a distinctive diagonal line in the spectrogram that starts at the origin (bottom-left) and goes upward. This line represents the relationship between wheel speed and vibration intensity.',

		// Pattern Explanation Section
		'why.title': 'Why This Pattern Occurs',
		'why.point1':
			'<strong>Wheels turn faster as you go faster</strong> - creating vibrations at higher frequencies',
		'why.point2':
			'<strong>Vibrations get stronger with speed</strong> - imbalanced wheels shake more at highway speeds',
		'why.point3':
			'<strong>The line through origin</strong> - shows this direct relationship between speed and vibration',
		'why.point4':
			'<strong>Focus on higher speeds</strong> - vibrations usually only become noticeable above 40-50 km/h',

		// Color Meaning Section
		'colors.title': 'What Colors Mean',
		'colors.point1': '<strong>Dark blue/purple</strong> - Low vibration intensity (normal)',
		'colors.point2': '<strong>Green/yellow</strong> - Moderate vibration intensity',
		'colors.point3':
			'<strong>Bright yellow</strong> - High vibration intensity (potential imbalance)',

		// Speed Importance Section
		'speed.title': 'Why Higher Speeds Matter',
		'speed.description':
			"The visualization focuses on higher speeds because wheel imbalances typically don't produce noticeable vibrations below 40-50 km/h. For the most accurate diagnosis, measurements at highway speeds (70-150 km/h) are particularly valuable, as imbalance effects are amplified at these speeds. Lower speed measurements may show normal vibration levels even when an imbalance exists.",

		// Interpretation Guide Section
		'interpret.title': 'Interpreting Your Results',
		'interpret.balanced.title': 'Balanced Wheels',
		'interpret.balanced.description':
			'Random, scattered vibrations with no clear diagonal pattern. Colors remain mostly blue/purple across all speeds.',
		'interpret.imbalance.title': 'Possible Imbalance',
		'interpret.imbalance.description':
			'Clear diagonal line pattern with bright colors (yellow) indicating strong vibrations that increase with speed. Pay special attention to readings at higher speeds (above 40-50 km/h), as wheel imbalances are typically not noticeable at lower speeds.',
		'interpret.next.title': 'Next Steps',
		'interpret.next.description':
			'If you see a strong diagonal pattern, consider having your wheels professionally balanced by a qualified mechanic.',

		// Disclaimer Section
		'disclaimer.title': 'Important Disclaimer',
		'disclaimer.description':
			'Qnut is a diagnostic tool that provides indicators only. Always consult with a qualified mechanic for professional diagnosis and repair. Many factors can cause vibrations in vehicles beyond wheel imbalance.',

		// Navigation Button
		'nav.test': 'Ready to Test Your Wheels 🚀'
	}
};

// Register translations for this route
loadTranslationsForRoute('what-to-expect', translations);

export default translations;
