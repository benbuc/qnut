import colormap from 'colormap';
import FFT from 'fft.js';

const viridisColors = colormap({
	colormap: 'viridis',
	nshades: 256,
	format: 'rgba',
	alpha: 1
});

export const BUFFER_SIZE = 128;
const fft = new FFT(BUFFER_SIZE);

export function viridisColor(t: number): string {
	try {
		t = Math.max(0, Math.min(1, t));
		const idx = Math.round(t * 255);
		if (idx < 0 || idx >= viridisColors.length) {
			return 'rgba(0, 0, 255, 1)';
		}

		const color = viridisColors[idx];
		if (Array.isArray(color)) {
			return `rgba(${color[0]},${color[1]},${color[2]},1)`;
		}
		return color;
	} catch (e) {
		console.error('Error in viridisColor:', e);
		return 'rgba(0, 0, 255, 1)';
	}
}

export function confidenceColor(t: number): string {
	return `hsl(${Math.round(t * 120)}, 100%, 50%)`; // Red to green gradient
}

export function getSpeedBucket(speed: number, step = 5): string {
	const bucket = Math.floor(speed / step) * step;
	return `${bucket}-${bucket + step}`;
}

export function drawSpectrogram(canvas: HTMLCanvasElement, speedBuckets: Map<string, number[][]>) {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const width = canvas.width;
	const height = canvas.height;
	ctx.clearRect(0, 0, width, height);
	const barWidth = width / (BUFFER_SIZE / 2) + 0.5;

	ctx.fillStyle = viridisColor(0);
	ctx.fillRect(0, 0, width, height);

	if (speedBuckets.size === 0) return;

	const meanSpectra: { confidence: number; mean: number[]; bucketRange: number[] }[] = [];
	for (const [bucket, spectra] of speedBuckets.entries()) {
		const measurementCount = spectra.length || 0;
		const confidence = Math.min(measurementCount / 20, 1);

		const mean = spectra.reduce(
			(acc, spectrum) => {
				spectrum.forEach((value, index) => {
					acc[index] = (acc[index] || 0) + (value * confidence) / spectra.length;
				});
				return acc;
			},
			new Array(BUFFER_SIZE / 2).fill(0)
		);
		meanSpectra.push({ confidence, mean, bucketRange: bucket.split('-').map(Number) });
	}

	meanSpectra.sort((a, b) => a.bucketRange[0] - b.bucketRange[0]);

	// min and max for normalization
	const lowerFrequencyIgnoreCount = Math.floor((BUFFER_SIZE / 2) * 0.1);
	const lowerSpeedsIgnoreCount = Math.floor(meanSpectra.length * 0.3);
	const valuesOfInterest = meanSpectra
		.slice(lowerSpeedsIgnoreCount)
		.flatMap((obj) => obj.mean.slice(lowerFrequencyIgnoreCount));
	const minSpectrum = Math.min(...valuesOfInterest);
	const maxSpectrum = Math.max(...valuesOfInterest);

	const allSpeeds = meanSpectra.flatMap((s) => s.bucketRange);
	const maxDisplaySpeed = Math.max(...allSpeeds);
	const rowsNeeded = Math.ceil(maxDisplaySpeed / 5) + 1; // Assuming 5 km/h buckets
	const rowHeight = height / rowsNeeded;

	meanSpectra.forEach((spectra) => {
		const mean = spectra.mean;
		const confidence = spectra.confidence;
		const speedValue = spectra.bucketRange[0];

		const normalizedPosition = speedValue / maxDisplaySpeed;
		const y = height - normalizedPosition * height - rowHeight;

		for (let i = 0; i < mean.length; i++) {
			const magnitude = mean[i];
			if (isNaN(magnitude)) continue;

			// First two columns show confidence data
			if (i < 2) {
				ctx.fillStyle = confidenceColor(confidence);
			} else {
				let norm = (magnitude - minSpectrum) / (maxSpectrum - minSpectrum);
				norm = Math.max(0, Math.min(1, norm));
				ctx.fillStyle = viridisColor(norm);
			}

			if (y >= 0 && y + rowHeight <= height) {
				ctx.fillRect(
					Math.floor(i * barWidth),
					Math.floor(y),
					Math.ceil(barWidth),
					Math.ceil(rowHeight + 0.5)
				);
			}
		}
	});

	// Add speed labels as overlays
	if (meanSpectra.length > 0) {
		// Always start at 0 km/h, only make max speed dynamic
		const minSpeed = 0;
		const allSpeeds = meanSpectra.flatMap((s) => s.bucketRange);
		const maxSpeed = Math.max(...allSpeeds);

		// Configure text style with white font
		ctx.fillStyle = 'white';
		ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
		ctx.textBaseline = 'top';
		ctx.textAlign = 'left';

		// Max speed label (top-left) - white text, no background
		const maxSpeedText = `${maxSpeed} km/h`;
		ctx.fillText(maxSpeedText, 24, 8);

		// Min speed label (bottom-left) - white text, no background
		const minSpeedText = `${minSpeed} km/h`;
		const labelHeight = 16;
		const minSpeedY = height - labelHeight - 8;
		ctx.fillText(minSpeedText, 24, minSpeedY);
	}
}

export function generateTestData(): Map<string, number[][]> {
	// generate idealized representation of what to look out for in the spectrogram
	const speedBuckets = new Map<string, number[][]>();
	const testSpeeds = [...Array.from({ length: 32 }, (_, i) => i * 5)];

	testSpeeds.forEach((speed) => {
		const bucket = getSpeedBucket(speed);
		const testData = [];

		// Generate a variable number of measurements to demonstrate confidence levels
		// Higher speeds will have more measurements (to make test data more interesting)
		const measurementCount = Math.min(Math.floor(speed / 10) + 1, 25);

		for (let i = 0; i < measurementCount; i++) {
			const fakeAcceleration = Array(BUFFER_SIZE)
				.fill(0)
				.map((_, i) => {
					let value = 0;
					value += Math.sin((i / BUFFER_SIZE) * Math.PI * 2 * (speed / 4));
					value *= Math.pow(speed / 100, 2);

					value += Math.random() * 0.5;

					return value;
				});

			const fakeSpectrum = applyFFT(fakeAcceleration);
			testData.push(fakeSpectrum);
		}
		speedBuckets.set(bucket, testData);
	});

	return speedBuckets;
}

export function applyFFT(dataBuffer: number[]): number[] {
	// Apply Hann window function to reduce spectral leakage
	const windowed = dataBuffer.map(
		(val, i) => val * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (BUFFER_SIZE - 1)))
	);

	const input = new Array(BUFFER_SIZE).fill(0);
	const output = new Array(BUFFER_SIZE);

	for (let i = 0; i < BUFFER_SIZE; i++) input[i] = windowed[i];

	fft.realTransform(output, input);
	fft.completeSpectrum(output);

	return output
		.slice(0, BUFFER_SIZE / 2)
		.map((v, i) => Math.sqrt(output[2 * i] ** 2 + output[2 * i + 1] ** 2));
}
