<script lang="ts">
	import '../app.css';
	import DonateButton from '$lib/DonateButton.svelte';
	import { onMount } from 'svelte';
	import { t, locale, locales } from '$lib/i18n.svelte';
	import { page } from '$app/stores';

	// Import all translations
	import '../lib/importTranslations';

	// Define language display names
	const languageNames: Record<string, string> = {
		en: 'English',
		de: 'Deutsch'
		// Add more languages here in the future
	};

	let { children } = $props();
</script>

<div class="min-h-screen bg-slate-50 px-4 pt-4 pb-8">
	<header class="mb-6">
		<div class="mb-2 flex items-center justify-between">
			<div class="w-24"></div>
			<!-- Spacer for alignment -->
			<h1 class="text-center text-3xl font-bold text-blue-600">WheelCheck</h1>
			<div class="relative w-24">
				<select
					bind:value={locale.current}
					class="w-full appearance-none rounded-md bg-blue-100 px-3 py-1 text-sm text-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
				>
					{#each locales as lang}
						<option value={lang}>{languageNames[lang] || lang.toUpperCase()}</option>
					{/each}
				</select>
				<div
					class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-600"
				>
					<svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
						<path
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						/>
					</svg>
				</div>
			</div>
		</div>
	</header>

	<main class="container mx-auto max-w-xl">
		{@render children()}
	</main>

	<footer class="mt-12 text-center text-sm text-slate-500">
		<div class="mb-4">
			<DonateButton
				text={t('supportWheelCheck')}
				variant="secondary"
				size="small"
				color="blue-600"
			/>
		</div>
		<p>
			© {new Date().getFullYear()} WheelCheck |
			<a href="/support" class="hover:underline">{t('support')}</a> |
			<a href="/imprint" class="hover:underline">{t('imprint')}</a> |
			<a href="/privacy" class="hover:underline">{t('privacy')}</a>
		</p>
		<p class="mt-1">
			{t('madeWith')}
		</p>
	</footer>
</div>
