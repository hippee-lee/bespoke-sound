import { createProxy } from './api/create-proxy';
import { SoundObservable } from './api/event-observer';
import { FOCUS_EVENTS, MOUSE_EVENTS, KEYBOARD_EVENTS, POINTER_EVENTS } from './api/events';
import * as Tone from "tone";

const polySynth = new Tone.PolySynth().toDestination();

// Turn the volume down by 10 dB
polySynth.volume.value = -10;

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

// Define the major and minor scales
const majorNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
const minorNotes = ['C4', 'D4', 'D#4', 'F4', 'G4', 'G#4', 'A#4', 'C5'];

// Function to map a value from one range to another
function mapValue(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

let nonClickCounter = 0;
// Add an observer to the observable
observable.addObserver((event) => {
    if (event.type === 'click') {
        // Play a single note for clicks
        polySynth.triggerAttackRelease('C6', '8n');
    } else {
        const { clientX, clientY } = event.event as MouseEvent;

        // Map the x-axis (width) to the major scale
        const xIndex = Math.floor(
            mapValue(clientX, 0, window.innerWidth, 0, majorNotes.length - 1)
        );

        // Map the y-axis (height) to the minor scale
        const yIndex = Math.floor(
            mapValue(clientY, 0, window.innerHeight, 0, minorNotes.length - 1)
        );

        // Get the corresponding notes
        const xNote = majorNotes[Math.min(xIndex, majorNotes.length - 1)];
        const yNote = minorNotes[Math.min(yIndex, minorNotes.length - 1)];

        // Play the notes together as a chord
        polySynth.triggerAttackRelease([xNote, yNote], '8n');
    }
});

// Export the observable and proxied window for extensibility
export { observable, proxiedWindow };