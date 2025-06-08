<script lang="ts">
	import { settings } from './settings.svelte';
</script>

<div class="mb-2 flex items-center gap-2 rounded-md border border-slate-200 bg-slate-100 px-3 py-2">
	<span class="text-xs font-medium text-slate-500">{settings.useMedian ? 'Median' : 'Mean'}</span>
	<label class="relative inline-flex cursor-pointer items-center">
		<input type="checkbox" class="peer sr-only" bind:checked={settings.useMedian} />
		<div
			class="peer h-5 w-9 rounded-full bg-slate-300 peer-checked:bg-blue-500 after:absolute after:top-0.5 after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"
		></div>
	</label>
	<span class="text-xs font-medium text-slate-500">Toggle calculation method</span>
</div>
