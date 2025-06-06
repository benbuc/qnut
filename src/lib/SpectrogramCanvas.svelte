<script lang="ts">
	import { onMount } from 'svelte';
	import { drawSpectrogram, generateTestData } from '$lib/spectrogram';
	import { dev } from '$app/environment';

	interface Props {
		speedBuckets: Map<string, number[][]>;
		bufferSize: number;
	}

	let { speedBuckets, bufferSize }: Props = $props();

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	// Export function to get canvas for downloading
	export function getCanvas(): HTMLCanvasElement | null {
		return canvas || null;
	}

	function initCanvas() {
		if (!canvas) return;
		ctx = canvas.getContext('2d')!;

		// Make canvas square based on its container width
		const rect = canvas.getBoundingClientRect();
		const size = Math.min(rect.width, 400); // Max size of 400px

		canvas.width = size;
		canvas.height = size;

		ctx.fillStyle = '#f8fafc';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		if (speedBuckets.size > 0) {
			drawSpectrogram(canvas, speedBuckets, bufferSize);
		}
	}

	function redrawCanvas() {
		if (!canvas) return;
		initCanvas();
	}

	// React to changes in speedBuckets
	$effect(() => {
		if (speedBuckets && canvas) {
			redrawCanvas();
		}
	});

	onMount(() => {
		initCanvas();

		if (dev) {
			const testBuckets = generateTestData(bufferSize);
			for (const [key, value] of testBuckets.entries()) {
				speedBuckets.set(key, value);
			}
		}
		drawSpectrogram(canvas, speedBuckets, bufferSize);

		const handleResize = () => {
			if (canvas) {
				initCanvas();
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<canvas
	bind:this={canvas}
	class="mx-auto aspect-square w-full max-w-md rounded border border-slate-100 shadow-md"
></canvas>
