<script lang="ts">
	import { onMount } from 'svelte';
	import { drawSpectrogram } from '$lib/spectrogram';
	import DevSettingsPanel from './DevSettingsPanel.svelte';

	interface Props {
		speedBuckets: Map<string, number[][]>;
	}

	let { speedBuckets }: Props = $props();

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	export function getCanvas(): HTMLCanvasElement | null {
		return canvas || null;
	}

	function initCanvas() {
		if (!canvas) return;
		ctx = canvas.getContext('2d')!;

		const rect = canvas.getBoundingClientRect();
		// TODO: Magic number 400 for max canvas size should be configurable
		const size = Math.min(rect.width, 400); // Max size of 400px

		canvas.width = size;
		canvas.height = size;

		// TODO: Hardcoded background color should be configurable or use CSS variables
		ctx.fillStyle = '#f8fafc';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		if (speedBuckets.size > 0) {
			drawSpectrogram(canvas, speedBuckets);
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

		const handleResize = () => {
			if (canvas) {
				initCanvas();
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div class="spectrogram-container">
	<canvas
		bind:this={canvas}
		class="mx-auto aspect-square w-full max-w-md rounded border border-slate-100 shadow-md"
	></canvas>

	<div class="mt-4">
		<DevSettingsPanel />
	</div>
</div>

<style>
	.spectrogram-container {
		display: flex;
		flex-direction: column;
	}
</style>
