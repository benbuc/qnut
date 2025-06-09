<script lang="ts">
	import { settings } from './settings.svelte';
	import CalculationMethodToggle from './CalculationMethodToggle.svelte';
	import NormalizationToggle from './NormalizationToggle.svelte';

	// Whether to show the dev settings panel
	let showDevSettings = $state(false);

	// Local copies for debugging display
	let settingsString = $derived(JSON.stringify(settings, null, 2));
</script>

<div class="mb-4 rounded-lg border border-slate-200 bg-slate-50 shadow-sm">
	<div class="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-2">
		<div class="flex items-center gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 text-slate-500"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
			<span class="text-sm font-medium text-slate-700">Visualization Settings</span>
			<span class="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800"
				>DEV ONLY</span
			>
		</div>
		<button
			onclick={() => (showDevSettings = !showDevSettings)}
			class="rounded-md px-2 py-0.5 text-xs font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
		>
			{showDevSettings ? 'Hide' : 'Show Settings'}
		</button>
	</div>

	{#if showDevSettings}
		<div class="p-3">
			<div class="space-y-3">
				<CalculationMethodToggle />
				<NormalizationToggle />

				{#if import.meta.env.DEV}
					<div class="mt-4 rounded border border-slate-200 bg-slate-50 p-2">
						<div class="mb-1 text-[10px] font-medium text-slate-500">Current Settings:</div>
						<pre
							class="overflow-x-auto rounded bg-slate-800 p-2 text-[10px] text-green-400">{settingsString}</pre>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
