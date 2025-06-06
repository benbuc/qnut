<script>
	import DonateButton from '$lib/DonateButton.svelte';
</script>

<svelte:head>
	<title>Support WheelCheck - Help us keep the wheels turning</title>
	<meta
		name="description"
		content="Support the development of WheelCheck by making a donation and help us improve the app."
	/>
</svelte:head>

<div class="mb-8 text-center">
	<div class="mb-4 text-6xl">☕</div>
	<h2 class="mb-4 text-2xl font-bold text-slate-800">Support WheelCheck</h2>
	<p class="text-lg text-slate-600">
		Help us keep the wheels turning and the development moving forward.
	</p>
</div>

<div class="mb-8 space-y-6">
	<div class="rounded-lg bg-white p-6 shadow-sm">
		<h3 class="mb-4 text-xl font-semibold text-slate-800">Why Support Us?</h3>

		<p class="mb-4 text-slate-600">
			WheelCheck is a free tool developed by car enthusiasts for car enthusiasts. We're committed to
			helping drivers identify wheel imbalances before they become bigger problems.
		</p>

		<p class="mb-4 text-slate-600">Your support helps us:</p>

		<ul class="mb-6 space-y-2 text-slate-600">
			<li class="flex items-start">
				<span class="mr-2 text-blue-600">✓</span>
				<span>Keep the app free for everyone</span>
			</li>
			<li class="flex items-start">
				<span class="mr-2 text-blue-600">✓</span>
				<span>Improve vibration detection algorithms</span>
			</li>
			<li class="flex items-start">
				<span class="mr-2 text-blue-600">✓</span>
				<span>Add new features like detailed analysis and reporting</span>
			</li>
			<li class="flex items-start">
				<span class="mr-2 text-blue-600">✓</span>
				<span>Cover hosting and maintenance costs</span>
			</li>
		</ul>

		<div class="flex justify-center">
			<DonateButton text="Buy me a coffee" size="large" variant="primary" showPopup={true} />
		</div>
	</div>

	<div class="rounded-lg bg-blue-50 p-6">
		<h3 class="mb-3 text-lg font-semibold text-blue-800">How Your Support Helps</h3>

		<p class="mb-4 text-blue-700">
			Every contribution, no matter how small, makes a difference. Your support directly funds:
		</p>

		<div class="grid gap-4 md:grid-cols-2">
			<div class="rounded-lg bg-white p-4 shadow-sm">
				<h4 class="mb-2 font-semibold text-blue-600">Development</h4>
				<p class="text-sm text-slate-600">
					Improving algorithms, adding new features, and enhancing the user experience
				</p>
			</div>

			<div class="rounded-lg bg-white p-4 shadow-sm">
				<h4 class="mb-2 font-semibold text-blue-600">Infrastructure</h4>
				<p class="text-sm text-slate-600">
					Covering server costs, domain registration, and other operational expenses
				</p>
			</div>
		</div>
	</div>
</div>

<div class="text-center">
	<p class="text-slate-600">Thank you for considering a donation. Every coffee counts!</p>
	<a href="/" class="mt-4 inline-block text-blue-600 hover:text-blue-800 hover:underline">
		← Back to home
	</a>
</div>
