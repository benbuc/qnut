<script>
	import DonateButton from '$lib/DonateButton.svelte';
	import { t } from '$lib/i18n.svelte';
</script>

<svelte:head>
	<title>{t('support:support.title')} - {t('support:support.desc')}</title>
	<meta
		name="description"
		content="Support the development of Qnut by making a donation and help us improve the app."
	/>
</svelte:head>

<div class="mb-8 text-center">
	<div class="mb-4 text-6xl">☕</div>
	<h2 class="mb-4 text-2xl font-bold text-slate-800">{t('support:support.title')}</h2>
	<p class="text-lg text-slate-600">
		{t('support:support.intro')}
	</p>
</div>

<div class="mb-8 space-y-6">
	<div class="rounded-lg bg-white p-6 shadow-sm">
		<h3 class="mb-4 text-xl font-semibold text-slate-800">{t('support:support.why.title')}</h3>

		<p class="mb-4 text-slate-600">
			{@html t('support:support.why.description')}
		</p>

		<p class="mb-4 text-slate-600">{t('support:support.why.helpIntro')}</p>

		<div class="flex justify-center">
			<DonateButton text={t('buyMeCoffee')} size="large" variant="primary" />
		</div>
	</div>

	<div class="rounded-lg bg-blue-50 p-6">
		<h3 class="mb-3 text-lg font-semibold text-blue-800">{t('support:support.how.title')}</h3>

		<p class="mb-4 text-blue-700">
			{t('support:support.how.description')}
		</p>

		<div class="grid gap-4 md:grid-cols-2">
			<div class="rounded-lg bg-white p-4 shadow-sm">
				<h4 class="mb-2 font-semibold text-blue-600">
					{t('support:support.how.development.title')}
				</h4>
				<p class="text-sm text-slate-600">
					{t('support:support.how.development.description')}
				</p>
			</div>

			<div class="rounded-lg bg-white p-4 shadow-sm">
				<h4 class="mb-2 font-semibold text-blue-600">
					{t('support:support.how.infrastructure.title')}
				</h4>
				<p class="text-sm text-slate-600">
					{t('support:support.how.infrastructure.description')}
				</p>
			</div>
		</div>
	</div>
</div>

<div class="text-center">
	<p class="text-slate-600">{t('support:support.thanks.message')}</p>
	<a href="/" class="mt-4 inline-block text-blue-600 hover:text-blue-800 hover:underline">
		← {t('support:nav.backToHome')}
	</a>
</div>
