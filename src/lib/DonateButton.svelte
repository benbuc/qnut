<script>
	let {
		text = 'Buy me a coffee',
		color = 'blue-600',
		size = 'default',
		variant = 'primary'
	} = $props();

	// Size classes based on the size prop
	let sizeClass =
		size === 'small'
			? 'text-xs px-3 py-1'
			: size === 'large'
				? 'text-lg px-6 py-3'
				: 'text-sm px-4 py-2';

	// Style based on variant
	let buttonClass =
		variant === 'primary'
			? `inline-flex items-center gap-2 rounded-md bg-${color} ${sizeClass} font-medium text-white transition-colors`
			: `inline-flex items-center gap-2 rounded-md border border-${color} ${sizeClass} text-${color} hover:opacity-60 font-medium transition-colors`;
</script>

<div class="donate-container mt-4 mb-4 flex justify-center">
	<a
		href="https://www.buymeacoffee.com/bebu"
		target="_blank"
		rel="noopener noreferrer"
		class={buttonClass}
	>
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke={variant === 'primary' ? 'white' : `currentColor`}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M18 8h1a4 4 0 0 1 0 8h-1"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M4 8h14v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<line
				x1="6"
				y1="2"
				x2="6"
				y2="4"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<line
				x1="10"
				y1="2"
				x2="10"
				y2="4"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<line
				x1="14"
				y1="2"
				x2="14"
				y2="4"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		{text}
		<!-- External link icon -->
		<svg
			class="external-link-icon"
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke={variant === 'primary' ? 'white' : `currentColor`}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<polyline
				points="15 3 21 3 21 9"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<line
				x1="10"
				y1="14"
				x2="21"
				y2="3"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</a>
</div>

<style>
	.external-link-icon {
		margin-left: 4px;
		transition: transform 0.2s ease;
	}

	a:hover .external-link-icon {
		transform: translate(1px, -1px);
	}
</style>
