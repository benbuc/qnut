<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import FFT from 'fft.js';
	import { generateTestData, getSpeedBucket } from '$lib/spectrogram';
	import SpectrogramCanvas from '$lib/SpectrogramCanvas.svelte';
	import { dev } from '$app/environment';

	const bufferSize = 128;
	const fft = new FFT(bufferSize);

	let buffer: number[] = [];
	let currentSpeed = $state(-1);

	let speedBuckets = $state(new Map<string, number[][]>());

	let measuring = $state(false);
	let motionListenerActive = false;
	let geoWatchId: number | null = null;
	let errorMsg = $state('');
	let warningMsg = $state('');
	let spectrogramCanvas: SpectrogramCanvas | null = $state(null);

	function downloadCanvas() {
		if (!spectrogramCanvas) return;

		// Get the canvas element from the SpectrogramCanvas component
		const canvas = spectrogramCanvas.getCanvas();
		if (!canvas) return;

		// Create download link
		const link = document.createElement('a');
		link.download = `wheelcheck-spectrogram-${new Date().toISOString().split('T')[0]}.png`;
		link.href = canvas.toDataURL('image/png');

		// Trigger download
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	function handleMotion(event: DeviceMotionEvent) {
		const acc = event.acceleration;
		if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

		const magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);
		buffer.push(magnitude);

		if (buffer.length < bufferSize) return;
		if (currentSpeed < 0) {
			buffer = [];
			return;
		}

		const windowed = buffer.map(
			(val, i) => val * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (bufferSize - 1)))
		);

		const input = new Array(bufferSize).fill(0);
		const output = new Array(bufferSize);

		for (let i = 0; i < bufferSize; i++) input[i] = windowed[i];

		fft.realTransform(output, input);
		fft.completeSpectrum(output);

		const magnitudes = output
			.slice(0, bufferSize / 2)
			.map((v, i) => Math.sqrt(output[2 * i] ** 2 + output[2 * i + 1] ** 2));

		const bucket = getSpeedBucket(currentSpeed);
		if (!speedBuckets.has(bucket)) speedBuckets.set(bucket, []);
		speedBuckets.get(bucket)!.push(magnitudes);
		buffer = [];

		// Trigger reactivity by creating a new Map
		speedBuckets = new Map(speedBuckets);
	}

	function resetErrors() {
		errorMsg = '';
		warningMsg = '';
	}

	function startMeasuring() {
		if (measuring) return;
		resetErrors();

		if (!('geolocation' in navigator)) {
			errorMsg = 'Geolocation API is not available on this device.';
			return;
		}

		if (typeof window.DeviceMotionEvent === 'undefined') {
			errorMsg = 'DeviceMotion API is not available on this device.';
			return;
		}

		measuring = true;
		requestPermissionAndListen();
	}

	function stopMeasuring() {
		measuring = false;

		if (motionListenerActive) {
			window.removeEventListener('devicemotion', handleMotion);
			motionListenerActive = false;
		}

		if (geoWatchId !== null) {
			navigator.geolocation.clearWatch(geoWatchId);
			geoWatchId = null;
		}
	}

	async function requestPermissionAndListen() {
		try {
			const DeviceMotionEventWithPermission = window.DeviceMotionEvent as unknown as {
				requestPermission?: () => Promise<string>;
			};

			if (typeof DeviceMotionEventWithPermission.requestPermission === 'function') {
				const response = await DeviceMotionEventWithPermission.requestPermission();
				if (response !== 'granted') {
					errorMsg = 'Permission denied to access motion sensors.';
					measuring = false;
					return;
				}
			}

			window.addEventListener('devicemotion', handleMotion, true);
			motionListenerActive = true;

			geoWatchId = navigator.geolocation.watchPosition(
				(pos) => {
					if (pos.coords.speed !== undefined && pos.coords.speed !== null) {
						currentSpeed = Math.max(0, pos.coords.speed * 3.6);
						warningMsg = '';
						errorMsg = '';
					} else {
						currentSpeed = -1;
						warningMsg = 'Speed data is not available from your device.';
					}
				},
				(err) => {
					errorMsg = 'Geolocation error: ' + err.message;
					currentSpeed = -1;
				},
				{
					enableHighAccuracy: true,
					maximumAge: 0,
					timeout: 5000
				}
			);
		} catch (error) {
			errorMsg = `Error requesting motion permission: ${error}`;
			measuring = false;
		}
	}

	onDestroy(stopMeasuring);

	onMount(() => {
		if (dev) {
			const testBuckets = generateTestData(bufferSize);
			for (const [key, value] of testBuckets.entries()) {
				speedBuckets.set(key, value);
			}
		}
	});
</script>

<svelte:head>
	<title>Measure - WheelCheck</title>
</svelte:head>

{#if errorMsg}
	<div class="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-center text-red-700">
		<strong>Error:</strong>
		{errorMsg}
	</div>
{/if}
{#if warningMsg}
	<div
		class="mb-4 rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-center text-yellow-800"
	>
		<strong>Warning:</strong>
		{warningMsg}
	</div>
{/if}

<div class="mb-3 rounded-lg bg-white p-3 shadow-sm">
	<div class="mb-2 text-center text-xl font-bold text-blue-600">
		{currentSpeed >= 0 ? `${currentSpeed.toFixed(1)} km/h` : 'Not measuring'}
	</div>

	<div class="flex items-center justify-center gap-3">
		<button
			class="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-blue-700 disabled:opacity-50"
			onclick={startMeasuring}
			disabled={measuring}>Start Measurement</button
		>
		<button
			class="rounded-lg bg-slate-200 px-4 py-2 font-semibold text-slate-700 shadow transition hover:bg-slate-300 disabled:opacity-50"
			onclick={stopMeasuring}
			disabled={!measuring}>Stop</button
		>
	</div>
</div>

{#if measuring && speedBuckets.size > 0}
	<div class="space-y-3">
		<SpectrogramCanvas bind:this={spectrogramCanvas} {speedBuckets} {bufferSize} />
		<div class="flex justify-center">
			<button
				class="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-green-700"
				onclick={downloadCanvas}
			>
				📥 Download
			</button>
		</div>
	</div>
{:else}
	<div
		class="mx-auto flex aspect-square w-full max-w-md flex-col items-center justify-center rounded border border-slate-100 bg-slate-50 p-8 text-center shadow-md"
	>
		{#if !measuring}
			<div class="mb-4 text-6xl">📊</div>
			<h3 class="mb-2 text-xl font-semibold text-slate-700">Ready to Measure</h3>
			<p class="text-slate-500">Start measurement to see wheel vibration data in real-time</p>
		{:else}
			<div class="mb-4 text-6xl">🔄</div>
			<h3 class="mb-2 text-xl font-semibold text-slate-700">Collecting Data</h3>
			<p class="text-slate-500">Drive around to gather vibration measurements</p>
		{/if}
	</div>
{/if}

<div class="mt-6 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
	<span class="text-xl">⚠️</span> <b>Safety Reminder:</b> Only use with a passenger operating the app.
</div>

<nav class="mt-6">
	<a href="/" class="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline">
		← Back to Home
	</a>
</nav>
