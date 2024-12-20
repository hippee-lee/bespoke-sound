import { SoundObservable } from './event-observer';
import { AllEventTypes, FOCUS_EVENTS, MOUSE_EVENTS, KEYBOARD_EVENTS, POINTER_EVENTS } from './events';

interface CreateProxyOptions {
    observable?: SoundObservable;
    events?: AllEventTypes[]; // Accept only known event types
}

export function createProxy<T extends EventTarget>(target: T, options?: CreateProxyOptions): T {
    const { observable, events = [...FOCUS_EVENTS, ...MOUSE_EVENTS, ...KEYBOARD_EVENTS, ...POINTER_EVENTS] } = options || {};

    return new Proxy(target, {
        get(obj, prop) {
            if (prop === 'addEventListener') {
                return (
                    type: AllEventTypes, // Restrict to known event types
                    listener: EventListener,
                    options?: boolean | AddEventListenerOptions
                ) => {
                    if (events.includes(type)) {
                        const wrappedListener = (event: Event) => {
                            console.log('Event intercepted by Proxy:', type, event);
                            if (observable) {
                                observable.notify({ type, event });
                            }
                            listener.call(this, event);
                        };
                        return Reflect.apply(obj[prop as keyof T] as Function, obj, [type, wrappedListener, options]);
                    }
                    return Reflect.apply(obj[prop as keyof T] as Function, obj, [type, listener, options]);
                };
            }
            return Reflect.get(obj, prop);
        },
    });
}