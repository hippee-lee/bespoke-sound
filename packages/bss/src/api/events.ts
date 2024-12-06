export type FocusEventTypes = 'blur' | 'focus' | 'focusin' | 'focusout';
export type KeyboardEventTypes = 'keydown' | 'keypress' | 'keyup';
export type MouseEventTypes =
    | 'auxclick'
    | 'click'
    | 'contextmenu'
    | 'dblclick'
    | 'mousedown'
    | 'mouseenter'
    | 'mouseleave'
    | 'mousemove'
    | 'mouseout'
    | 'mouseover'
    | 'mouseup';
export type PointerEventTypes =
    | 'pointerdown'
    | 'pointerenter'
    | 'pointerleave'
    | 'pointermove'
    | 'pointerout'
    | 'pointerover'
    | 'pointerup';

// Grouped Categories
export type AllEventTypes =
    | FocusEventTypes
    | KeyboardEventTypes
    | MouseEventTypes
    | PointerEventTypes;

// Focus Events
export const FOCUS_EVENTS: FocusEventTypes[] = ['blur', 'focus', 'focusin', 'focusout'];

// Keyboard Events
export const KEYBOARD_EVENTS: KeyboardEventTypes[] = ['keydown', 'keypress', 'keyup'];

// Mouse Events
export const MOUSE_EVENTS: MouseEventTypes[] = [
    'auxclick',
    'click',
    'contextmenu',
    'dblclick',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup'
];

// Pointer Events
export const POINTER_EVENTS: PointerEventTypes[] = [
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointermove',
    'pointerout',
    'pointerover',
    'pointerup'
];