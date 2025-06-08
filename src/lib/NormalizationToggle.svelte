<script lang="ts">
	import { settings } from './settings.svelte';
</script>

<div class="flex flex-col gap-1 rounded-md border border-slate-200 bg-slate-100 p-2">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<label class="relative inline-flex cursor-pointer items-center">
				<input type="checkbox" class="peer sr-only" bind:checked={settings.normalizePerSpeedLine} />
				<div
					class="peer h-5 w-9 rounded-full bg-slate-300 peer-checked:bg-blue-500 after:absolute after:top-0.5 after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"
				></div>
			</label>
			<span class="text-xs font-semibold text-slate-700"
				>Normalization: <span class="text-blue-600"
					>{settings.normalizePerSpeedLine ? 'Per Speed Line' : 'Global'}</span
				></span
			>
		</div>
	</div>

	<div class="pl-11 text-[10px] text-slate-500">
		{#if settings.normalizePerSpeedLine}
			Each speed line is normalized independently, highlighting details at each speed
		{:else}
			Entire spectrogram uses same color scale, better for comparing intensities across speeds
		{/if}
	</div>
</div>
