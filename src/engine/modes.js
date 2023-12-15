import { gameState, player } from './core';
import * as orbGenerator from './orbGenerator';

// -----------------------------------------------------------------------------
// TIMED
// -----------------------------------------------------------------------------

/*
 * Gain points by surviving for as long as possible.
 */
export function timed() {
    gameState.score = Math.floor((Date.now() - gameState.tStart) / 100);

    for (let orb of orbGenerator.orbs) {
        if (orb.colorId == player.colorId)
            continue;

        if (player.checkCollision(orb)) {
            gameState.gameover = true;
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
        ++gameState.score;

    for (let orb of orbGenerator.orbs) {
        if (orb.colorId == player.colorId)
            continue;

        if (player.checkCollision(orb)) {
            gameState.gameover = true;
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
                gameState.score++;
                orbGenerator.initOrb(orb);
            } else {
                gameState.gameover = true;
            }
        }   
    }
}
