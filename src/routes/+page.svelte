<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import FFT from 'fft.js';
	import colormap from 'colormap';

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

	function getSpeedBucket(speed: number, step = 5): string {
		const bucket = Math.floor(speed / step) * step;
		return `${bucket}-${bucket + step}`;
	}

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
				drawSpectrogram();
			}
		}
	}

	function drawSpectrogram() {
		const width = canvas.width;
		const height = canvas.height;
		ctx.clearRect(0, 0, width, height);
		const barWidth = width / (bufferSize / 2);
		// Check if there are any keys before trying to get the max
		if (speedBuckets.size === 0) {
			console.log('No speed data available yet');
			return;
		}
		const maxSpeed = Math.max(
			...Array.from(speedBuckets.keys()).map((key) => parseInt(key.split('-')[0]))
		);
		console.log('Max speed:', maxSpeed);
		// Ensure we don't divide by zero
		const speedScale = maxSpeed > 0 ? height / maxSpeed : 1;

		// Precompute mean spectra for each bucket
		const meanSpectra: { mean: number[]; bucketRange: number[] }[] = [];
		for (const [bucket, spectra] of speedBuckets.entries()) {
			const mean = spectra.reduce(
				(acc, spectrum) => {
					spectrum.forEach((value, index) => {
						acc[index] = (acc[index] || 0) + value / spectra.length;
					});
					return acc;
				},
				new Array(bufferSize / 2).fill(0)
			);
			meanSpectra.push({ mean, bucketRange: bucket.split('-').map(Number) });
		}

		// Compute global min/max (ignoring first 10%)
		const ignoreCount = Math.floor((bufferSize / 2) * 0.1);
		const allValues = meanSpectra.flatMap((obj) => obj.mean.slice(ignoreCount));
		const minSpectrum = Math.min(...allValues);
		const maxSpectrum = Math.max(...allValues);

		// DEBUG: Draw a background to see if canvas is working
		ctx.fillStyle = 'rgba(240, 240, 240, 0.5)';
		ctx.fillRect(0, 0, width, height);

		// Draw a grid for reference
		ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
		for (let i = 0; i < height; i += height / 10) {
			ctx.beginPath();
			ctx.moveTo(0, i);
			ctx.lineTo(width, i);
			ctx.stroke();
		}

		// Draw speed buckets visualization
		console.log(`Total speed buckets: ${meanSpectra.length}`);

		// Sort buckets by speed for proper display
		meanSpectra.sort((a, b) => a.bucketRange[0] - b.bucketRange[0]);

		// Instead of using speed to calculate positions directly,
		// divide the canvas height evenly among the available buckets
		const availableBuckets = meanSpectra.length;
		const rowHeight = height / Math.max(availableBuckets, 5); // Ensure minimum divisions

		// Draw labels for speed ranges on the left side
		ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
		ctx.font = '10px Arial';

		meanSpectra.forEach((spectra, index) => {
			// Get speed bucket info
			const minBucketSpeed = spectra.bucketRange[0];
			const maxBucketSpeed = spectra.bucketRange[1];
			console.log(`Processing speed bucket ${minBucketSpeed}-${maxBucketSpeed}`);

			// Draw speed label
			ctx.fillText(
				`${minBucketSpeed}-${maxBucketSpeed} km/h`,
				5,
				height - index * rowHeight - rowHeight / 2
			);
		});

		// Now draw the actual spectral data
		meanSpectra.forEach((spectra, index) => {
			const mean = spectra.mean;
			const minBucketSpeed = spectra.bucketRange[0];
			const maxBucketSpeed = spectra.bucketRange[1];

			// Calculate row position (from bottom, with index 0 at the bottom)
			// This distributes the rows evenly across the canvas height
			const y = height - (index + 1) * rowHeight;
			const bucketHeight = rowHeight * 0.9; // Leave small gap between rows

			console.log(
				`Drawing bucket ${minBucketSpeed}-${maxBucketSpeed} at y=${y} with height=${bucketHeight}`
			);

			// Draw the frequency data
			for (let i = 0; i < mean.length; i++) {
				const magnitude = mean[i];

				// Skip if no data or first few frequency bins (often just noise)
				if (isNaN(magnitude) || i < 2) continue;

				let norm = (magnitude - minSpectrum) / (maxSpectrum - minSpectrum);
				norm = Math.max(0, Math.min(1, norm));

				const color = viridisColor(norm);
				ctx.fillStyle = color;

				// Ensure we're drawing within canvas bounds
				if (y >= 0 && y + bucketHeight <= height) {
					ctx.fillRect(i * barWidth, y, barWidth, bucketHeight);
				}

				// Limit logging to avoid console spam
				if (i % 20 === 0) {
					console.log(
						`Drawing bar at x=${i * barWidth}, y=${y}, width=${barWidth}, height=${bucketHeight}, color=${color}`
					);
				}
			}
		});
	}

	// Precompute Viridis colormap
	const viridisColors = colormap({
		colormap: 'viridis',
		nshades: 256,
		format: 'rgb', // Use rgb format for simplicity
		alpha: 1
	});

	function viridisColor(t: number): string {
		try {
			t = Math.max(0, Math.min(1, t));
			const idx = Math.round(t * 255);
			if (idx < 0 || idx >= viridisColors.length) {
				console.warn(`Invalid color index: ${idx}, using fallback`);
				return 'rgba(0, 0, 255, 0.7)'; // Fallback color
			}
			const color = viridisColors[idx];
			// Handle both array and string formats that colormap might return
			if (Array.isArray(color)) {
				return `rgba(${color[0]},${color[1]},${color[2]},0.7)`;
			} else {
				// If it's already a string, just use it
				return color;
			}
		} catch (e) {
			console.error('Error in viridisColor:', e);
			return 'rgba(0, 0, 255, 0.7)'; // Fallback color if something goes wrong
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
			if (typeof DeviceMotionEvent.requestPermission === 'function') {
				const response = await DeviceMotionEvent.requestPermission();
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
						currentSpeed = Math.max(0, pos.coords.speed * 3.6) + 15;
					} else {
						currentSpeed = 15;
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
		if (!measuring && speedBuckets.size === 0) {
			console.log('Adding test data for visualization');
			// Create sample data for testing - cover a wide range of speeds
			const testSpeeds = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
			testSpeeds.forEach((speed) => {
				const bucket = getSpeedBucket(speed);
				const testData = [];
				// Generate some fake FFT data
				for (let i = 0; i < 5; i++) {
					const fakeSpectrum = Array(bufferSize / 2)
						.fill(0)
						.map((_, i) => {
							// Create different frequency patterns based on speed
							// Simulate different resonances at different speeds
							let value = 0;

							// Main peak that changes with speed (simulates wheel resonance)
							value += (Math.exp(-Math.pow(i - speed / 3, 2) / 50) * speed) / 8;

							// Secondary peaks (simulates other vibration sources)
							if (speed > 35) {
								value += (Math.exp(-Math.pow(i - 15, 2) / 10) * (speed - 30)) / 20;
							}

							// High frequency noise (increases with speed)
							if (i > 30) {
								value += (Math.random() * 0.4 + 0.1) * (speed / 60);
							}

							return value;
						});
					testData.push(fakeSpectrum);
				}
				speedBuckets.set(bucket, testData);
			});

			// Draw the test visualization
			drawSpectrogram();
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
