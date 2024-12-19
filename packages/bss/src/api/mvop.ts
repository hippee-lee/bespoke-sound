export function observeAllEvents() {
    const logEvent = (event: Event) => {
        console.log(`Event type: ${event.type}`, event.target);
    };

    // Attach listeners for all event types
    const allEventTypes = [
        'click', 'dblclick', 'focus', 'blur', 'keydown', 'keyup', 'mouseover', 'mouseout',
        'mousedown', 'mouseup', 'input', 'change', 'pointerdown', 'pointerup', 'scroll'
        // Add more types as needed
    ];

    allEventTypes.forEach((type) => {
        window.addEventListener(type, logEvent);
    });

    return () => {
        // Cleanup function to remove all listeners
        allEventTypes.forEach((type) => {
            window.removeEventListener(type, logEvent);
        });
    };
}