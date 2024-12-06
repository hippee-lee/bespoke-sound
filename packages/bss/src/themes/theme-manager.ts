export type SoundTheme = Record<string, string>;

class ThemeManager {
    private theme: SoundTheme;

    constructor(initialTheme: SoundTheme) {
        this.theme = { ...initialTheme };
    }

    // Get the sound for a specific event type
    getSound(eventType: string): string | undefined {
        return this.theme[eventType];
    }

    // Update the theme with custom mappings
    applyCustomTheme(customTheme: SoundTheme): void {
        this.theme = { ...this.theme, ...customTheme };
    }

    // Reset to the default theme
    resetTheme(defaultTheme: SoundTheme): void {
        this.theme = { ...defaultTheme };
    }
}

// Export a default instance of the theme manager
import { defaultTheme } from './default';
export const themeManager = new ThemeManager(defaultTheme);