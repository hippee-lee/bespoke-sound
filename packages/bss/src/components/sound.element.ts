import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { createProxy } from '@bss/sonic/api';
import { SoundObservable } from '@bss/sonic/api';
import { soundService } from '@bss/sonic/api';
import { AllEventTypes } from '../api/events';

export class BssSound extends LitElement {
    // Allow a custom theme to be passed
    @property({ type: Object }) theme: Partial<Record<AllEventTypes, string>> = {};

    private observable = new SoundObservable();

    connectedCallback() {
        super.connectedCallback();
        this.proxyChildElements();
        this.observable.addObserver(this.handleEvent.bind(this));
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        // Cleanup logic if necessary (e.g., remove proxies if dynamically added elements are supported)
    }

    private proxyChildElements() {
        const slot = this.shadowRoot?.querySelector('slot');
        const elements = slot?.assignedElements() || [];

        elements.forEach((el) => {
            // Proxy the element
            createProxy(el, {
                observable: this.observable,
                // theme: this.theme,
            });
        });
    }

    private handleEvent(event: { type: AllEventTypes; event: Event }) {
        // Delegate the event to the sound service
        soundService.handleEvent(event, this.theme);
    }

    render() {
        return html`<slot></slot>`;
    }
}

customElements.define('bss-sound', BssSound);