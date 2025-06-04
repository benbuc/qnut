<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import FFT from 'fft.js';
	import { drawSpectrogram, getSpeedBucket, generateTestData } from '$lib/spectrogram';
	import { dev } from '$app/environment';

	const bufferSize = 128;
	const fft = new FFT(bufferSize);

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let buffer: number[] = [];
	let currentSpeed = $state(-1);
	let text = $state('');

	const speedBuckets: Map<string, number[][]> = new Map();

	let measuring = $state(false);
	let motionListenerActive = false;
	let geoWatchId: number | null = null;
	let errorMsg = $state('');
	let warningMsg = $state('');

	function handleMotion(event: DeviceMotionEvent) {
		const acc = event.acceleration;
		if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

		const magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);
		text = `Acceleration: x=${acc.x.toFixed(2)}, y=${acc.y.toFixed(2)}, z=${acc.z.toFixed(2)}, magnitude=${magnitude.toFixed(2)}`;
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

		drawSpectrogram(canvas, speedBuckets, bufferSize);
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

	function initCanvas() {
		if (!canvas) return;
		ctx = canvas.getContext('2d')!;
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		ctx.fillStyle = '#f8fafc';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		if (speedBuckets.size > 0) {
			drawSpectrogram(canvas, speedBuckets, bufferSize);
		}
	}

	onMount(() => {
		initCanvas();

		if (dev) {
			const testBuckets = generateTestData(bufferSize);
			for (const [key, value] of testBuckets.entries()) {
				speedBuckets.set(key, value);
			}
			drawSpectrogram(canvas, speedBuckets, bufferSize);
		}

		const handleResize = () => {
			if (canvas) {
				initCanvas();
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	onDestroy(stopMeasuring);
</script>

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

<div class="mb-4 rounded bg-blue-50 p-4 shadow-sm">
	<p class="mb-2">
		<strong>WheelCheck</strong> helps you visualize wheel imbalances using your phone's sensors.
	</p>
	<p>Place your phone securely in your car and press Start when ready.</p>
</div>

<div class="mb-6 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
	<span class="text-xl">⚠️</span> <b>Safety first!</b> Only use with a passenger operating the app.
</div>

<div class="mb-4 rounded-lg bg-white p-4 shadow-sm">
	<div class="mb-2 text-center text-2xl font-bold text-blue-600">
		{currentSpeed >= 0 ? `${currentSpeed.toFixed(1)} km/h` : 'Not measuring'}
	</div>

	<div class="flex items-center justify-center gap-4">
		<button
			class="rounded-lg bg-blue-600 px-5 py-2 font-bold text-white shadow transition hover:bg-blue-700 disabled:opacity-50"
			onclick={startMeasuring}
			disabled={measuring}>Start</button
		>
		<button
			class="rounded-lg bg-slate-200 px-5 py-2 font-bold text-slate-700 shadow transition hover:bg-slate-300 disabled:opacity-50"
			onclick={stopMeasuring}
			disabled={!measuring}>Stop</button
		>
	</div>
</div>

<canvas
	bind:this={canvas}
	class="mx-auto w-full rounded border border-slate-100 shadow-md"
	style="height: 300px;"
></canvas>

{#if measuring}
	<div class="mt-3 rounded bg-slate-50 p-3 text-center text-sm text-slate-600">
		{text}
	</div>
{/if}
