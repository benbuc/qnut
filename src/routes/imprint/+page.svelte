<script lang="ts">
	let currentLanguage = 'en';

	function toggleLanguage() {
		currentLanguage = currentLanguage === 'en' ? 'de' : 'en';
	}
</script>

<div class="prose prose-slate mx-auto">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="mb-0">{currentLanguage === 'en' ? 'Imprint' : 'Impressum'}</h1>
		<button
			class="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
			on:click={toggleLanguage}
		>
			{currentLanguage === 'en' ? 'Deutsch' : 'English'}
		</button>
	</div>

	{#if currentLanguage === 'en'}
		<div>
			<h2>Information according to § 5 TMG</h2>
			<p>
				[Your Full Name]<br />
				[Your Street and Number]<br />
				[Your Postal Code and City]<br />
				Germany
			</p>

			<h2>Contact</h2>
			<p>
				Phone: [Your Phone Number]<br />
				Email: [Your Email Address]<br />
			</p>

			<h2>Responsible for content according to § 55 Abs. 2 RStV</h2>
			<p>
				[Your Full Name]<br />
				[Your Street and Number]<br />
				[Your Postal Code and City]<br />
				Germany
			</p>

			<h2>Disclaimer</h2>

			<h3>Liability for content</h3>
			<p>
				The contents of our pages have been created with the greatest care. However, we cannot
				guarantee the accuracy, completeness, and timeliness of the content. As a service provider,
				we are responsible for our own content on these pages according to general laws according to
				§ 7 Abs.1 TMG. However, according to §§ 8 to 10 TMG, we are not obligated as a service
				provider to monitor transmitted or stored foreign information or to investigate
				circumstances that indicate illegal activity. Obligations to remove or block the use of
				information according to general laws remain unaffected. However, liability in this respect
				is only possible from the time of knowledge of a specific violation of the law. Upon
				notification of such violations, we will remove this content immediately.
			</p>

			<h3>Liability for links</h3>
			<p>
				Our offer contains links to external websites of third parties, on whose contents we have no
				influence. Therefore, we cannot assume any liability for these external contents. The
				respective provider or operator of the pages is always responsible for the contents of the
				linked pages. The linked pages were checked for possible legal violations at the time of
				linking. Illegal content was not recognizable at the time of linking. However, permanent
				control of the content of the linked pages is not reasonable without concrete evidence of a
				violation of the law. Upon notification of violations, we will remove such links
				immediately.
			</p>

			<h3>Copyright</h3>
			<p>
				The content and works created by the site operators on these pages are subject to German
				copyright law. The reproduction, editing, distribution, and any kind of exploitation outside
				the limits of copyright require the written consent of the respective author or creator.
				Downloads and copies of this site are only permitted for private, non-commercial use.
				Insofar as the content on this site was not created by the operator, the copyrights of third
				parties are respected. In particular, third-party content is identified as such. Should you
				nevertheless become aware of a copyright infringement, please inform us accordingly. Upon
				notification of violations, we will remove such content immediately.
			</p>
		</div>
	{:else}
		<div>
			<h2>Angaben gemäß § 5 TMG</h2>
			<p>
				[Ihr vollständiger Name]<br />
				[Ihre Straße und Hausnummer]<br />
				[Ihre Postleitzahl und Stadt]<br />
				Deutschland
			</p>

			<h2>Kontakt</h2>
			<p>
				Telefon: [Ihre Telefonnummer]<br />
				E-Mail: [Ihre E-Mail-Adresse]<br />
			</p>

			<h2>Inhaltlich Verantwortlicher gemäß § 55 Abs. 2 RStV</h2>
			<p>
				[Ihr vollständiger Name]<br />
				[Ihre Straße und Hausnummer]<br />
				[Ihre Postleitzahl und Stadt]<br />
				Deutschland
			</p>

			<h2>Haftungsausschluss</h2>

			<h3>Haftung für Inhalte</h3>
			<p>
				Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
				Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als
				Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
				allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
				jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
				oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
				Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
				allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst
				ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
				von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
			</p>

			<h3>Haftung für Links</h3>
			<p>
				Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
				Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
				Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
				Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
				mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung
				nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
				konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
				Rechtsverletzungen werden wir derartige Links umgehend entfernen.
			</p>

			<h3>Urheberrecht</h3>
			<p>
				Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
				deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
				Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
				des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
				privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht
				vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
				werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
				Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
				Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
			</p>
		</div>
	{/if}
</div>

<div class="mt-8 text-center">
	<a href="/" class="text-blue-600 hover:underline">← Back to Home</a>
</div>
