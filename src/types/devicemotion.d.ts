// Add type definitions for DeviceMotionEvent API
interface DeviceMotionEventStatic extends DeviceMotionEvent {
	new (type: string, eventInitDict?: DeviceMotionEventInit): DeviceMotionEvent;
	readonly prototype: DeviceMotionEvent;
	requestPermission?(): Promise<'granted' | 'denied' | 'default'>;
}

declare global {
	interface Window {
		DeviceMotionEvent: {
			new (type: string, eventInitDict?: DeviceMotionEventInit): DeviceMotionEvent;
			readonly prototype: DeviceMotionEvent;
			requestPermission?(): Promise<'granted' | 'denied' | 'default'>;
		};
	}
}
