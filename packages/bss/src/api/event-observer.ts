export interface SoundObserverEvent {
    type: string; // The type of the event (click, hover, etc)
    event: Event; // The og DOM event
}

export type SoundObserverCallback = (event: SoundObserverEvent) => void;

export class SoundObservable {
    private observers: Set<SoundObserverCallback>;

    constructor() {
        this.observers = new Set();
    }

    addObserver(callback: SoundObserverCallback): void {
        console.log('Observer added:', callback);
        this.observers.add(callback);
    }

    removeObserver(callback: SoundObserverCallback): void {
        this.observers.delete(callback);
    }

    notify(event: SoundObserverEvent): void {
        console.log('Notifying observers:', event.type, event.event);
        this.observers.forEach(observer => {
            try {
                observer(event);
            } catch (error) {
                console.error('The Sound Observer failed to notify:', error);
            }
        })
    }
}