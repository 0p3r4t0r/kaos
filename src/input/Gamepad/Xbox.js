import {
    DURATION_EVENTS,
    ACTION_EVENTS,
} from '../events';
import { CONTEXTS } from 'input/state';

// -----------------------------------------------------------------------------
// STATE / CONSTANTS
// -----------------------------------------------------------------------------

export const REGEX = /.*X-Box.*/;


// -----------------------------------------------------------------------------
// BUTTON EVENT MAPPINGS
// -----------------------------------------------------------------------------

export const BUTTONS = {
    [CONTEXTS.MENU]: {
        0: ACTION_EVENTS.ACCEPT, // A
        1: ACTION_EVENTS.BACK, // B
    },
    [CONTEXTS.GAME]: {
        0: ACTION_EVENTS.GREEN, // A
        1: ACTION_EVENTS.PURPLE, // B
        2: ACTION_EVENTS.CYAN, // X
        3: ACTION_EVENTS.RED, // Y
        4: DURATION_EVENTS.ROTATE_CC, // LB
        5: DURATION_EVENTS.ROTATE, // RB
        7: ACTION_EVENTS.PAUSE, // START
    },
};


// -----------------------------------------------------------------------------
// TRIGGER EVENT MAPPINGS
// -----------------------------------------------------------------------------

export const TRIGGERS = {
    [CONTEXTS.MENU]: {
        2: ACTION_EVENTS.LEFT, // L_TRIGGER
        5: ACTION_EVENTS.RIGHT, // R_TRIGGER
    },
    [CONTEXTS.GAME]: {
        2: DURATION_EVENTS.ROTATE_CC, // L_TRIGGER
        5: DURATION_EVENTS.ROTATE, // R_TRIGGER
    },
};


// -----------------------------------------------------------------------------
// AXIS GROUPINGS
// -----------------------------------------------------------------------------

export const AXES = {
    [CONTEXTS.MENU]: {
        0: { // L_STICK_X
            [-1]: ACTION_EVENTS.LEFT,
            [1]: ACTION_EVENTS.RIGHT,
        },
        1: { // L_STICK_Y
            [-1]: ACTION_EVENTS.UP,
            [1]: ACTION_EVENTS.DOWN,
        },
        3: { // R_STICK_X
            [-1]: ACTION_EVENTS.LEFT,
            [1]: ACTION_EVENTS.RIGHT,
        },
        4: { // R_STICK_Y
            [-1]: ACTION_EVENTS.UP,
            [1]: ACTION_EVENTS.DOWN,
        },
        6: { // DPAD_X
            [-1]: ACTION_EVENTS.LEFT,
            [1]: ACTION_EVENTS.RIGHT,
        },
        7: { // DPAD_Y
            [-1]: ACTION_EVENTS.UP,
            [1]: ACTION_EVENTS.DOWN,
        },
    },
    [CONTEXTS.GAME]: {
        0: { // L_STICK_X
            [-1]: DURATION_EVENTS.LEFT,
            [1]: DURATION_EVENTS.RIGHT,
        },
        1: { // L_STICK_Y
            [-1]: DURATION_EVENTS.UP,
            [1]: DURATION_EVENTS.DOWN,
        },
        3: { // R_STICK_X
            [-1]: DURATION_EVENTS.LEFT,
            [1]: DURATION_EVENTS.RIGHT,
        },
        4: { // R_STICK_Y
            [-1]: DURATION_EVENTS.UP,
            [1]: DURATION_EVENTS.DOWN,
        },
        6: { // DPAD_X
            [-1]: DURATION_EVENTS.LEFT,
            [1]: DURATION_EVENTS.RIGHT,
        },
        7: { // DPAD_Y
            [-1]: DURATION_EVENTS.UP,
            [1]: DURATION_EVENTS.DOWN,
        },
    },
};
