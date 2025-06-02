<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import FFT from 'fft.js';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	const bufferSize = 128; // Number of samples per FFT
	const historySize = 200; // Number of FFT rows to keep

	const fft = new FFT(bufferSize);
	let buffer: number[] = [];
	let spectrogram: number[][] = [];

	function handleMotion(event: DeviceMotionEvent) {
		const acc = event.acceleration;
		if (acc && acc.x !== null && acc.y !== null && acc.z !== null) {
			const magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);
			buffer.push(magnitude);
			if (buffer.length >= bufferSize) {
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

				spectrogram.unshift(magnitudes);
				if (spectrogram.length > historySize) spectrogram.pop();

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
		const rowHeight = height / historySize;

		for (let row = 0; row < spectrogram.length; row++) {
			const spectrum = spectrogram[row];
			for (let i = 0; i < spectrum.length; i++) {
				const magnitude = spectrum[i];
				const intensity = Math.min(255, Math.log1p(magnitude) * 32);
				ctx.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
				ctx.fillRect(i * barWidth, row * rowHeight, barWidth, rowHeight);
			}
		}
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
<button on:click={requestPermissionAndListen}>Request Motion Permission</button>
