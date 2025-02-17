// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------

/*
 * Event types. The 'native' event type denotes an event that was not one of our
 * custom events (ex. keypress). The types are also used as custom event prefixes.
 */
export const TYPE_DURATION = 'duration';
export const TYPE_ACTION = 'action';
export const TYPE_NATIVE = 'native';

/*
 * Duration events are events with a start-end lifecycle, where the game state
 * will have to monitor/adjust parameter based on whether a duration event is
 * currently active. Each duration event fires a '-start' event when the input
 * is first registered and an '-end' event when the input device has returned
 * to its natural state. Lifecycle indicators, such as '-start' and '-end', are
 * suffixed to each duration event.
 *
 * Ex) When the player wants to rotate, they may hold down a button to perform a
 * constant rotation. The game needs to know when the player wants to start
 * rotating and constantly apply rotations until indicated to stop. Thus, the
 * game will listen for the 'duration-rotate-start' event and apply rotations
 * until the 'duration-rotate-end' event is received.
 */
export const DURATION_EVENTS = Object.freeze({
    UP: TYPE_DURATION + '-up',
    DOWN: TYPE_DURATION + '-down',
    LEFT: TYPE_DURATION + '-left',
    RIGHT: TYPE_DURATION + '-right',
    ROTATE: TYPE_DURATION + '-rotate',
    ROTATE_CC: TYPE_DURATION + '-rotate-cc',
});

/*
 * Some duration events should override others. For example, if a player is
 * moving up with the keyboard and presses down simultaneously, then the two
 * actions should not cancel out, but rather the latter takes precedent. This
 * array maps events to other events they may override.
 *
 * NOTE: Originally, each event mapped to an array, but in the end no array had
 * more than one event, so to save a little time and simplify our functions
 * below, we just map one event to another.
 *
 * NOTE: It's worth noting that no two duration events have the same negation,
 * nor do we have any chains of negations (ex. a negates b negates c). If either
 * of these ever becomes the case, the register/unregister functions below will
 * need to be modified accordingly.
 */
export const DURATION_EVENT_NEGATIONS = Object.freeze({
    [DURATION_EVENTS.UP]: DURATION_EVENTS.DOWN,
    [DURATION_EVENTS.DOWN]: DURATION_EVENTS.UP,
    [DURATION_EVENTS.LEFT]: DURATION_EVENTS.RIGHT,
    [DURATION_EVENTS.RIGHT]: DURATION_EVENTS.LEFT,
    [DURATION_EVENTS.ROTATE]: DURATION_EVENTS.ROTATE_CC,
    [DURATION_EVENTS.ROTATE_CC]: DURATION_EVENTS.ROTATE,
});

/*
 * Action events are one-time player input events that lack a start-end
 * lifecycle. They are emitted whenever the input is initially registered (on
 * 'keydown' events for keyboard or the first frame a gamepad button is pressed)
 * and cannot be repeated until the input device has returned to its natural
 * state (on 'keyup' for keyboard or after the gamepad button has detected a
 * non-pressed button state).
 */
export const ACTION_EVENTS = Object.freeze({
    // Menu
    UP: TYPE_ACTION + '-up',
    DOWN: TYPE_ACTION + '-down',
    LEFT: TYPE_ACTION + '-left',
    RIGHT: TYPE_ACTION + '-right',
    ACCEPT: TYPE_ACTION + '-accept',
    BACK: TYPE_ACTION + '-back',

    // Game
    RED: TYPE_ACTION + '-red',
    PURPLE: TYPE_ACTION + '-purple',
    GREEN: TYPE_ACTION + '-green',
    CYAN: TYPE_ACTION + '-cyan',
    CYCLE_COLOR: TYPE_ACTION + '-cycle-color',
    PAUSE: TYPE_ACTION + '-pause',
});

// -----------------------------------------------------------------------------
// INTERNAL STATE
// -----------------------------------------------------------------------------

/*
 * Event buffers. This allows us to store/restore overridden events, as well as
 * prevent certain events from over-firing (ex. a button being pressed and held).
 */
let _restoreEventBuffer = {};
let _activeEventBuffer = {};

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

/*
 * Clear the event buffers. Useful when changing context.
 */
export function clear() {
    _restoreEventBuffer = {};
    _activeEventBuffer = {};
}

/*
 * Registering events couples event types w/ custom logic when an event should
 * be started. For example, if a duration event fires and overrides another
 * event, we need to mark the latter as inactive and restore it later.
 */
export function register(event, id, debug = false) {
    if (_activeEventBuffer[event] === undefined)
        _activeEventBuffer[event] = [];
    if (_restoreEventBuffer[event] === undefined)
        _restoreEventBuffer[event] = [];

    let activeEventIds = _activeEventBuffer[event];
    let restoreEventIds = _restoreEventBuffer[event];

    // Do not re-register events.
    if (activeEventIds.includes(id) || restoreEventIds.includes(id))
        return;

    // Nothing to do if event is not a valid type.
    let eventType = _getType(event);
    if (![TYPE_DURATION, TYPE_ACTION].includes(eventType))
        return;

    // Add the event
    if (restoreEventIds.length)
        activeEventIds = restoreEventIds;
    activeEventIds.push(id);

    if (eventType == TYPE_DURATION) {
        let negateEvent = DURATION_EVENT_NEGATIONS[event];
        let negateEventIds = _activeEventBuffer[negateEvent];

        if (negateEventIds && negateEventIds.length) {
            // Event has been overridden, store for later.
            _restoreEventBuffer[negateEvent] = negateEventIds;
            _activeEventBuffer[negateEvent] = [];
            window.dispatchEvent(new Event(negateEvent + '-end'));
        }

        window.dispatchEvent(new Event(event + '-start'));
    } else {
        window.dispatchEvent(new Event(event));
    }
}

/*
 * Unregistering events couples event types w/ custom logic when an event should
 * be ended. For example, if a duration event ends and it has previously
 * overridden another event, then that event should be restored.
 */
export function unregister(event, id) {
    if (_activeEventBuffer[event] === undefined)
        _activeEventBuffer[event] = [];
    if (_restoreEventBuffer[event] === undefined)
        _restoreEventBuffer[event] = [];

    let activeEventIds = _activeEventBuffer[event];
    let restoreEventIds = _restoreEventBuffer[event];

    // If stored event, simply pop. The '-end' event has already fired and
    // there is nothing to restore.
    let restoreIndex = restoreEventIds.indexOf(id);
    if (restoreIndex != -1) {
        _smartPop(restoreEventIds, restoreIndex);
        return;
    }

    // Nothing to do if event is not a valid type.
    let eventType = _getType(event);
    if (![TYPE_DURATION, TYPE_ACTION].includes(eventType))
        return;

    // Nothing to do if event is not active.
    let activeIndex = activeEventIds.indexOf(id);
    if (activeIndex == -1)
        return;

    _smartPop(activeEventIds, activeIndex);

    if (eventType == TYPE_DURATION) {
        window.dispatchEvent(new Event(event + '-end'));

        let negateEvent = DURATION_EVENT_NEGATIONS[event];
        let negateEventIds = _restoreEventBuffer[negateEvent];

        // Restore the previously stored event to active.
        if (!activeEventIds.length && negateEventIds && negateEventIds.length) {
            _activeEventBuffer[negateEvent] = negateEventIds;
            _restoreEventBuffer[negateEvent] = [];
            window.dispatchEvent(new Event(negateEvent + '-start'));
        }
    }
}

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

/*
 * For arrays where the order is not important, delete the element by copying
 * the last value to the deleted index and pop from the end.
 */
function _smartPop(array, index) {
    array[index] = array[array.length - 1];
    array.pop();
}

/*
 * Get the event type based off prefix.
 */
function _getType(event) {
    if (event.substr(0, TYPE_DURATION.length) == TYPE_DURATION)
        return TYPE_DURATION;
    else if (event.substr(0, TYPE_ACTION.length) == TYPE_ACTION)
        return TYPE_ACTION;
    return TYPE_NATIVE;
}
