<svelte:head>
	<title>WheelCheck - Detect Wheel Imbalances</title>
	<meta
		name="description"
		content="Detect wheel imbalances using your smartphone's sensors while driving safely."
	/>
</svelte:head>

<!-- Hero Section -->
<div class="mb-8 text-center">
	<div class="mb-4 text-6xl">🚗</div>
	<h2 class="mb-4 text-2xl font-bold text-slate-800">Detect Wheel Imbalances with Your Phone</h2>
	<p class="text-lg text-slate-600">
		WheelCheck uses your smartphone's built-in sensors to help identify potential wheel imbalances
		while you drive.
	</p>
</div>

<!-- How It Works Section -->
<div class="mb-8 space-y-6">
	<div class="flex items-center justify-between">
		<h3 class="text-xl font-semibold text-slate-800">How WheelCheck Works</h3>
		<a href="/what-to-expect" class="text-sm text-blue-600 hover:text-blue-800 hover:underline">
			What to expect? →
		</a>
	</div>

	<div class="grid gap-4 md:grid-cols-2">
		<div class="rounded-lg bg-white p-4 shadow-sm">
			<div class="mb-2 text-3xl">📱</div>
			<h4 class="mb-2 font-semibold text-blue-600">1. Measure Vibrations</h4>
			<p class="text-sm text-slate-600">
				Your phone's accelerometer detects vibrations while driving. Imbalanced wheels create
				distinctive vibration patterns that vary with speed.
			</p>
		</div>

		<div class="rounded-lg bg-white p-4 shadow-sm">
			<div class="mb-2 text-3xl">📊</div>
			<h4 class="mb-2 font-semibold text-blue-600">2. Analyze & Visualize</h4>
			<p class="text-sm text-slate-600">
				The app processes vibration data and displays it as a spectrogram, showing frequency
				patterns across different speeds to help identify potential wheel issues.
			</p>
		</div>
	</div>
</div>

<!-- Safety Warning -->
<div class="mb-8 rounded-lg border border-red-200 bg-red-50 p-4">
	<div class="flex items-start gap-3">
		<span class="text-2xl">⚠️</span>
		<div>
			<h4 class="mb-2 font-bold text-red-800">Important Safety Notice</h4>
			<ul class="space-y-1 text-sm text-red-700">
				<li>• <strong>Never operate WheelCheck while driving</strong></li>
				<li>• Always have a passenger handle the app during measurements</li>
				<li>• Securely mount your phone to prevent it from moving</li>
				<li>• Drive safely and follow all traffic laws</li>
				<li>
					• This tool provides indicators only - consult a professional mechanic for diagnosis
				</li>
			</ul>
		</div>
	</div>
</div>

<!-- Requirements Section -->
<div class="mb-8 rounded-lg bg-blue-50 p-4">
	<h4 class="mb-3 font-semibold text-blue-800">What You'll Need</h4>
	<ul class="space-y-1 text-sm text-blue-700">
		<li>• A smartphone with motion sensors (accelerometer)</li>
		<li>• GPS capability for speed detection</li>
		<li>• A secure phone mount in your vehicle</li>
		<li>• A passenger to operate the app safely</li>
	</ul>
</div>

<!-- Get Started Button -->
<div class="text-center">
	<a
		href="/measure"
		class="inline-flex items-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
	>
		🚀 Start Measuring
	</a>
	<p class="mt-2 text-sm text-slate-500">
		Make sure you have a passenger to operate the app safely
	</p>
</div>
