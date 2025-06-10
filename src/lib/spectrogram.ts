import colormap from 'colormap';
import FFT from 'fft.js';
import { settings } from './settings.svelte';
import { MEASUREMENTS_PER_ROW } from './accelerationCapture.svelte';

const DELTA_V_PER_BUCKET = 5; // km/h

const viridisColors = colormap({
	colormap: 'viridis',
	nshades: 256,
	format: 'rgba',
	alpha: 1
});

export const BUFFER_SIZE = 128;
const fft = new FFT(BUFFER_SIZE);

export function viridisColor(t: number): string {
	t = Math.max(0, Math.min(1, t));
	const color = viridisColors[Math.round(t * 255)];
	return `rgba(${color[0]},${color[1]},${color[2]},1)`;
}

export function confidenceColor(t: number): string {
	return `hsl(${Math.round(t * 120)}, 100%, 50%)`; // Red to green gradient
}

export function getSpeedBucket(speed: number): string {
	const bucket = Math.floor(speed / DELTA_V_PER_BUCKET) * DELTA_V_PER_BUCKET;
	return `${bucket}-${bucket + DELTA_V_PER_BUCKET}`;
}

function calculateMedian(values: number[]): number {
	if (values.length === 0) return 0;
	const sorted = [...values].sort((a, b) => a - b);
	const middle = Math.floor(sorted.length / 2);
	return values.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

export function drawSpectrogram(canvas: HTMLCanvasElement, speedBuckets: Map<string, number[][]>) {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const width = canvas.width;
	const height = canvas.height;
	ctx.clearRect(0, 0, width, height);
	const barWidth = width / (BUFFER_SIZE / 2);

	ctx.fillStyle = viridisColor(0);
	ctx.fillRect(0, 0, width, height);

	if (speedBuckets.size === 0) return;

	const spectraResults: { confidence: number; values: number[]; bucketRange: number[] }[] = [];
	for (const [bucket, spectra] of speedBuckets.entries()) {
		const measurementCount = spectra.length || 0;
		const confidence = Math.min(measurementCount / MEASUREMENTS_PER_ROW, 1);

		if (settings.useMedian) {
			const medians = new Array(BUFFER_SIZE / 2).fill(0);
			const frequencyColumns: number[][] = Array.from({ length: BUFFER_SIZE / 2 }, () => []);
			spectra.forEach((spectrum) => {
				spectrum.forEach((value, index) => {
					frequencyColumns[index].push(value);
				});
			});
			frequencyColumns.forEach((values, index) => {
				medians[index] = calculateMedian(values);
			});
			spectraResults.push({
				confidence,
				values: medians,
				bucketRange: bucket.split('-').map(Number)
			});
		} else {
			const mean = spectra.reduce(
				(acc, spectrum) => {
					spectrum.forEach((value, index) => {
						acc[index] = (acc[index] || 0) + value / spectra.length;
					});
					return acc;
				},
				new Array(BUFFER_SIZE / 2).fill(0)
			);
			spectraResults.push({ confidence, values: mean, bucketRange: bucket.split('-').map(Number) });
		}
	}

	spectraResults.sort((a, b) => a.bucketRange[0] - b.bucketRange[0]);

	/**
	 * Normalization Strategy
	 *
	 * We have two approaches for color normalization:
	 * 1. Global normalization - The entire spectrogram uses the same min/max values,
	 *    making it easier to compare intensity across different speeds
	 * 2. Per-speed-line normalization - Each speed line has its own min/max values,
	 *    which enhances details at each speed but makes direct comparison harder
	 */

	const lowerFrequencyIgnoreCount = Math.floor((BUFFER_SIZE / 2) * 0.1);
	const lowerSpeedsIgnoreCount = Math.floor(spectraResults.length * 0.3);

	// Calculate min/max for global normalization
	let globalMinSpectrum = 0;
	let globalMaxSpectrum = 0;
	if (!settings.normalizePerSpeedLine) {
		const valuesOfInterest = spectraResults
			.slice(lowerSpeedsIgnoreCount)
			.flatMap((obj) => obj.values.slice(lowerFrequencyIgnoreCount));
		globalMinSpectrum = Math.min(...valuesOfInterest);
		globalMaxSpectrum = Math.max(...valuesOfInterest);
	}

	const allSpeeds = spectraResults.flatMap((s) => s.bucketRange);
	const maxDisplaySpeed = Math.max(...allSpeeds);
	const rowsNeeded = Math.ceil(maxDisplaySpeed / DELTA_V_PER_BUCKET);
	const rowHeight = height / rowsNeeded;

	spectraResults.forEach((spectrum) => {
		const values = spectrum.values;
		const confidence = spectrum.confidence;
		const speedValue = spectrum.bucketRange[0];

		const normalizedPosition = speedValue / maxDisplaySpeed;
		const y = height - normalizedPosition * height - rowHeight;

		// For per-line normalization, calculate min/max for this speed line
		let lineMinSpectrum = 0;
		let lineMaxSpectrum = 0;
		if (settings.normalizePerSpeedLine) {
			const lineValuesOfInterest = values.slice(lowerFrequencyIgnoreCount);
			lineMinSpectrum = Math.min(...lineValuesOfInterest);
			lineMaxSpectrum = Math.max(...lineValuesOfInterest);
		}

		let minValue, maxValue;
		if (settings.normalizePerSpeedLine) {
			minValue = lineMinSpectrum;
			maxValue = lineMaxSpectrum;
		} else {
			minValue = globalMinSpectrum;
			maxValue = globalMaxSpectrum;
		}

		for (let i = 0; i < values.length; i++) {
			const freqBin = values[i];
			if (isNaN(freqBin)) continue;

			// First two columns show confidence data
			if (i < 2) {
				ctx.fillStyle = confidenceColor(confidence);
			} else {
				// Prevent division by zero
				const range = maxValue - minValue || 1;
				let norm = (freqBin - minValue) / range;
				norm = Math.max(0, Math.min(1, norm));
				// Apply confidence scaling so rows start with lower intensity
				norm *= confidence;
				ctx.fillStyle = viridisColor(norm);
			}

			ctx.fillRect(
				Math.floor(i * barWidth),
				Math.floor(y),
				Math.ceil(barWidth + 0.5),
				Math.ceil(rowHeight + 0.5)
			);
		}
	});

	// Add speed labels as overlays
	if (spectraResults.length > 0) {
		const minSpeed = 0;

		ctx.fillStyle = 'white';
		ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
		ctx.textBaseline = 'top';
		ctx.textAlign = 'left';

		const maxSpeedText = `${maxDisplaySpeed} km/h`;
		ctx.fillText(maxSpeedText, 24, 8);

		const minSpeedText = `${minSpeed} km/h`;
		ctx.fillText(minSpeedText, 24, height - 24);
	}
}

export function generateTestData(): Map<string, number[][]> {
	// generate idealized representation of what to look out for in the spectrogram
	const speedBuckets = new Map<string, number[][]>();
	const testSpeeds = [...Array.from({ length: 32 }, (_, i) => i * DELTA_V_PER_BUCKET)];

	testSpeeds.forEach((speed) => {
		const bucket = getSpeedBucket(speed);
		const testData = [];

		// Generate a variable number of measurements to demonstrate confidence levels
		// Higher speeds will have more measurements (to make test data more interesting)
		const measurementCount = Math.min(Math.floor(speed / 2) + 1, 50);

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
		// TODO: Hann window coefficients could be pre-calculated for performance
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
