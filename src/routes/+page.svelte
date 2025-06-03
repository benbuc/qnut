<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import FFT from 'fft.js';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	const bufferSize = 128; // Number of samples per FFT
	const historySize = 50; // Number of FFT rows to keep

	let text = $state('init');

	const fft = new FFT(bufferSize);
	let buffer: number[] = [];
	let spectrogram: number[][] = [];

	let currentSpeed = $state(-1);

	const speedBuckets: Map<string, number[][]> = new Map();
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

				// Compute magnitude spectrum
				const magnitudes = output
					.slice(0, bufferSize / 2)
					.map((v, i) => Math.sqrt(output[2 * i] ** 2 + output[2 * i + 1] ** 2));

				const bucket = getSpeedBucket(currentSpeed);
				if (!speedBuckets.has(bucket)) {
					speedBuckets.set(bucket, []);
				}
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
		/*const barWidth = width / (bufferSize / 2);
		const rowHeight = height / historySize;

		for (let row = 0; row < spectrogram.length; row++) {
			const spectrum = spectrogram[row];
			for (let i = 0; i < spectrum.length; i++) {
				const magnitude = spectrum[i];
				const intensity = Math.min(255, Math.log1p(magnitude) * 32);
				ctx.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
				ctx.fillRect(i * barWidth, row * rowHeight, barWidth, rowHeight);
			}
		}*/
		const barWidth = width / (bufferSize / 2);
		const maxSpeed = Math.max(
			...Array.from(speedBuckets.keys()).map((key) => parseInt(key.split('-')[0]))
		);
		const speedScale = height / maxSpeed;

		for (const [bucket, spectra] of speedBuckets.entries()) {
			const bucketRange = bucket.split('-').map(Number);
			const bucketHeight = (bucketRange[1] - bucketRange[0]) * speedScale;

			const meanSpectrum = spectra.reduce(
				(acc, spectrum) => {
					spectrum.forEach((value, index) => {
						acc[index] = (acc[index] || 0) + value / spectra.length;
					});
					return acc;
				},
				new Array(bufferSize / 2).fill(0)
			);
			const rowIndex = Math.floor(bucketRange[0] / 5); // Assuming step of 5 for speed buckets
			const rowHeight = height / historySize;
			const minSpectrum = Math.min(...meanSpectrum);
			const maxSpectrum = Math.max(...meanSpectrum);
			for (let i = 0; i < meanSpectrum.length; i++) {
				const magnitude = meanSpectrum[i];
				//const intensity = Math.min(255, Math.log1p(magnitude) * 32);
				const intensity =
					255 - Math.floor(((magnitude - minSpectrum) / (maxSpectrum - minSpectrum)) * 255);
				ctx.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
				ctx.fillRect(i * barWidth, rowIndex * rowHeight, barWidth, bucketHeight);
			}
		}
	}

	async function requestGeoAccess() {
		return new Promise<void>((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				() => {
					geoGranted = true;
					resolve();
				},
				(err) => reject(err)
			);
		});
	}

	async function requestPermissionAndListen() {
		try {
			if (typeof DeviceMotionEvent.requestPermission === 'function') {
				const response = await DeviceMotionEvent.requestPermission();
				if (response !== 'granted') {
					alert('Permission denied to access motion sensors.');
					return;
				}
			}
			window.addEventListener('devicemotion', handleMotion, true);

			navigator.geolocation.watchPosition(
				(pos) => {
					if (pos.coords.speed !== undefined) {
						currentSpeed = pos.coords.speed * 3.6;
					} else {
						currentSpeed = -1; // Speed not available
					}
				},
				(err) => {
					alert('Geolocation error:', err);
					currentSpeed = null;
				},
				{
					enableHighAccuracy: true,
					maximumAge: 0,
					timeout: 5000
				}
			);
		} catch (error) {
			alert(`Error requesting motion permission: ${error}`);
		}
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		canvas.width = 400;
		canvas.height = 300;
	});

	onDestroy(() => {
		window.removeEventListener('devicemotion', handleMotion);
	});
</script>

<canvas bind:this={canvas} style="border: 1px solid black;"></canvas>
<br />
<button onclick={requestPermissionAndListen}>Request Motion Permission</button>

<p>{text}</p>

<p>Current speed: {currentSpeed}</p>
