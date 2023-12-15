import { state, player } from './core';
import * as orbGenerator from './orbGenerator';

// -----------------------------------------------------------------------------
// TIMED
// -----------------------------------------------------------------------------

/*
 * Gain points by surviving for as long as possible.
 */
export function timed() {
    state.score = Math.floor((Date.now() - state.tStart) / 100);

    for (let orb of orbGenerator.orbs) {
        if (orb.colorId == player.colorId)
            continue;

        if (player.checkCollision(orb)) {
            state.gameover = true;
            break;
        }
    }
}

// -----------------------------------------------------------------------------
// SPIN2WIN
// -----------------------------------------------------------------------------

/*
 * Gain points by completing 360 degree rotations.
 */
export function spin2win() {
    if (player.checkSpin())
        ++state.score;

    for (let orb of orbGenerator.orbs) {
        if (orb.colorId == player.colorId)
            continue;

        if (player.checkCollision(orb)) {
            state.gameover = true;
            break;
        }
    }
}

// -----------------------------------------------------------------------------
// COLLECTOR
// -----------------------------------------------------------------------------

/*
 * Gain points by colliding with orbs of the same color.
 */
export function collector() {
    for (let orb of orbGenerator.orbs) {
        if (player.checkCollision(orb)) {
            if (orb.colorId == player.colorId) {
                state.score++;
                orbGenerator.initOrb(orb);
            } else {
                state.gameover = true;
            }
        }   
    }
}
