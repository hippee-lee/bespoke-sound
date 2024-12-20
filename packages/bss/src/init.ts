import { createProxy } from './api/create-proxy';
import { SoundObservable } from './api/event-observer';
import { FOCUS_EVENTS, MOUSE_EVENTS, KEYBOARD_EVENTS, POINTER_EVENTS } from './api/events';
import * as Tone from "tone";

const synth = new Tone.Synth().toDestination();

// Singleton for SoundObservable
const observable = new SoundObservable();

// Automatically proxy the `window` object
const proxiedWindow = createProxy(window, {
    observable,
    events: [...FOCUS_EVENTS, ...MOUSE_EVENTS, ...KEYBOARD_EVENTS, ...POINTER_EVENTS],
});

// Register event listeners on the proxied window
[...FOCUS_EVENTS, ...MOUSE_EVENTS, ...KEYBOARD_EVENTS, ...POINTER_EVENTS].forEach((eventType) => {
    proxiedWindow.addEventListener(eventType, () => {
        // console.log(`Event listener added: ${eventType}`);
    });
});

// Log all observed events from the Observable
observable.addObserver((event) => {
    if(event.type === 'click') {
        synth.triggerAttackRelease('C4', "8n");
        console.log(`Event observed by Observable: ${event.type}`, event.event);
    }
});

// Export the observable and proxied window for extensibility
export { observable, proxiedWindow };