import { themeManager } from '../themes/';
import { defaultTheme} from "../themes/";
import * as Tone from 'tone';
import { SoundObserverEvent } from './event-observer';
import { AllEventTypes } from "@bss/sonic/api/events";

export class SoundService {
    private synth = new Tone.Synth().toDestination();

    // Play sound for a specific event
    handleEvent(event: SoundObserverEvent, overrideTheme: Partial<Record<AllEventTypes, string>>): void {
        const { type } = event;
        if(overrideTheme) {
            themeManager.applyCustomTheme(overrideTheme);
        }
        const sound = themeManager.getSound(type);
        if (sound) {
            // Play the sound
            this.synth.triggerAttackRelease(sound, '8n');
        }
        if (overrideTheme) {
            themeManager.resetTheme(defaultTheme);
        }
    }
}

// Export a singleton instance
export const soundService = new SoundService();