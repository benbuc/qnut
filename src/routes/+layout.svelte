<script lang="ts">
	import '../app.css';
	import DonateButton from '$lib/DonateButton.svelte';
	let { children } = $props();
</script>

<div class="min-h-screen bg-slate-50 px-4 pt-4 pb-8">
	<header class="mb-6">
		<h1 class="text-center text-3xl font-bold text-blue-600">WheelCheck</h1>
	</header>

	<main class="container mx-auto max-w-xl">
		{@render children()}
	</main>

	<footer class="mt-12 text-center text-sm text-slate-500">
		<div class="mb-4">
			<DonateButton text="Support WheelCheck" variant="secondary" size="small" color="blue-600" />
		</div>
		<p>
			© {new Date().getFullYear()} WheelCheck |
			<a href="/support" class="hover:underline">Support</a> |
			<a href="/imprint" class="hover:underline">Imprint</a> |
			<a href="/privacy" class="hover:underline">Privacy</a>
		</p>
		<p class="mt-1">
			Made with <span class="text-red-500">❤️</span> in Europe
		</p>
	</footer>
</div>
