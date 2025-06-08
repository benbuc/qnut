import type { Translations } from '$lib/i18n.svelte';
import { loadTranslationsForRoute } from '$lib/i18n.svelte';

const translations: Translations = {
	de: {
		// Measurement related texts
		'measure.title': 'Vibrationsmessung',
		'measure.description':
			'Messen Sie die Vibrationen Ihres Fahrzeugs bei verschiedenen Geschwindigkeiten',
		'error.label': 'Fehler',
		'warning.label': 'Warnung',
		'measure.start': 'Messung starten',
		'measure.stop': 'Messung stoppen',
		'measure.reset': 'Zurücksetzen',
		'measure.download': 'Spektrogramm herunterladen',
		'measure.currentSpeed': 'Aktuelle Geschwindigkeit: {{speed}} km/h',
		'measure.gpsAccuracy': 'GPS-Genauigkeit: {{accuracy}} m',
		'measure.notMeasuring': 'Nicht aktiv',
		'measure.noSpeed': 'Geschwindigkeit wird ermittelt...',
		'measure.calibrating': 'Kalibrieren...',
		'measure.noData': 'Keine Daten verfügbar. Starten Sie eine Messung.',
		'measure.ready': 'Bereit zur Messung',
		'measure.readyDescription': 'Starten Sie die Messung, um Radvibrationen in Echtzeit zu sehen',
		'measure.collecting': 'Daten werden gesammelt',
		'measure.collectingDescription': 'Fahren Sie herum, um Vibrationsmessungen zu sammeln',
		'measure.helpLink': 'Wie lese ich das Spektrogramm? →',
		'safety.reminder': 'Sicherheitshinweis',
		'safety.passenger': 'Bedienen Sie die App nicht während der Fahrt.',
		'nav.backToHome': 'Zurück zur Startseite',

		// Permissions and errors
		'perm.needed': 'Berechtigungen erforderlich',
		'perm.motion': 'Bewegungssensoren werden benötigt, um Vibrationen zu messen.',
		'perm.location': 'Standortzugriff wird benötigt, um die Geschwindigkeit zu ermitteln.',
		'error.motion':
			'Fehler beim Zugriff auf Bewegungssensoren. Bitte prüfen Sie die Berechtigungen und Sensorverfügbarkeit.',
		'error.location':
			'Fehler beim Abrufen der Standortdaten. Bitte stellen Sie sicher, dass GPS aktiviert ist.',

		// Instructions
		'instructions.title': 'Anleitung',
		'instructions.mount': '1. Befestigen Sie Ihr Telefon sicher an einer harten Oberfläche',
		'instructions.speed':
			'2. Fahren Sie mit verschiedenen Geschwindigkeiten (z.B. 30, 50, 70, 90 km/h)',
		'instructions.duration': '3. Halten Sie jede Geschwindigkeit für ca. 10-15 Sekunden',
		'instructions.analyze': '4. Analysieren Sie das resultierende Spektrogramm',

		// Analysis tips
		'tips.title': 'Wie man das Spektrogramm liest',
		'tips.wheel':
			'Radunwuchten erzeugen normalerweise ein spezifisches Muster von Vibrationen, das sich proportional mit der Geschwindigkeit ändert.',
		'tips.pattern':
			'Achten Sie auf diagonale Linien oder Muster, die mit der Geschwindigkeit skalieren.',
		'tips.constant':
			'Konstante horizontale Linien sind normalerweise keine Radprobleme, sondern andere Fahrzeugvibrationen.',

		'error.geolocation': 'Geolocation API ist auf diesem Gerät nicht verfügbar.',
		'error.devicemotion': 'DeviceMotion API ist auf diesem Gerät nicht verfügbar.',
		'error.motionPermissionDenied': 'Berechtigung zum Zugriff auf Bewegungssensoren verweigert.',
		'error.noSpeed': 'Keine Geschwindigkeitsdaten verfügbar.'
	},
	en: {
		// Measurement related texts
		'measure.title': 'Vibration Measurement',
		'measure.description': "Measure your vehicle's vibrations at different speeds",
		'error.label': 'Error',
		'warning.label': 'Warning',
		'measure.start': 'Start Measuring',
		'measure.stop': 'Stop Measuring',
		'measure.reset': 'Reset',
		'measure.download': 'Download Spectrogram',
		'measure.currentSpeed': 'Current Speed: {{speed}} km/h',
		'measure.gpsAccuracy': 'GPS Accuracy: {{accuracy}} m',
		'measure.notMeasuring': 'Not measuring',
		'measure.noSpeed': 'Detecting speed...',
		'measure.calibrating': 'Calibrating...',
		'measure.noData': 'No data available. Start a measurement.',
		'measure.ready': 'Ready to Measure',
		'measure.readyDescription': 'Start measurement to see wheel vibration data in real-time',
		'measure.collecting': 'Collecting Data',
		'measure.collectingDescription': 'Drive around to gather vibration measurements',
		'measure.helpLink': 'How to read the spectrogram? →',
		'safety.reminder': 'Safety Reminder',
		'safety.passenger': 'Do not operate the app while driving.',
		'nav.backToHome': 'Back to Home',

		// Permissions and errors
		'perm.needed': 'Permissions Required',
		'perm.motion': 'Motion sensors permission is needed to measure vibrations.',
		'perm.location': 'Location access is needed to determine speed.',
		'error.motion':
			'Error accessing motion sensors. Please check permissions and sensor availability.',
		'error.location': 'Error retrieving location data. Please make sure GPS is enabled.',

		// Instructions
		'instructions.title': 'Instructions',
		'instructions.mount': '1. Mount your phone securely on a hard surface',
		'instructions.speed': '2. Drive at various speeds (e.g., 30, 50, 70, 90 km/h)',
		'instructions.duration': '3. Maintain each speed for about 10-15 seconds',
		'instructions.analyze': '4. Analyze the resulting spectrogram',

		// Analysis tips
		'tips.title': 'How to Read the Spectrogram',
		'tips.wheel':
			'Wheel imbalances typically create a specific pattern of vibrations that changes proportionally with speed.',
		'tips.pattern': 'Look for diagonal lines or patterns that scale with speed.',
		'tips.constant':
			'Constant horizontal lines are typically not wheel issues but other vehicle vibrations.',

		'error.geolocation': 'Geolocation API is not available on this device.',
		'error.devicemotion': 'DeviceMotion API is not available on this device.',
		'error.motionPermissionDenied': 'Permission denied to access motion sensors.',
		'error.noSpeed': 'Speed data is not available from your device.'
	}
};

// Register translations for the measure route
loadTranslationsForRoute('measure', translations);

export default translations;
