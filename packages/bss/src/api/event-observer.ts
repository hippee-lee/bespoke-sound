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
        this.observers.add(callback);
    }

    removeObserver(callback: SoundObserverCallback): void {
        this.observers.delete(callback);
    }

    notify(event: SoundObserverEvent): void {
        this.observers.forEach(observer => {
            try {
                observer(event);
            } catch (error) {
                console.error('The SOund Observer failed to notify:', error);
            }
        })
    }
}