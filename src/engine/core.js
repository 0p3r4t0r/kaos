import { COLORS, JOYSTICK_RADIUS, IS_TOUCH_DEVICE, HUD_HEIGHT } from 'globals';
import { DURATION_EVENTS, ACTION_EVENTS } from 'input/events';
import { reactive } from 'vue';

import * as modes from './modes';
import * as orbGenerator from './orbGenerator';
import Player from './player';

// -----------------------------------------------------------------------------
// GAME STATE
// -----------------------------------------------------------------------------

export const gameState = reactive({
    tStart: null,
    mode: '',
    modeUpdate: () => { },
    gameover: false,
    paused: false,
    score: 0,
});

export let player = reactive(new Player());

export let canvas = null;
let _ctx = null;

// -----------------------------------------------------------------------------
// EVENTS
// -----------------------------------------------------------------------------

export const DURATION_EVENT_LISTENERS = {
    [DURATION_EVENTS.UP]: {
        start: () => _playerVelStart('vy', -1),
        end: () => _playerVelEnd('vy'),
    },
    [DURATION_EVENTS.DOWN]: {
        start: () => _playerVelStart('vy', 1),
        end: () => _playerVelEnd('vy'),
    },
    [DURATION_EVENTS.LEFT]: {
        start: () => _playerVelStart('vx', -1),
        end: () => _playerVelEnd('vx'),
    },
    [DURATION_EVENTS.RIGHT]: {
        start: () => _playerVelStart('vx', 1),
        end: () => _playerVelEnd('vx'),
    },
    [DURATION_EVENTS.ROTATE]: {
        start: () => { player.rotateDir = 1; },
        end: () => { player.rotateDir = 0; },
    },
    [DURATION_EVENTS.ROTATE_CC]: {
        start: () => { player.rotateDir = -1; },
        end: () => { player.rotateDir = 0; },
    },
};

export const ACTION_EVENT_LISTENERS = {
    [ACTION_EVENTS.RED]: () => { player.colorId = 0; },
    [ACTION_EVENTS.PURPLE]: () => { player.colorId = 1; },
    [ACTION_EVENTS.GREEN]: () => { player.colorId = 2; },
    [ACTION_EVENTS.CYAN]: () => { player.colorId = 3; },
    [ACTION_EVENTS.CYCLE_COLOR]: () => { player.colorId = ++player.colorId % COLORS.length; },
    [ACTION_EVENTS.PAUSE]: pause,
};


// -----------------------------------------------------------------------------
// MAIN (GAMELOOP)
// -----------------------------------------------------------------------------

/*
 * Draw the canvas context.
 */
function _draw() {
    // Clear canvas
    _ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player/orbs
    player.draw(_ctx);
    orbGenerator.draw(_ctx);
}

/*
 * Update all game components.
 */
function _update() {
    // Update player/orbs
    player.update();
    orbGenerator.update();

    // Run mode-dependent update
    (gameState.modeUpdate)();
}

/*
 * Run the game, woo!
 */
export function gameloop() {
    _draw();
    _update();

    if (gameState.gameover)
        return;
    if (gameState.paused)
        return;

    requestAnimationFrame(gameloop);
}

// -----------------------------------------------------------------------------
// INIT API
// -----------------------------------------------------------------------------

/*
 * Initialize the canvas. This must be first! Almost everything else depends
 * on the canvas.
 */
export function initCanvas() {
    // Init core canvas references
    canvas = document.getElementById('canvas');
    _ctx = canvas.getContext('2d');
    _resize();

    // Init canvas for game components
    player.initCanvas();
}

/*
 * Set the game mode.
 */
export function setMode(mode) {
    switch (mode) {
    case 'timed':
        gameState.modeUpdate = modes.timed;
        break;
    case 'spin':
        gameState.modeUpdate = modes.spin2win;
        break;
    case 'collector':
        gameState.modeUpdate = modes.collector;
        break;
    default:
        throw 'setMode: Invalid game mode';
    }

    gameState.mode = mode;
}

// -----------------------------------------------------------------------------
// LIFECYCLE API
// -----------------------------------------------------------------------------

/*
 * This is run when the game context is entered. It handles attaching all of the
 * event listeners that need to be active when the code is running.
 */
export function enter() {
    for (let [event, listener] of Object.entries(ACTION_EVENT_LISTENERS))
        window.addEventListener(event, listener);

    for (let [event, listener] of Object.entries(DURATION_EVENT_LISTENERS)) {
        window.addEventListener(event + '-start', listener.start);
        window.addEventListener(event + '-end', listener.end);
    }

    window.addEventListener('resize', _resize);

    orbGenerator.enter();
}

/*
 * This is run when the game context is left. It cleans up all active event
 * listeners that are no longer needed when the game is not running.
 */
export function leave() {
    for (let [event, listener] of Object.entries(ACTION_EVENT_LISTENERS))
        window.removeEventListener(event, listener);

    for (let [event, listener] of Object.entries(DURATION_EVENT_LISTENERS)) {
        window.removeEventListener(event + '-start', listener.start);
        window.removeEventListener(event + '-end', listener.end);
    }

    window.removeEventListener('resize', _resize);

    orbGenerator.leave();
}

/*
 * Reset the game state.
 */
export function reset() {
    gameState.paused = false;
    gameState.gameover = false;
    gameState.score = 0;

    // Reset game component states
    orbGenerator.reset();
    player.reset();

    // Reset canvas
    _ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// -----------------------------------------------------------------------------
// GAME STATE API
// -----------------------------------------------------------------------------

/*
 * Start the gameState.
 */
export function start() {
    gameState.tStart = Date.now();
    gameloop();
}

/*
 * Pause the gameState.
 */
export function pause() {
    gameState.paused = true;
}

/*
 * Resume the gameState.
 */
export function resume() {
    if (gameState.paused) {
        gameState.paused = false;
        gameloop();
    }
}

/*
 * Restart the gameState.
 */
export function restart() {
    reset();
    enter();
    start();
}

// -----------------------------------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------------------------------

/*
 * Adjust the canvas' internal width and height. This is necessary to prevent
 * stretching/squashing when the canvas is drawn.
 */
function _resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - HUD_HEIGHT;
    _draw();

    // If touch device, make some room for the nipple.
    // if (IS_TOUCH_DEVICE) {
    //     canvas.height -= JOYSTICK_RADIUS * 2;
    //     canvas.style.paddingBottom = JOYSTICK_RADIUS * 2 + 'px';
    // }
}

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

/*
 * x and y components for 45 degree angle unit velocity vector.
 */
const _diagLength = 1 / Math.sqrt(2);

/*
 * An abstraction for updating the player velocity vector when a new direction
 * is added, normalizing for 45 degree angle inputs (simultaneous input in both
 * dimensions). 
 *
 * dim should be one of [ 'vx', 'vy' ]
 * dir should be one of [ 1, -1 ]
 */
function _playerVelStart(dim, dir) {
    let dimOpp = (dim == 'vx') ? 'vy' : 'vx';

    if (player[dimOpp] != 0) {
        player[dimOpp] = Math.sign(player[dimOpp]) * _diagLength;
        player[dim] = dir * _diagLength;
    } else {
        player[dim] = dir;
    }
}

/*
 * An abstraction for updating the player velocity vector when a new direction
 * is removed, restoring previously altered values in the opposite dimension
 * when necessary.
 *
 * dim should be one of [ 'vx', 'vy' ]
 */
function _playerVelEnd(dim) {
    let dimOpp = (dim == 'vx') ? 'vy' : 'vx';

    if (player[dimOpp] != 0)
        player[dimOpp] = Math.sign(player[dimOpp]);
    player[dim] = 0;
}
