import { getSpeedBucket, applyFFT, BUFFER_SIZE } from './spectrogram';
import { t } from './i18n.svelte';

export const GPS_ACCURACY_THRESHOLD = 15; // Accuracy threshold for GPS in meters
export const MEASUREMENTS_PER_ROW = 50; // Number of measurements per row in the spectrogram

export class AccelerationCapture {
	currentSpeed: number = $state(-1);
	gpsAccuracy: number = $state(-1);
	speedBuckets: Map<string, number[][]> = $state(new Map());
	measuring: boolean = $state(false);
	errorMsg: string = $state('');
	warningMsg: string = $state('');

	private buffer: number[] = [];
	private motionListenerActive: boolean = false;
	private geoWatchId: number | null = null;

	private handleMotion = (event: DeviceMotionEvent) => {
		const acc = event.acceleration;
		if (!acc || acc.x === null || acc.y === null || acc.z === null) return;
		if (this.currentSpeed < 0 || this.gpsAccuracy > GPS_ACCURACY_THRESHOLD) {
			// Discard measurement if speed is unavailable or GPS accuracy is too low
			this.buffer = [];
			return;
		}

		// TODO: For future algorithmic improvements
		// using the magnitude so early loses a lot of information, right?
		// Consider how a rotating vibration would result in a constant magnitude
		// while the individual axis clearly show vibrations.
		// An idea would be to take the FFT of each axis separately,
		// and combine them afterwards.
		const magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);
		this.buffer.push(magnitude);

		if (this.buffer.length < BUFFER_SIZE) return;

		const spectrum = applyFFT(this.buffer);

		const bucket = getSpeedBucket(this.currentSpeed);

		if (!this.speedBuckets.has(bucket)) {
			this.speedBuckets.set(bucket, []);
		}

		this.speedBuckets.get(bucket)!.push(spectrum);

		// Sort the bucket based on the first column (index 0) of each measurement
		// Lower values in the first column indicate better quality.
		// Based on the assumption that a constant acceleration will skew the measurement
		// and constant acceleration will result in a higher first column (DC column) after FFT
		const sortedBucket = this.speedBuckets.get(bucket)!.sort((a, b) => a[0] - b[0]);

		// Only keep best measurements
		if (sortedBucket.length > MEASUREMENTS_PER_ROW) {
			sortedBucket.splice(MEASUREMENTS_PER_ROW);
		}

		this.buffer = [];

		// TODO: test whether this is needed for reactivity or obsolete in Svelte 5
		this.speedBuckets = new Map(this.speedBuckets);
	};

	private resetMessages() {
		this.errorMsg = '';
		this.warningMsg = '';
	}

	public async startMeasuring(): Promise<boolean> {
		if (this.measuring) return true;

		this.resetMessages();

		if (!('geolocation' in navigator)) {
			this.errorMsg = t('measure:error.geolocation');
			return false;
		}

		if (typeof window.DeviceMotionEvent === 'undefined') {
			this.errorMsg = t('measure:error.devicemotion');
			return false;
		}

		try {
			const result = await this.requestPermissionAndListen();

			if (result) {
				this.measuring = true;

				// Notify telemetry of new measurement
				fetch('/api/metrics/increment', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ metric: 'measurements', type: 'acceleration' })
				}).catch((e) => console.error('Failed to send metrics:', e));
			}

			return result;
		} catch (error) {
			this.errorMsg = `Error: ${error}`;
			return false;
		}
	}

	public stopMeasuring(): void {
		this.measuring = false;

		if (this.motionListenerActive) {
			window.removeEventListener('devicemotion', this.handleMotion);
			this.motionListenerActive = false;
		}

		if (this.geoWatchId !== null) {
			navigator.geolocation.clearWatch(this.geoWatchId);
			this.geoWatchId = null;
			this.gpsAccuracy = -1;
		}
	}

	private async requestPermissionAndListen(): Promise<boolean> {
		try {
			// TODO: This type casting is brittle - consider using proper types
			const DeviceMotionEventWithPermission = window.DeviceMotionEvent as unknown as {
				requestPermission?: () => Promise<string>;
			};

			if (typeof DeviceMotionEventWithPermission.requestPermission === 'function') {
				const response = await DeviceMotionEventWithPermission.requestPermission();
				if (response !== 'granted') {
					this.errorMsg = t('measure:error.motionPermissionDenied');
					return false;
				}
			}

			window.addEventListener('devicemotion', this.handleMotion, true);
			this.motionListenerActive = true;

			this.geoWatchId = navigator.geolocation.watchPosition(
				(pos) => {
					this.gpsAccuracy = pos.coords.accuracy;

					if (pos.coords.speed !== undefined && pos.coords.speed !== null) {
						// Convert to km/h
						// TODO: Configurable for international users
						this.currentSpeed = Math.max(0, pos.coords.speed * 3.6);

						if (pos.coords.accuracy > GPS_ACCURACY_THRESHOLD) {
							this.warningMsg = t('measure:error.noSpeed');
						} else {
							this.warningMsg = '';
							this.errorMsg = '';
						}
					} else {
						this.currentSpeed = -1;
						this.warningMsg = t('measure:error.noSpeed');
					}
				},
				(err) => {
					this.errorMsg = 'Geolocation error: ' + err.message;
					this.currentSpeed = -1;
					this.gpsAccuracy = -1;
				},
				{
					enableHighAccuracy: true,
					maximumAge: 0,
					timeout: 5000
				}
			);

			return true;
		} catch (error) {
			this.errorMsg = `Error requesting motion permission: ${error}`;
			return false;
		}
	}
}
