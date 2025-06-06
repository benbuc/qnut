<script lang="ts">
	import { onMount } from 'svelte';
	import { generateTestData } from '$lib/spectrogram';
	import SpectrogramCanvas from '$lib/SpectrogramCanvas.svelte';

	const bufferSize = 128;
	let speedBuckets = $state(new Map<string, number[][]>());

	onMount(() => {
		// Generate test data to show what an imbalanced wheel looks like
		const testBuckets = generateTestData(bufferSize);

		// Set the speedBuckets to trigger the canvas to render
		speedBuckets = testBuckets;
	});
</script>

<svelte:head>
	<title>What to Expect - WheelCheck</title>
	<meta
		name="description"
		content="Learn what to look for in WheelCheck's spectrogram visualization when detecting wheel imbalances."
	/>
</svelte:head>

<!-- Back navigation -->
<div class="mb-6">
	<a href="/" class="inline-flex items-center text-blue-600 hover:text-blue-800">
		← Back to Home
	</a>
</div>

<!-- Page Header -->
<div class="mb-8 text-center">
	<div class="mb-4 text-5xl">📊</div>
	<h2 class="mb-4 text-2xl font-bold text-slate-800">What to Expect in Your Spectrogram</h2>
	<p class="text-lg text-slate-600">
		Understanding the visualization that reveals wheel imbalances
	</p>
</div>

<!-- Spectrogram Visualization -->
<div class="mb-8 rounded-lg bg-white p-6 shadow-sm">
	<h3 class="mb-4 text-lg font-semibold text-slate-800">Sample Spectrogram - Imbalanced Wheel</h3>
	<SpectrogramCanvas {speedBuckets} {bufferSize} />
	<p class="mt-3 text-center text-sm text-slate-500">
		This shows what an imbalanced wheel pattern looks like
	</p>
</div>

<!-- What to Look For Section -->
<div class="mb-8 space-y-6">
	<h3 class="text-xl font-semibold text-slate-800">What to Look For</h3>

	<div class="rounded-lg bg-blue-50 p-4">
		<div class="mb-3 flex items-start gap-3">
			<span class="text-2xl">📈</span>
			<div>
				<h4 class="mb-2 font-semibold text-blue-800">The Diagonal Line Pattern</h4>
				<p class="text-sm text-blue-700">
					An imbalanced wheel creates a distinctive diagonal line in the spectrogram that starts at
					the origin (bottom-left) and goes upward. This line represents the relationship between
					wheel speed and vibration intensity.
				</p>
			</div>
		</div>
	</div>

	<div class="rounded-lg bg-green-50 p-4">
		<div class="mb-3 flex items-start gap-3">
			<span class="text-2xl">🔍</span>
			<div>
				<h4 class="mb-2 font-semibold text-green-800">Why This Pattern Occurs</h4>
				<p class="text-sm text-green-700">
					• <strong>Wheels turn faster as you go faster</strong> - creating vibrations at higher
					frequencies<br />
					• <strong>Vibrations get stronger with speed</strong> - imbalanced wheels shake more at
					highway speeds<br />
					• <strong>The line through origin</strong> - shows this direct relationship between speed
					and vibration<br />
					• <strong>Focus on higher speeds</strong> - vibrations usually only become noticeable above
					40-50 km/h
				</p>
			</div>
		</div>
	</div>

	<div class="rounded-lg bg-amber-50 p-4">
		<div class="mb-3 flex items-start gap-3">
			<span class="text-2xl">⚡</span>
			<div>
				<h4 class="mb-2 font-semibold text-amber-800">What Colors Mean</h4>
				<p class="text-sm text-amber-700">
					• <strong>Dark blue/purple</strong> - Low vibration intensity (normal)<br />
					• <strong>Green/yellow</strong> - Moderate vibration intensity<br />
					• <strong>Bright yellow/white</strong> - High vibration intensity (potential imbalance)
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
			<h4 class="mb-2 font-semibold text-indigo-800">Why Higher Speeds Matter</h4>
			<p class="text-sm text-indigo-700">
				The visualization focuses on higher speeds because wheel imbalances typically don't produce
				noticeable vibrations below 40-50 km/h. For the most accurate diagnosis, measurements at
				highway speeds (70-100 km/h) are particularly valuable, as imbalance effects are amplified
				at these speeds. Lower speed measurements may show normal vibration levels even when an
				imbalance exists.
			</p>
		</div>
	</div>
</div>

<!-- Interpretation Guide -->
<div class="mb-8 rounded-lg bg-white p-6 shadow-sm">
	<h3 class="mb-4 text-lg font-semibold text-slate-800">Interpreting Your Results</h3>

	<div class="space-y-4">
		<div class="flex items-start gap-3">
			<span class="mt-1 text-green-500">✅</span>
			<div>
				<h4 class="font-medium text-slate-800">Balanced Wheels</h4>
				<p class="text-sm text-slate-600">
					Random, scattered vibrations with no clear diagonal pattern. Colors remain mostly
					blue/purple across all speeds.
				</p>
			</div>
		</div>

		<div class="flex items-start gap-3">
			<span class="mt-1 text-yellow-500">⚠️</span>
			<div>
				<h4 class="font-medium text-slate-800">Possible Imbalance</h4>
				<p class="text-sm text-slate-600">
					Clear diagonal line pattern with bright colors (yellow/white) indicating strong vibrations
					that increase with speed. Pay special attention to readings at higher speeds (above 40-50
					km/h), as wheel imbalances are typically not noticeable at lower speeds.
				</p>
			</div>
		</div>

		<div class="flex items-start gap-3">
			<span class="mt-1 text-red-500">🔧</span>
			<div>
				<h4 class="font-medium text-slate-800">Next Steps</h4>
				<p class="text-sm text-slate-600">
					If you see a strong diagonal pattern, consider having your wheels professionally balanced
					by a qualified mechanic.
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
			<h4 class="mb-2 font-bold text-red-800">Important Disclaimer</h4>
			<p class="text-sm text-red-700">
				WheelCheck is a diagnostic tool that provides indicators only. Always consult with a
				qualified mechanic for professional diagnosis and repair. Many factors can cause vibrations
				in vehicles beyond wheel imbalance.
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
		Ready to Test Your Wheels 🚀
	</a>
</div>
