import colormap from 'colormap';

const viridisColors = colormap({
	colormap: 'viridis',
	nshades: 256,
	format: 'rgba',
	alpha: 1
});

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

export function getSpeedBucket(speed: number, step = 5): string {
	const bucket = Math.floor(speed / step) * step;
	return `${bucket}-${bucket + step}`;
}

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
	const barWidth = width / (bufferSize / 2) + 0.5;

	if (speedBuckets.size === 0) return;

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

	const ignoreCount = Math.floor((bufferSize / 2) * 0.1);
	const allValues = meanSpectra.flatMap((obj) => obj.mean.slice(ignoreCount));
	const minSpectrum = Math.min(...allValues);
	const maxSpectrum = Math.max(...allValues);

	ctx.fillStyle = 'rgba(240, 240, 240, 0.5)';
	ctx.fillRect(0, 0, width, height);

	meanSpectra.sort((a, b) => a.bucketRange[0] - b.bucketRange[0]);

	const availableBuckets = meanSpectra.length;
	const rowHeight = height / Math.max(availableBuckets, 5) + 0.5;

	meanSpectra.forEach((spectra, index) => {
		const mean = spectra.mean;
		const y = Math.floor(height - (index + 1) * rowHeight);
		const bucketHeight = Math.ceil(rowHeight);

		for (let i = 0; i < mean.length; i++) {
			const magnitude = mean[i];
			if (isNaN(magnitude) || i < 2) continue;

			let norm = (magnitude - minSpectrum) / (maxSpectrum - minSpectrum);
			norm = Math.max(0, Math.min(1, norm));

			ctx.fillStyle = viridisColor(norm);

			if (y >= 0 && y + bucketHeight <= height) {
				ctx.fillRect(Math.floor(i * barWidth), y, Math.ceil(barWidth), bucketHeight);
			}
		}
	});
}

export function generateTestData(bufferSize: number): Map<string, number[][]> {
	const speedBuckets = new Map<string, number[][]>();
	const testSpeeds = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

	testSpeeds.forEach((speed) => {
		const bucket = getSpeedBucket(speed);
		const testData = [];

		for (let i = 0; i < 5; i++) {
			const fakeSpectrum = Array(bufferSize / 2)
				.fill(0)
				.map((_, i) => {
					let value = 0;
					value += (Math.exp(-Math.pow(i - speed / 3, 2) / 50) * speed) / 8;

					if (speed > 35) {
						value += (Math.exp(-Math.pow(i - 15, 2) / 10) * (speed - 30)) / 20;
					}

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
