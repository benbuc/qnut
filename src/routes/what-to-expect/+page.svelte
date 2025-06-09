<script lang="ts">
	import { onMount } from 'svelte';
	import { generateTestData } from '$lib/spectrogram';
	import SpectrogramCanvas from '$lib/SpectrogramCanvas.svelte';
	import { t } from '$lib/i18n.svelte';

	let speedBuckets = $state(new Map<string, number[][]>());

	onMount(() => {
		// Generate test data to show what an imbalanced wheel looks like
		const testBuckets = generateTestData();

		// Set the speedBuckets to trigger the canvas to render
		speedBuckets = testBuckets;
	});
</script>

<svelte:head>
	<title>{t('what-to-expect:title')}</title>
	<meta name="description" content={t('what-to-expect:meta')} />
</svelte:head>

<!-- eslint-disable svelte/no-at-html-tags -->

<!-- Back navigation -->
<div class="mb-6 flex justify-between">
	<a href="/" class="inline-flex items-center text-blue-600 hover:text-blue-800">
		← {t('what-to-expect:nav.backToHome')}
	</a>
	<a href="/measure" class="inline-flex items-center text-blue-600 hover:text-blue-800">
		← {t('what-to-expect:nav.backToMeasure')}
	</a>
</div>

<!-- Page Header -->
<div class="mb-8 text-center">
	<div class="mb-4 text-5xl">📊</div>
	<h2 class="mb-4 text-2xl font-bold text-slate-800">{t('what-to-expect:header.title')}</h2>
	<p class="text-lg text-slate-600">
		{t('what-to-expect:header.description')}
	</p>
</div>

<!-- Spectrogram Visualization -->
<div class="mb-8 rounded-lg bg-white p-6 shadow-sm">
	<h3 class="mb-4 text-lg font-semibold text-slate-800">{t('what-to-expect:sample.title')}</h3>
	<SpectrogramCanvas {speedBuckets} />
	<p class="mt-3 text-center text-sm text-slate-500">
		{t('what-to-expect:sample.description')}
	</p>
</div>

<!-- What to Look For Section -->
<div class="mb-8 space-y-6">
	<h3 class="text-xl font-semibold text-slate-800">{t('what-to-expect:lookFor.title')}</h3>

	<div class="rounded-lg bg-blue-50 p-4">
		<div class="mb-3 flex items-start gap-3">
			<span class="text-2xl">📈</span>
			<div>
				<h4 class="mb-2 font-semibold text-blue-800">{t('what-to-expect:diagonal.title')}</h4>
				<p class="text-sm text-blue-700">
					{t('what-to-expect:diagonal.description')}
				</p>
			</div>
		</div>
	</div>

	<div class="rounded-lg bg-green-50 p-4">
		<div class="mb-3 flex items-start gap-3">
			<span class="text-2xl">🔍</span>
			<div>
				<h4 class="mb-2 font-semibold text-green-800">{t('what-to-expect:why.title')}</h4>
				<p class="text-sm text-green-700">
					• {@html t('what-to-expect:why.point1')}<br />
					• {@html t('what-to-expect:why.point2')}<br />
					• {@html t('what-to-expect:why.point3')}<br />
					• {@html t('what-to-expect:why.point4')}
				</p>
			</div>
		</div>
	</div>

	<div class="rounded-lg bg-amber-50 p-4">
		<div class="mb-3 flex items-start gap-3">
			<span class="text-2xl">⚡</span>
			<div>
				<h4 class="mb-2 font-semibold text-amber-800">{t('what-to-expect:colors.title')}</h4>
				<p class="text-sm text-amber-700">
					• {@html t('what-to-expect:colors.point1')}<br />
					• {@html t('what-to-expect:colors.point2')}<br />
					• {@html t('what-to-expect:colors.point3')}
				</p>
			</div>
		</div>
	</div>
</div>

<!-- Speed Importance Note -->
<div class="mb-8 rounded-lg bg-indigo-50 p-4">
	<div class="mb-3 flex items-start gap-3">
		<span class="text-2xl">🚗</span>
		<div>
			<h4 class="mb-2 font-semibold text-indigo-800">{t('what-to-expect:speed.title')}</h4>
			<p class="text-sm text-indigo-700">
				{t('what-to-expect:speed.description')}
			</p>
		</div>
	</div>
</div>

<!-- Interpretation Guide -->
<div class="mb-8 rounded-lg bg-white p-6 shadow-sm">
	<h3 class="mb-4 text-lg font-semibold text-slate-800">{t('what-to-expect:interpret.title')}</h3>

	<div class="space-y-4">
		<div class="flex items-start gap-3">
			<span class="mt-1 text-green-500">✅</span>
			<div>
				<h4 class="font-medium text-slate-800">{t('what-to-expect:interpret.balanced.title')}</h4>
				<p class="text-sm text-slate-600">
					{t('what-to-expect:interpret.balanced.description')}
				</p>
			</div>
		</div>

		<div class="flex items-start gap-3">
			<span class="mt-1 text-yellow-500">⚠️</span>
			<div>
				<h4 class="font-medium text-slate-800">{t('what-to-expect:interpret.imbalance.title')}</h4>
				<p class="text-sm text-slate-600">
					{t('what-to-expect:interpret.imbalance.description')}
				</p>
			</div>
		</div>

		<div class="flex items-start gap-3">
			<span class="mt-1 text-red-500">🔧</span>
			<div>
				<h4 class="font-medium text-slate-800">{t('what-to-expect:interpret.next.title')}</h4>
				<p class="text-sm text-slate-600">
					{t('what-to-expect:interpret.next.description')}
				</p>
			</div>
		</div>
	</div>
</div>

<!-- Disclaimer -->
<div class="mb-8 rounded-lg border border-red-200 bg-red-50 p-4">
	<div class="flex items-start gap-3">
		<span class="text-2xl">⚠️</span>
		<div>
			<h4 class="mb-2 font-bold text-red-800">{t('what-to-expect:disclaimer.title')}</h4>
			<p class="text-sm text-red-700">
				{t('what-to-expect:disclaimer.description')}
			</p>
		</div>
	</div>
</div>

<!-- Navigation -->
<div class="text-center">
	<a
		href="/measure"
		class="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
	>
		{t('what-to-expect:nav.test')}
	</a>
</div>
