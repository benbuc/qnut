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
		if (acc && acc.x !== null && acc.y !== null && acc.z !== null) {
			const magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);
			text = `Acceleration: x=${acc.x.toFixed(2)}, y=${acc.y.toFixed(2)}, z=${acc.z.toFixed(2)}, magnitude=${magnitude.toFixed(2)}`;
			buffer.push(magnitude);
			if (buffer.length >= bufferSize) {
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

				// Call our refactored drawing function
				drawSpectrogram(canvas, speedBuckets, bufferSize);
			}
		}
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
			// Use type assertion to handle iOS-specific API
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

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		canvas.width = 400;
		canvas.height = 300;

		// Draw initial canvas with background to verify it's working
		ctx.fillStyle = 'rgba(240, 240, 240, 0.5)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Add some testing data for development
		if (!measuring && speedBuckets.size === 0 && dev) {
			// Use our refactored function to generate test data
			const testBuckets = generateTestData(bufferSize);
			testBuckets.forEach((value: number[][], key: string) => {
				speedBuckets.set(key, value);
			});

			// Draw the test visualization
			drawSpectrogram(canvas, speedBuckets, bufferSize);
		}
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

<div
	class="mb-6 rounded border-l-4 border-blue-600 bg-blue-50 p-4 text-base text-slate-800 shadow-sm"
>
	<strong>WheelCheck</strong> helps you measure and visualize imbalances in your car's tires using
	your phone's sensors.<br />
	Place your phone securely on the car floor or seat, then press <b>Start Measuring</b> when ready.
</div>
<div
	class="mb-6 flex items-center gap-2 rounded border-l-4 border-red-600 bg-red-50 p-4 font-semibold text-red-800 shadow-sm"
>
	<span class="text-2xl">⚠️</span> <b>Do not use this app while driving!</b> Only operate when the car
	is safely stopped or with a passenger.
</div>
<div class="mb-4 text-center text-3xl font-bold text-blue-600">
	Speed: {currentSpeed >= 0 ? `${currentSpeed.toFixed(1)} km/h` : 'N/A'}
</div>
<div class="mb-6 flex items-center justify-center gap-4">
	<button
		class="rounded bg-blue-600 px-6 py-2 text-lg font-semibold text-white shadow transition hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-400"
		onclick={startMeasuring}
		disabled={measuring}>Start Measuring</button
	>
	<button
		class="rounded bg-slate-200 px-6 py-2 text-lg font-semibold text-slate-700 shadow transition hover:bg-slate-300 disabled:bg-slate-100 disabled:text-slate-400"
		onclick={stopMeasuring}
		disabled={!measuring}>Stop Measuring</button
	>
</div>
<canvas
	bind:this={canvas}
	class="mx-auto mt-6 block rounded border border-slate-200 shadow-lg"
	style="max-width: 100%; width: 400px; height: 300px;"
></canvas>
<div class="mt-4 rounded bg-slate-50 px-4 py-2 text-center text-base text-slate-700 shadow">
	{text}
</div>
