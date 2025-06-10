<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { generateTestData } from '$lib/spectrogram';
	import SpectrogramCanvas from '$lib/SpectrogramCanvas.svelte';
	import { dev } from '$app/environment';
	import { t } from '$lib/i18n.svelte';
	import { AccelerationCapture, GPS_ACCURACY_THRESHOLD } from '$lib/accelerationCapture.svelte';

	const cap = new AccelerationCapture();

	let spectrogramCanvas: SpectrogramCanvas | null = $state(null);

	function downloadCanvas() {
		if (!spectrogramCanvas) return;

		// Get the canvas element from the SpectrogramCanvas component
		const canvas = spectrogramCanvas.getCanvas();
		if (!canvas) return;

		// Create download link
		const link = document.createElement('a');
		link.download = `qnut-spectrogram-${new Date().toISOString().split('T')[0]}.png`;
		link.href = canvas.toDataURL('image/png');

		// Trigger download
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	async function startMeasuring() {
		if (cap.measuring) return;
		await cap.startMeasuring();
	}

	function stopMeasuring() {
		cap.stopMeasuring();
	}

	onDestroy(stopMeasuring);

	onMount(() => {
		if (dev) {
			// For development, populate with test data
			const testBuckets = generateTestData();
			cap.speedBuckets = testBuckets;
		}
	});
</script>

<svelte:head>
	<title>{t('measure:measure.title')} - Qnut</title>
</svelte:head>

{#if cap.errorMsg}
	<div class="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-center text-red-700">
		<strong>{t('measure:error.label')}:</strong>
		{cap.errorMsg}
	</div>
{/if}
{#if cap.warningMsg}
	<div
		class="mb-4 rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-center text-yellow-800"
	>
		<strong>{t('measure:warning.label')}:</strong>
		{cap.warningMsg}
	</div>
{/if}

<div class="mb-3 rounded-lg bg-white p-3 shadow-sm">
	<div class="mb-2 text-center">
		<div class="text-xl font-bold text-blue-600">
			{cap.currentSpeed >= 0
				? t('measure:measure.currentSpeed', { speed: cap.currentSpeed.toFixed(1) })
				: t('measure:measure.notMeasuring')}
		</div>
		{#if cap.gpsAccuracy > 0}
			<div
				class:text-yellow-600={cap.gpsAccuracy > GPS_ACCURACY_THRESHOLD}
				class:text-green-600={cap.gpsAccuracy <= GPS_ACCURACY_THRESHOLD}
				class="text-sm"
			>
				{t('measure:measure.gpsAccuracy', { accuracy: cap.gpsAccuracy.toFixed(1) })}
			</div>
		{/if}
	</div>

	<div class="flex items-center justify-center gap-3">
		<button
			class="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-blue-700 disabled:opacity-50"
			onclick={startMeasuring}
			disabled={cap.measuring}>{t('measure:measure.start')}</button
		>
		<button
			class="rounded-lg bg-slate-200 px-4 py-2 font-semibold text-slate-700 shadow transition hover:bg-slate-300 disabled:opacity-50"
			onclick={stopMeasuring}
			disabled={!cap.measuring}>{t('measure:measure.stop')}</button
		>
	</div>
</div>

{#if cap.speedBuckets.size > 0}
	<div class="space-y-3">
		<SpectrogramCanvas bind:this={spectrogramCanvas} speedBuckets={cap.speedBuckets} />
		<div class="flex items-center justify-between">
			<a href="/what-to-expect" class="text-sm text-blue-600 hover:text-blue-800 hover:underline">
				{t('measure:measure.helpLink')}
			</a>
			<button
				class="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-green-700"
				onclick={downloadCanvas}
			>
				📥 {t('measure:measure.download')}
			</button>
		</div>
	</div>
{:else}
	<div
		class="mx-auto flex aspect-square w-full max-w-md flex-col items-center justify-center rounded border border-slate-100 bg-slate-50 p-8 text-center shadow-md"
	>
		{#if !cap.measuring}
			<div class="mb-4 text-6xl">📊</div>
			<h3 class="mb-2 text-xl font-semibold text-slate-700">{t('measure:measure.ready')}</h3>
			<p class="text-slate-500">{t('measure:measure.readyDescription')}</p>
			<div class="mt-4">
				<a href="/what-to-expect" class="text-sm text-blue-600 hover:text-blue-800 hover:underline">
					{t('measure:measure.helpLink')}
				</a>
			</div>
		{:else}
			<div class="mb-4 text-6xl">🔄</div>
			<h3 class="mb-2 text-xl font-semibold text-slate-700">{t('measure:measure.collecting')}</h3>
			<p class="text-slate-500">{t('measure:measure.collectingDescription')}</p>
		{/if}
	</div>
{/if}

<div class="mt-6 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
	<span class="text-xl">⚠️</span> <b>{t('measure:safety.reminder')}:</b>
	{t('measure:safety.passenger')}
</div>

<nav class="mt-6">
	<a href="/" class="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline">
		← {t('measure:nav.backToHome')}
	</a>
</nav>
