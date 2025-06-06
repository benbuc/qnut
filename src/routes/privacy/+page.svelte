<script lang="ts">
	let currentLanguage = 'en';

	function toggleLanguage() {
		currentLanguage = currentLanguage === 'en' ? 'de' : 'en';
	}
</script>

<div class="prose prose-slate mx-auto">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="mb-0">{currentLanguage === 'en' ? 'Privacy Policy' : 'Datenschutzerklärung'}</h1>
		<button
			class="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
			on:click={toggleLanguage}
		>
			{currentLanguage === 'en' ? 'Deutsch' : 'English'}
		</button>
	</div>

	{#if currentLanguage === 'en'}
		<div>
			<h2>1. Data Protection at a Glance</h2>

			<h3>General Information</h3>
			<p>
				The following information provides a simple overview of what happens to your personal data
				when you visit this website. Personal data is any data that could be used to identify you
				personally. For detailed information on data protection, please refer to our Privacy Policy
				listed below.
			</p>

			<h3>Data Collection on This Website</h3>
			<p><strong>Who is responsible for data collection on this website?</strong></p>
			<p>
				Data processing on this website is carried out by the website operator. The contact details
				can be found in the imprint of this website.
			</p>

			<p><strong>How do we collect your data?</strong></p>
			<p>
				Your data is collected when you provide it to us. This could be data you enter in a contact
				form.
			</p>
			<p>
				Other data is automatically collected by our IT systems when you visit the website. This is
				primarily technical data (e.g., internet browser, operating system, or time of page view).
				This data is collected automatically as soon as you enter our website.
			</p>

			<p><strong>What do we use your data for?</strong></p>
			<p>
				Part of the data is collected to ensure error-free provision of the website. Other data may
				be used to analyze your user behavior.
			</p>

			<p><strong>What rights do you have regarding your data?</strong></p>
			<p>
				You have the right to receive information about the origin, recipient, and purpose of your
				stored personal data free of charge at any time. You also have the right to request the
				correction, blocking, or deletion of this data. You can contact us at any time at the
				address given in the imprint if you have further questions on the subject of data
				protection. Furthermore, you have the right to lodge a complaint with the responsible
				supervisory authority.
			</p>

			<h2>2. General Information and Mandatory Information</h2>

			<h3>Data Protection</h3>
			<p>
				The operators of these pages take the protection of your personal data very seriously. We
				treat your personal data confidentially and in accordance with the statutory data protection
				regulations and this privacy policy.
			</p>
			<p>
				When you use this website, various personal data is collected. Personal data is data with
				which you can be personally identified. This privacy policy explains what data we collect
				and what we use it for. It also explains how and for what purpose this is done.
			</p>
			<p>
				We point out that data transmission over the Internet (e.g., when communicating by e-mail)
				may have security gaps. Complete protection of data against access by third parties is not
				possible.
			</p>

			<h3>Information about the Responsible Party</h3>
			<p>The responsible party for data processing on this website is:</p>
			<p>
				[Your Full Name]<br />
				[Your Street and House Number]<br />
				[Your Postal Code and City]<br />
				Germany
			</p>
			<p>
				Phone: [Your Phone Number]<br />
				Email: [Your Email Address]
			</p>
			<p>
				The responsible party is the natural or legal person who, alone or jointly with others,
				decides on the purposes and means of processing personal data (e.g., names, email addresses,
				etc.).
			</p>

			<h3>Storage Duration</h3>
			<p>
				Unless a specific storage period has been specified within this privacy policy, your
				personal data will remain with us until the purpose for data processing no longer applies.
				If you assert a legitimate request for deletion or revoke your consent to data processing,
				your data will be deleted, unless we have other legally permissible reasons for storing your
				personal data (e.g., tax or commercial law retention periods); in the latter case, the
				deletion will take place after these reasons cease to apply.
			</p>

			<h3>General Information on Data Protection</h3>
			<p>
				You have the following rights according to the General Data Protection Regulation (GDPR):
			</p>
			<ul>
				<li>Right to information (Art. 15 GDPR)</li>
				<li>Right to rectification (Art. 16 GDPR)</li>
				<li>Right to erasure ("right to be forgotten") (Art. 17 GDPR)</li>
				<li>Right to restriction of processing (Art. 18 GDPR)</li>
				<li>Right to notification (Art. 19 GDPR)</li>
				<li>Right to data portability (Art. 20 GDPR)</li>
				<li>Right to object (Art. 21 GDPR)</li>
				<li>
					Right not to be subject to automated decision-making, including profiling (Art. 22 GDPR)
				</li>
				<li>Right to lodge a complaint with a supervisory authority (Art. 77 GDPR)</li>
			</ul>
			<p>
				If you have questions about data protection, please send us an email or contact the person
				responsible for data protection in our organization.
			</p>

			<h2>3. Data Collection on Our Website</h2>

			<h3>Cookies</h3>
			<p>This website does not use cookies for analysis purposes.</p>

			<h3>Server Log Files</h3>
			<p>
				The website provider automatically collects and stores information in "server log files,"
				which your browser automatically transmits to us. These are:
			</p>
			<ul>
				<li>Browser type and browser version</li>
				<li>Operating system used</li>
				<li>Referrer URL</li>
				<li>Host name of the accessing computer</li>
				<li>Time of the server request</li>
				<li>IP address</li>
			</ul>
			<p>
				This data is not combined with other data sources. The collection of this data is based on
				Art. 6 (1) (f) GDPR. The website operator has a legitimate interest in the technically
				error-free presentation and optimization of its website – for this purpose, the server log
				files must be collected.
			</p>

			<h3>Contact Form</h3>
			<p>
				If you send us inquiries via the contact form, your details from the inquiry form, including
				the contact details you provided there, will be stored by us for the purpose of processing
				the inquiry and in the event of follow-up questions. We will not share this information
				without your consent.
			</p>
			<p>
				The processing of this data is based on Art. 6 (1) (b) GDPR, if your request is related to
				the execution of a contract or is necessary for carrying out pre-contractual measures. In
				all other cases, the processing is based on our legitimate interest in the effective
				processing of the requests addressed to us (Art. 6 (1) (f) GDPR) or on your consent (Art. 6
				(1) (a) GDPR) if this has been requested.
			</p>
			<p>
				The information you provide in the contact form will remain with us until you request
				deletion, revoke your consent to storage, or the purpose for data storage no longer applies
				(e.g., after your request has been processed). Mandatory statutory provisions – especially
				retention periods – remain unaffected.
			</p>

			<h2>4. Analytics and Advertising</h2>
			<p>This website does not use analytics or advertising services.</p>
		</div>
	{:else}
		<div>
			<h2>1. Datenschutz auf einen Blick</h2>

			<h3>Allgemeine Hinweise</h3>
			<p>
				Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
				personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten
				sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche
				Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten
				Datenschutzerklärung.
			</p>

			<h3>Datenerfassung auf dieser Website</h3>
			<p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
			<p>
				Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
				Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
			</p>

			<p><strong>Wie erfassen wir Ihre Daten?</strong></p>
			<p>
				Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es
				sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
			</p>
			<p>
				Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch
				unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser,
				Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt
				automatisch, sobald Sie diese Website betreten.
			</p>

			<p><strong>Wofür nutzen wir Ihre Daten?</strong></p>
			<p>
				Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
				gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
			</p>

			<p><strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong></p>
			<p>
				Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck
				Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die
				Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
				Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft
				widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der
				Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein
				Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
			</p>
			<p>
				Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns
				wenden.
			</p>

			<h2>2. Allgemeine Hinweise und Pflichtinformationen</h2>

			<h3>Datenschutz</h3>
			<p>
				Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir
				behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
				Datenschutzvorschriften sowie dieser Datenschutzerklärung.
			</p>
			<p>
				Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
				Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die
				vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie
				nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
			</p>
			<p>
				Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation
				per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem
				Zugriff durch Dritte ist nicht möglich.
			</p>

			<h3>Hinweis zur verantwortlichen Stelle</h3>
			<p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
			<p>
				[Ihr vollständiger Name]<br />
				[Ihre Straße und Hausnummer]<br />
				[Ihre Postleitzahl und Stadt]<br />
				Deutschland
			</p>
			<p>
				Telefon: [Ihre Telefonnummer]<br />
				E-Mail: [Ihre E-Mail-Adresse]
			</p>
			<p>
				Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam
				mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B.
				Namen, E-Mail-Adressen o. Ä.) entscheidet.
			</p>

			<h3>Speicherdauer</h3>
			<p>
				Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde,
				verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung
				entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur
				Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich
				zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer-
				oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung
				nach Fortfall dieser Gründe.
			</p>

			<h3>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung</h3>
			<p>Nach Maßgabe der Datenschutz-Grundverordnung (DSGVO) haben Sie folgende Rechte:</p>
			<ul>
				<li>Auskunftsrecht (Art. 15 DSGVO)</li>
				<li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
				<li>Recht auf Löschung ("Recht auf Vergessenwerden") (Art. 17 DSGVO)</li>
				<li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
				<li>Recht auf Unterrichtung (Art. 19 DSGVO)</li>
				<li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
				<li>Widerspruchsrecht (Art. 21 DSGVO)</li>
				<li>
					Recht, nicht einer automatisierten Entscheidungsfindung unterworfen zu werden,
					einschließlich Profiling (Art. 22 DSGVO)
				</li>
				<li>Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
			</ul>
			<p>
				Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie
				sich direkt an die für den Datenschutz verantwortliche Person in unserer Organisation.
			</p>

			<h2>3. Datenerfassung auf dieser Website</h2>

			<h3>Cookies</h3>
			<p>Diese Website verwendet keine Cookies zu Analysezwecken.</p>

			<h3>Server-Log-Dateien</h3>
			<p>
				Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
				Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
			</p>
			<ul>
				<li>Browsertyp und Browserversion</li>
				<li>verwendetes Betriebssystem</li>
				<li>Referrer URL</li>
				<li>Hostname des zugreifenden Rechners</li>
				<li>Uhrzeit der Serveranfrage</li>
				<li>IP-Adresse</li>
			</ul>
			<p>
				Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die
				Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der
				Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung
				und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.
			</p>

			<h3>Kontaktformular</h3>
			<p>
				Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
				Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
				Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir
				nicht ohne Ihre Einwilligung weiter.
			</p>
			<p>
				Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern
				Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
				vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung
				auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten
				Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a
				DSGVO) sofern diese abgefragt wurde.
			</p>
			<p>
				Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur
				Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die
				Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende
				gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
			</p>

			<h2>4. Analytics und Werbung</h2>
			<p>Diese Website verwendet keine Analytics oder Werbe-Dienste.</p>
		</div>
	{/if}
</div>

<div class="mt-8 text-center">
	<a href="/" class="text-blue-600 hover:underline">← Back to Home</a>
</div>
