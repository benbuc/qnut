<script lang="ts">
	import '../app.css';
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
		<p>© {new Date().getFullYear()} WheelCheck</p>
	</footer>
</div>
