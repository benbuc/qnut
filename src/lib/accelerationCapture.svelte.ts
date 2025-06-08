import FFT from 'fft.js';
import { getSpeedBucket } from './spectrogram';
import { t } from './i18n.svelte';

const DEFAULT_BUFFER_SIZE = 128;

export class AccelerationCapture {
	currentSpeed: number = $state(-1);
	speedBuckets: Map<string, number[][]> = $state(new Map());
	measuring: boolean = $state(false);
	errorMsg: string = $state('');
	warningMsg: string = $state('');
	bufferSize: number;

	private fft: FFT;
	private buffer: number[] = [];
	private motionListenerActive: boolean = false;
	private geoWatchId: number | null = null;

	constructor(bufferSize = DEFAULT_BUFFER_SIZE) {
		this.bufferSize = bufferSize;
		this.fft = new FFT(bufferSize);
	}

	private handleMotion = (event: DeviceMotionEvent) => {
		const acc = event.acceleration;
		if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

		const magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);
		this.buffer.push(magnitude);

		if (this.buffer.length < this.bufferSize) return;
		if (this.currentSpeed < 0) {
			this.buffer = [];
			return;
		}

		const windowed = this.buffer.map(
			(val, i) => val * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (this.bufferSize - 1)))
		);

		const input = new Array(this.bufferSize).fill(0);
		const output = new Array(this.bufferSize);

		for (let i = 0; i < this.bufferSize; i++) input[i] = windowed[i];

		this.fft.realTransform(output, input);
		this.fft.completeSpectrum(output);

		const magnitudes = output
			.slice(0, this.bufferSize / 2)
			.map((v, i) => Math.sqrt(output[2 * i] ** 2 + output[2 * i + 1] ** 2));

		const bucket = getSpeedBucket(this.currentSpeed);

		if (!this.speedBuckets.has(bucket)) {
			this.speedBuckets.set(bucket, []);
		}

		this.speedBuckets.get(bucket)!.push(magnitudes);
		this.buffer = [];

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
		}
	}

	private async requestPermissionAndListen(): Promise<boolean> {
		try {
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
					if (pos.coords.speed !== undefined && pos.coords.speed !== null) {
						this.currentSpeed = Math.max(0, pos.coords.speed * 3.6);
						this.warningMsg = '';
						this.errorMsg = '';
					} else {
						this.currentSpeed = -1;
						this.warningMsg = t('measure:error.noSpeed');
					}
				},
				(err) => {
					this.errorMsg = 'Geolocation error: ' + err.message;
					this.currentSpeed = -1;
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

	public clearData(): void {
		this.speedBuckets = new Map();
		this.buffer = [];
	}
}
