<script>
	import DonateButton from '$lib/DonateButton.svelte';
	import { t } from '$lib/i18n.svelte';
</script>

<svelte:head>
	<title>{t('home:title')}</title>
	<meta name="description" content={t('home:meta')} />
</svelte:head>

<!-- Hero Section -->
<div class="mb-8 text-center">
	<div class="mb-4 text-6xl">🚗</div>
	<h2 class="mb-4 text-2xl font-bold text-slate-800">{t('home:detect.title')}</h2>
	<p class="text-lg text-slate-600">
		{t('home:detect.description')}
	</p>
</div>

<!-- How It Works Section -->
<div class="mb-8 space-y-6">
	<div class="flex items-center justify-between">
		<h3 class="text-xl font-semibold text-slate-800">{t('home:how.title')}</h3>
		<a href="/what-to-expect" class="text-sm text-blue-600 hover:text-blue-800 hover:underline">
			{t('home:how.link')}
		</a>
	</div>

	<div class="grid gap-4 md:grid-cols-2">
		<div class="rounded-lg bg-white p-4 shadow-sm">
			<div class="mb-2 text-3xl">📱</div>
			<h4 class="mb-2 font-semibold text-blue-600">{t('home:how.measure.title')}</h4>
			<p class="text-sm text-slate-600">
				{t('home:how.measure.description')}
			</p>
		</div>

		<div class="rounded-lg bg-white p-4 shadow-sm">
			<div class="mb-2 text-3xl">📊</div>
			<h4 class="mb-2 font-semibold text-blue-600">{t('home:how.analyze.title')}</h4>
			<p class="text-sm text-slate-600">
				{t('home:how.analyze.description')}
			</p>
		</div>
	</div>
</div>

<!-- Safety Warning -->
<div class="mb-8 rounded-lg border border-red-200 bg-red-50 p-4">
	<div class="flex items-start gap-3">
		<span class="text-2xl">⚠️</span>
		<div>
			<h4 class="mb-2 font-bold text-red-800">{t('home:safety.title')}</h4>
			<ul class="space-y-1 text-sm text-red-700">
				<li>• <strong>{t('home:safety.never')}</strong></li>
				<li>• {t('home:safety.passenger')}</li>
				<li>• {t('home:safety.mount')}</li>
				<li>• {t('home:safety.drive')}</li>
				<li>• {t('home:safety.professional')}</li>
			</ul>
		</div>
	</div>
</div>

<!-- Support Section -->
<div class="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
	<div class="flex flex-col items-center text-center">
		<div class="mb-2 text-2xl">☕</div>
		<h4 class="mb-2 font-bold text-blue-800">{t('home:supportSection.title')}</h4>
		<p class="mb-3 text-sm text-blue-700">
			{t('home:supportSection.description')}
		</p>
		<div class="gap-4 sm:flex">
			<DonateButton text={t('buyMeCoffee')} size="default" variant="primary" />
			<a
				href="/support"
				class="m-4 inline-flex h-min items-center rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:opacity-60"
			>
				{t('learnMore')}
			</a>
		</div>
	</div>
</div>

<!-- Requirements Section -->
<div class="mb-8 rounded-lg bg-blue-50 p-4">
	<h4 class="mb-3 font-semibold text-blue-800">{t('home:req.title')}</h4>
	<ul class="space-y-1 text-sm text-blue-700">
		<li>• {t('home:req.smartphone')}</li>
		<li>• {t('home:req.gps')}</li>
		<li>• {t('home:req.mount')}</li>
		<li>• {t('home:req.passenger')}</li>
	</ul>
</div>

<!-- Get Started Button -->
<div class="text-center">
	<a
		href="/measure"
		class="inline-flex items-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
	>
		🚀 {t('home:getStarted.button')}
	</a>
	<p class="mt-2 text-sm text-slate-500">
		{t('home:getStarted.safetyNote')}
	</p>
</div>
