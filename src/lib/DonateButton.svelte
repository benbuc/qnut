<script>
	import { onMount } from 'svelte';

	// You can customize these props based on your needs
	export let text = 'Buy me a coffee';
	export let color = 'blue-600'; // Using your existing color scheme
	export let size = 'default'; // options: "default", "small", "large"
	export let variant = 'primary'; // 'primary' (filled) or 'secondary' (outlined)
	export let showPopup = true; // Whether to show the popup or navigate directly

	// Replace with your actual buymeacoffee username once you create an account
	export let username = 'bebu';

	// State for popup modal
	let isPopupOpen = false;
	let popupElement;

	// Size classes based on the size prop
	let sizeClass =
		size === 'small'
			? 'text-xs px-3 py-1'
			: size === 'large'
				? 'text-lg px-6 py-3'
				: 'text-sm px-4 py-2';

	// Style based on variant
	let buttonClass;
	if (variant === 'primary') {
		buttonClass = `inline-flex items-center gap-2 rounded-md bg-${color} ${sizeClass} hover:bg-opacity-90 font-medium text-white transition-colors`;
	} else {
		buttonClass = `inline-flex items-center gap-2 rounded-md border border-${color} ${sizeClass} text-${color} hover:bg-${color} hover:bg-opacity-10 font-medium transition-colors`;
	}

	// Handle click on the donate button
	function handleDonateClick(e) {
		if (showPopup) {
			e.preventDefault();
			isPopupOpen = true;
		}
		// If showPopup is false, normal link behavior occurs (redirects to BMC)
	}

	// Close the popup when clicking outside
	function handleClickOutside(e) {
		if (popupElement && !popupElement.contains(e.target) && isPopupOpen) {
			isPopupOpen = false;
		}
	}

	// Close with escape key
	function handleKeydown(e) {
		if (e.key === 'Escape' && isPopupOpen) {
			isPopupOpen = false;
		}
	}

	onMount(() => {
		// Add event listeners when component mounts
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);

		// Clean up event listeners
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<div class="donate-container">
	<button on:click={handleDonateClick} class={buttonClass}>
		<svg
			width="20"
			height="20"
			viewBox="0 0 884 1279"
			fill={variant === 'primary' ? 'white' : `currentColor`}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M791.109 297.518L790.231 297.002L788.201 296.383C789.018 297.072 790.04 297.472 791.109 297.518Z"
			/>
			<path d="M803.896 388.891L802.916 389.166L803.896 388.891Z" />
			<path
				d="M791.484 297.377C791.359 297.361 791.237 297.332 791.118 297.29C791.111 297.354 791.111 297.419 791.118 297.483C791.252 297.414 791.379 297.342 791.484 297.377Z"
			/>
			<path d="M791.113 297.529H791.244V297.447L791.113 297.529Z" />
			<path d="M803.111 388.726L804.591 387.883L803.111 388.726Z" />
			<path d="M793.669 299.515L792.223 298.138L793.669 299.515Z" />
			<path
				d="M430.019 1186.18C428.864 1186.68 427.852 1187.46 427.076 1188.45L427.988 1187.87C428.608 1187.3 429.485 1186.63 430.019 1186.18Z"
			/>
			<path
				d="M641.187 1144.65C641.187 1143.38 640.278 1143.47 640.7 1143.79C640.762 1143.9 640.834 1144.01 640.916 1144.11C641.001 1144.13 641.088 1144.15 641.187 1144.65Z"
			/>
			<path
				d="M619.284 1186.18C618.129 1186.68 617.118 1187.46 616.342 1188.45L617.254 1187.87C617.873 1187.3 618.751 1186.63 619.284 1186.18Z"
			/>
			<path
				d="M281.304 1196.06C280.427 1195.3 279.354 1194.8 278.207 1194.61C279.136 1195.06 280.065 1195.51 280.684 1195.85L281.304 1196.06Z"
			/>
			<path
				d="M247.841 1164.01C247.704 1162.66 247.288 1161.35 246.619 1160.16C247.093 1161.39 247.489 1162.66 247.806 1163.94L247.841 1164.01Z"
			/>
			<path
				d="M472.623 590.836C426.682 583.931 377.504 620.698 372.844 639.461C368.702 655.712 362.303 679.718 362.303 679.718C361.193 670.09 354.818 641.768 320.847 635.553C298.795 631.251 283.751 649.511 278.351 668.806C270.884 728.502 248.122 816.274 202.318 842.916C166.107 863.824 108.505 828.389 108.505 828.389L126.758 1039.04C126.758 1039.04 142.562 1064.28 175.706 1062.34C175.706 1062.34 384.889 1062.8 438.615 1066.68C517.459 1072.67 680.289 1066.68 680.289 1066.68C680.289 1066.68 731.957 1068.6 763.268 1039.04C794.579 1009.48 785.326 962.499 785.326 962.499L833.141 810.486C833.141 810.486 784.841 693.218 747.482 666.342C741.29 661.296 733.356 658.607 725.178 658.706C702.084 658.706 688.828 685.483 688.828 685.483C688.828 685.483 673.116 724.926 666.198 741.033C654.707 746.214 640.633 746.214 629.142 741.033C578.889 709.214 511.072 668.806 472.623 590.836Z"
			/>
			<path
				d="M108.505 828.389C108.505 828.389 166.107 863.824 202.318 842.916C248.122 816.274 270.884 728.502 278.351 668.806C283.751 649.511 298.795 631.251 320.847 635.553C354.818 641.768 361.193 670.09 362.303 679.718C362.303 679.718 368.702 655.712 372.844 639.461C377.504 620.698 426.682 583.931 472.623 590.836C511.071 668.806 578.889 709.214 629.142 741.033C640.633 746.214 654.707 746.214 666.198 741.033C673.116 724.926 688.828 685.483 688.828 685.483C688.828 685.483 702.084 658.706 725.178 658.706C733.356 658.607 741.29 661.296 747.482 666.342C784.841 693.218 833.141 810.486 833.141 810.486L785.326 962.499C785.326 962.499 794.579 1009.48 763.268 1039.04C731.957 1068.6 680.289 1066.68 680.289 1066.68C680.289 1066.68 517.458 1072.67 438.615 1066.68C384.889 1062.8 175.706 1062.34 175.706 1062.34C142.562 1064.28 126.758 1039.04 126.758 1039.04L108.505 828.389Z"
				stroke={variant === 'primary' ? 'white' : `currentColor`}
				stroke-width="40"
				stroke-miterlimit="10"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		{text}
	</button>
</div>

{#if isPopupOpen}
	<div class="popup-overlay">
		<div class="popup-container" bind:this={popupElement}>
			<button
				class="close-button"
				on:click={() => (isPopupOpen = false)}
				aria-label="Close donation popup"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>

			<div class="iframe-container">
				<iframe
					src={`https://www.buymeacoffee.com/widget/page/${username}`}
					title="Buy Me a Coffee"
					style="border: 0; width: 100%; height: 100%; min-height: 400px;"
					loading="lazy"
				></iframe>
			</div>
		</div>
	</div>
{/if}

<style>
	.donate-container {
		margin: 1rem 0;
		display: flex;
		justify-content: center;
	}

	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		padding: 1rem;
	}

	.popup-container {
		background: white;
		border-radius: 8px;
		width: 100%;
		max-width: 500px;
		position: relative;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
		max-height: 90vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.close-button {
		position: absolute;
		top: 10px;
		right: 10px;
		background: none;
		border: none;
		cursor: pointer;
		color: #666;
		padding: 5px;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.8);
	}

	.close-button:hover {
		color: #333;
		background-color: rgba(255, 255, 255, 1);
	}

	.iframe-container {
		width: 100%;
		height: 100%;
		min-height: 400px;
		overflow: hidden;
	}
</style>
