<template>
  <div id="mobile-controls">
    <Sprite
      id="mobile-controls-rotate"
      sprite="rotate"
      class="rotate"
    />
    <Sprite
      id="mobile-controls-rotate-cc"
      sprite="rotate-cc"
      class="rotate"
    />

    <Joystick
      id="move-joystick"
      :on-move="moveJoystickOnMove"
      :on-end="moveJoystickOnEnd"
    />

    <Joystick
      id="color-joystick"
      :on-move="colorJoystickOnMove"
      :on-end="colorJoystickOnEnd"
    />
  </div>
</template>

<script>
import { normalX, normalY } from 'engine/core';
import {
    DURATION_EVENTS,
    ACTION_EVENTS,
    register,
    unregister,
} from 'input/events';
import { CONTEXTS, getContext } from 'input/state';
import Sprite from 'components/Sprite';
import Joystick from './Joystick';

export default {
    components: { Joystick, Sprite },

    mounted() {
        // ROTATE
        document.getElementById('mobile-controls-rotate').addEventListener('touchstart', () => {
            (getContext() == CONTEXTS.MENU) ?
                register(ACTION_EVENTS.ACCEPT, 'mobile-controls-accept') :
                register(DURATION_EVENTS.ROTATE, 'mobile-controls-rotate');
        });

        document.getElementById('mobile-controls-rotate').addEventListener('touchend', () => {
            (getContext() == CONTEXTS.MENU) ?
                unregister(ACTION_EVENTS.ACCEPT, 'mobile-controls-accept') :
                unregister(DURATION_EVENTS.ROTATE, 'mobile-controls-rotate');
        });

        // ROTATE-CC
        document.getElementById('mobile-controls-rotate-cc').addEventListener('touchstart', () => {
            (getContext() == CONTEXTS.MENU) ?
                register(ACTION_EVENTS.BACK, 'mobile-controls-back') :
                register(DURATION_EVENTS.ROTATE_CC, 'mobile-controls-rotate-cc');
        });

        document.getElementById('mobile-controls-rotate-cc').addEventListener('touchend', () => {
            (getContext() == CONTEXTS.MENU) ?
                unregister(ACTION_EVENTS.BACK, 'mobile-controls-back') :
                unregister(DURATION_EVENTS.ROTATE_CC, 'mobile-controls-rotate-cc');
        });

        return;
    },

    // Convention: left, right, up, down
    methods: {
        menuMove: function (x, y) {
            const xHat = normalX(x, y);
            const yHat = normalY(x, y);

            (xHat < -0.5) ?
                register(ACTION_EVENTS.LEFT, 'joystick-left') :
                unregister(ACTION_EVENTS.LEFT, 'joystick-left');
            (xHat > 0.5) ?
                register(ACTION_EVENTS.RIGHT, 'joystick-right') :
                unregister(ACTION_EVENTS.RIGHT, 'joystick-right');
            (yHat < -0.5) ?
                register(ACTION_EVENTS.UP, 'joystick-up') :
                unregister(ACTION_EVENTS.UP, 'joystick-up');
            (yHat > 0.5) ?
                register(ACTION_EVENTS.DOWN, 'joystick-down') :
                unregister(ACTION_EVENTS.DOWN, 'joystick-down');
        },
        menuEnd: function () {
            unregister(ACTION_EVENTS.LEFT, 'joystick-left');
            unregister(ACTION_EVENTS.RIGHT, 'joystick-right');
            unregister(ACTION_EVENTS.UP, 'joystick-up');
            unregister(ACTION_EVENTS.DOWN, 'joystick-down');
        },
        gameMove: function (x, y) {
            const xHat = normalX(x, y);
            const yHat = normalY(x, y);

            (xHat < -0.5) ?
                register(DURATION_EVENTS.LEFT, 'joystick-left') :
                unregister(DURATION_EVENTS.LEFT, 'joystick-left');
            (xHat > 0.5) ?
                register(DURATION_EVENTS.RIGHT, 'joystick-right') :
                unregister(DURATION_EVENTS.RIGHT, 'joystick-right');
            (yHat < -0.5) ?
                register(DURATION_EVENTS.UP, 'joystick-up') :
                unregister(DURATION_EVENTS.UP, 'joystick-up');
            (yHat > 0.5) ?
                register(DURATION_EVENTS.DOWN, 'joystick-down') :
                unregister(DURATION_EVENTS.DOWN, 'joystick-down');
        },
        gameEnd: function () {
            unregister(DURATION_EVENTS.LEFT, 'joystick-left');
            unregister(DURATION_EVENTS.RIGHT, 'joystick-right');
            unregister(DURATION_EVENTS.UP, 'joystick-up');
            unregister(DURATION_EVENTS.DOWN, 'joystick-down');
        },
        moveJoystickOnMove: function (event) {
            (getContext() == CONTEXTS.MENU) ? this.menuMove(event.deltaX, event.deltaY) : this.gameMove(event.deltaX, event.deltaY);
        },
        moveJoystickOnEnd: function () {
            (getContext() == CONTEXTS.MENU) ? this.menuEnd() : this.gameEnd();
        },
        colorJoystickOnMove: function (event) {
            const { angle } = event;
            if (135 < angle || angle < -135) { // left
                register(ACTION_EVENTS.CYAN, 'joystick-cyan');
            } else if (-45 < angle && angle < 45) { // right
                register(ACTION_EVENTS.PURPLE, 'joystick-purple');
            } else if (-135 < angle && angle < -45) { // up
                register(ACTION_EVENTS.RED, 'joystick-red');
            } else if (45 < angle && angle < 135) { // down
                register(ACTION_EVENTS.GREEN, 'joystick-green');
            }
        },
        colorJoystickOnEnd: function () {
            unregister(ACTION_EVENTS.CYAN, 'joystick-cyan');
            unregister(ACTION_EVENTS.PURPLE, 'joystick-purple');
            unregister(ACTION_EVENTS.RED, 'joystick-red');
            unregister(ACTION_EVENTS.GREEN, 'joystick-green');
        }
    },
};
</script>

<style lang='scss' scoped>
@import 'style/globals';
@import 'style/palette';

$control-margin: 30px;
$control-spacing: 20px;

#mobile-controls {
    width: 100%;
    height: 2 * $JOYSTICK_RADIUS + $SPRITE_SIZE + 50px;
    position: fixed;
    bottom: 0;
    z-index: 2;

    // Prevents the controls from blocking clicks on the menu
    pointer-events: none;

    & > * {
        pointer-events: auto;
    }

    .rotate {
        width: $SPRITE_SIZE;
        height: $SPRITE_SIZE;
        position: absolute;
        top: 0;
        cursor: pointer;
    }
}

#mobile-controls-rotate {
    right: $control-margin;
}

#mobile-controls-rotate-cc {
    right: $control-margin + $SPRITE_SIZE + $control-spacing;
}

#move-joystick {
    position: absolute;
    left: $control-margin;
    bottom: $control-margin;

    border: solid 2px $grey;
    border-radius: 100%;
}

#color-joystick {
    position: absolute;
    right: $control-margin + ($SPRITE_SIZE + $control-spacing - $JOYSTICK_RADIUS) / 2;
    bottom: $control-margin;

    border: solid;
    border-width: 8px;
    border-radius: 100%;
    border-left-color: $cyan;
    border-right-color: $purple;
    border-top-color: $red;
    border-bottom-color: $green;

}
</style>
