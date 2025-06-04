import colormap from 'colormap';

// Precomputed Viridis colormap
const viridisColors = colormap({
	colormap: 'viridis',
	nshades: 256,
	format: 'rgba',
	alpha: 1
});

/**
 * Get the color from the viridis colormap for a normalized value
 * @param t Normalized value between 0 and 1
 * @returns RGBA color string
 */
export function viridisColor(t: number): string {
	try {
		t = Math.max(0, Math.min(1, t));
		const idx = Math.round(t * 255);
		if (idx < 0 || idx >= viridisColors.length) {
			console.warn(`Invalid color index: ${idx}, using fallback`);
			return 'rgba(0, 0, 255, 1)'; // Fallback color with full opacity
		}
		const color = viridisColors[idx];
		// Handle both array and string formats that colormap might return
		if (Array.isArray(color)) {
			return `rgba(${color[0]},${color[1]},${color[2]},1)`; // Full opacity (1 instead of 0.7)
		} else {
			// If it's already a string, just use it
			return color;
		}
	} catch (e) {
		console.error('Error in viridisColor:', e);
		return 'rgba(0, 0, 255, 1)'; // Fallback color if something goes wrong, with full opacity
	}
}

/**
 * Get a bucket identifier for a given speed
 * @param speed The current speed in km/h
 * @param step The bucket size in km/h
 * @returns A string identifier for the bucket (e.g. "15-20")
 */
export function getSpeedBucket(speed: number, step = 5): string {
	const bucket = Math.floor(speed / step) * step;
	return `${bucket}-${bucket + step}`;
}

/**
 * Draw the spectrogram visualization on the canvas
 * @param canvas The canvas element to draw on
 * @param speedBuckets Map of speed buckets containing FFT data
 * @param bufferSize Size of the FFT buffer
 */
export function drawSpectrogram(
	canvas: HTMLCanvasElement,
	speedBuckets: Map<string, number[][]>,
	bufferSize: number
) {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const width = canvas.width;
	const height = canvas.height;
	ctx.clearRect(0, 0, width, height);
	// Add a slight overlap to prevent gaps between bars
	const barWidth = width / (bufferSize / 2) + 0.5;

	// Check if there are any keys before trying to get the max
	if (speedBuckets.size === 0) {
		console.log('No speed data available yet');
		return;
	}

	// Precompute mean spectra for each bucket
	const meanSpectra: { mean: number[]; bucketRange: number[] }[] = [];
	for (const [bucket, spectra] of speedBuckets.entries()) {
		const mean = spectra.reduce(
			(acc, spectrum) => {
				spectrum.forEach((value, index) => {
					acc[index] = (acc[index] || 0) + value / spectra.length;
				});
				return acc;
			},
			new Array(bufferSize / 2).fill(0)
		);
		meanSpectra.push({ mean, bucketRange: bucket.split('-').map(Number) });
	}

	// Compute global min/max (ignoring first 10%)
	const ignoreCount = Math.floor((bufferSize / 2) * 0.1);
	const allValues = meanSpectra.flatMap((obj) => obj.mean.slice(ignoreCount));
	const minSpectrum = Math.min(...allValues);
	const maxSpectrum = Math.max(...allValues);

	// DEBUG: Draw a background to see if canvas is working
	ctx.fillStyle = 'rgba(240, 240, 240, 0.5)';
	ctx.fillRect(0, 0, width, height);

	// Sort buckets by speed for proper display
	meanSpectra.sort((a, b) => a.bucketRange[0] - b.bucketRange[0]);

	// Instead of using speed to calculate positions directly,
	// divide the canvas height evenly among the available buckets
	const availableBuckets = meanSpectra.length;
	// Add a slight overlap to prevent gaps between rows
	const rowHeight = height / Math.max(availableBuckets, 5) + 0.5; // Ensure minimum divisions

	// Now draw the actual spectral data without gaps between rows
	meanSpectra.forEach((spectra, index) => {
		const mean = spectra.mean;

		// Calculate row position (from bottom, with index 0 at the bottom)
		// This distributes the rows evenly across the canvas height without gaps
		const y = Math.floor(height - (index + 1) * rowHeight);
		const bucketHeight = Math.ceil(rowHeight); // Use Math.ceil to prevent sub-pixel gaps

		// Draw the frequency data
		for (let i = 0; i < mean.length; i++) {
			const magnitude = mean[i];

			// Skip if no data or first few frequency bins (often just noise)
			if (isNaN(magnitude) || i < 2) continue;

			let norm = (magnitude - minSpectrum) / (maxSpectrum - minSpectrum);
			norm = Math.max(0, Math.min(1, norm));

			const color = viridisColor(norm);
			ctx.fillStyle = color;

			// Ensure we're drawing within canvas bounds
			if (y >= 0 && y + bucketHeight <= height) {
				// Use Math.ceil to prevent sub-pixel rendering gaps in both directions
				ctx.fillRect(Math.floor(i * barWidth), y, Math.ceil(barWidth), bucketHeight);
			}
		}
	});
}

/**
 * Generate test data for the spectrogram visualization
 * @param bufferSize Size of the FFT buffer
 * @returns Map of speed buckets with test FFT data
 */
export function generateTestData(bufferSize: number): Map<string, number[][]> {
	console.log('Adding test data for visualization');
	const speedBuckets = new Map<string, number[][]>();

	// Create sample data for testing - cover a wide range of speeds
	const testSpeeds = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
	testSpeeds.forEach((speed) => {
		const bucket = getSpeedBucket(speed);
		const testData = [];
		// Generate some fake FFT data
		for (let i = 0; i < 5; i++) {
			const fakeSpectrum = Array(bufferSize / 2)
				.fill(0)
				.map((_, i) => {
					// Create different frequency patterns based on speed
					// Simulate different resonances at different speeds
					let value = 0;

					// Main peak that changes with speed (simulates wheel resonance)
					value += (Math.exp(-Math.pow(i - speed / 3, 2) / 50) * speed) / 8;

					// Secondary peaks (simulates other vibration sources)
					if (speed > 35) {
						value += (Math.exp(-Math.pow(i - 15, 2) / 10) * (speed - 30)) / 20;
					}

					// High frequency noise (increases with speed)
					if (i > 30) {
						value += (Math.random() * 0.4 + 0.1) * (speed / 60);
					}

					return value;
				});
			testData.push(fakeSpectrum);
		}
		speedBuckets.set(bucket, testData);
	});

	return speedBuckets;
}
