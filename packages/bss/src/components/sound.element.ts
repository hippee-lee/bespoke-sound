import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { themeManager } from '../themes/';
import * as Tone from 'tone';
import { SoundObservable } from '../api';

//TODO: installing tone and building out the pieces so I can test it in a sample page of the docs.

export class BssSound extends LitElement {
    @property({ type: Object }) observable!: SoundObservable;

    connectedCallback() {
        super.connectedCallback();
        // Subscribe to observable notifications
        this.observable.addObserver(this.handleEvent.bind(this));
        this.observable.addObserver(() => this.handleEvent(type));
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        // Unsubscribe to prevent memory leaks
        this.observable.removeObserver(this.handleEvent.bind(this));
    }

    handleEvent(type: string) {
        // Look up the sound for the event type
        const sound = themeManager.getSound(type);
        if (sound) {
            // Play the sound
            const synth = new Tone.Synth().toDestination();
            synth.triggerAttackRelease(sound, '8n');
        }
    }

    render() {
        return html`<slot></slot>`; // Pass-through slot for wrapped content
    }
}

customElements.define('bss-sound', BssSound);