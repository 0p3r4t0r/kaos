import { 
    DURATION_EVENTS,
    ACTION_EVENTS,
    register,
    unregister,
} from './events';

import { CONTEXTS, getContext } from 'input/state';

// -----------------------------------------------------------------------------
// DEFAULT MAPPINGS
// -----------------------------------------------------------------------------

const MAPPINGS = {
    [CONTEXTS.MENU]: {
        'w': ACTION_EVENTS.UP,
        's': ACTION_EVENTS.DOWN,
        'd': ACTION_EVENTS.RIGHT,
        'a': ACTION_EVENTS.LEFT,
        'Enter': ACTION_EVENTS.ACCEPT,
        'Backspace': ACTION_EVENTS.BACK,
    },
    [CONTEXTS.GAME]: {
        'w': DURATION_EVENTS.UP,
        's': DURATION_EVENTS.DOWN,
        'd': DURATION_EVENTS.RIGHT,
        'a': DURATION_EVENTS.LEFT,
        'j': DURATION_EVENTS.ROTATE_CC,
        'k': DURATION_EVENTS.ROTATE,

        'u': ACTION_EVENTS.RED,
        'i': ACTION_EVENTS.PURPLE,
        'o': ACTION_EVENTS.GREEN,
        'p': ACTION_EVENTS.CYAN,
        ' ': ACTION_EVENTS.CYCLE_COLOR,
        'Enter': ACTION_EVENTS.PAUSE,
    },
};


// -----------------------------------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------------------------------

window.addEventListener('keydown', event => {
    let contextMapping = MAPPINGS[getContext()];
    if (event.key in contextMapping) {
        let registerId = 'key' + event.key;
        register(contextMapping[event.key], registerId);
    }
});

window.addEventListener('keyup', event => {
    let contextMapping = MAPPINGS[getContext()];
    if (event.key in contextMapping) {
        let registerId = 'key' + event.key;
        unregister(contextMapping[event.key], registerId);
    }
});
