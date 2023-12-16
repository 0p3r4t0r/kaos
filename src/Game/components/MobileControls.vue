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

    <canvas
      id="move-joystick"
      :width="JOYSTICK_SIZE"
      :height="JOYSTICK_SIZE"
    />
    <!-- <div id="color-joystick" /> -->
  </div>
</template>

<script>
import { JOYSTICK_RADIUS } from 'globals';
import {
    DURATION_EVENTS,
    ACTION_EVENTS,
    register,
    unregister,
} from 'input/events';
import { CONTEXTS, getContext } from 'input/state';
import Sprite from 'components/Sprite';
import Hammer from 'hammerjs';

export default {
    components: { Sprite },

    data() {
        const JOYSTICK_SIZE = JOYSTICK_RADIUS * 2;

        return {
            moveNipple: null,
            colorNipple: null,
            JOYSTICK_SIZE,
        };
    },

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

        // MOVEMENT JOYSTICK
        const canvas = document.getElementById('move-joystick');
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;

        // border
        ctx.beginPath();
        ctx.arc(JOYSTICK_RADIUS, JOYSTICK_RADIUS, JOYSTICK_RADIUS, 0, 2 * Math.PI);
        ctx.stroke();

        // knob
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(JOYSTICK_RADIUS, JOYSTICK_RADIUS, JOYSTICK_RADIUS * 0.69, 0, 2 * Math.PI);
        ctx.fill();

        const hammertime = new Hammer(canvas);
        hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });

        hammertime.on('panmove', (event) => {
            (getContext() == CONTEXTS.MENU) ? this.menuMove(event.deltaX, event.deltaY) : this.gameMove(event.deltaX, event.deltaY);
        });
        hammertime.on('panend', () => {
            (getContext() == CONTEXTS.MENU) ? this.menuEnd() : this.gameEnd();
        });

        return;

        // COLOR NIPPLE
        // this.colorNipple = nipplejs.create({
        //     zone: document.getElementById('color-nipple'),
        //     mode: 'static',
        //     position: { right: (NIPPLE_RADIUS + 30) + 'px', bottom: (NIPPLE_RADIUS + 30) + 'px' },
        //     size: 2 * NIPPLE_RADIUS,
        // });

        // this.colorNipple.on('dir:up', () => register(ACTION_EVENTS.RED, 'nipple-red'));
        // this.colorNipple.on('dir:down', () => register(ACTION_EVENTS.GREEN, 'nipple-green'));
        // this.colorNipple.on('dir:left', () => register(ACTION_EVENTS.CYAN, 'nipple-cyan'));
        // this.colorNipple.on('dir:right', () => register(ACTION_EVENTS.PURPLE, 'nipple-purple'));

        // this.colorNipple.on('end', () => {
        //     unregister(ACTION_EVENTS.RED, 'nipple-red');
        //     unregister(ACTION_EVENTS.GREEN, 'nipple-green');
        //     unregister(ACTION_EVENTS.CYAN, 'nipple-cyan');
        //     unregister(ACTION_EVENTS.PURPLE, 'nipple-purple');
        // });
    },

    methods: {
        menuMove: function (x, y) {
            (x < -0.5) ?
                register(ACTION_EVENTS.LEFT, 'joystick-left') :
                unregister(ACTION_EVENTS.LEFT, 'joystick-left');
            (x > 0.5) ?
                register(ACTION_EVENTS.RIGHT, 'joystick-right') :
                unregister(ACTION_EVENTS.RIGHT, 'joystick-right');
            (y < -0.5) ?
                register(ACTION_EVENTS.UP, 'joystick-up') :
                unregister(ACTION_EVENTS.UP, 'joystick-up');
            (y > 0.5) ?
                register(ACTION_EVENTS.DOWN, 'joystick-down') :
                unregister(ACTION_EVENTS.DOWN, 'joystick-down');
        },
        menuEnd: function () {
            unregister(ACTION_EVENTS.LEFT, 'joystick-left');
            unregister(ACTION_EVENTS.RIGHT, 'joystick-right');
            unregister(ACTION_EVENTS.DOWN, 'joystick-down');
            unregister(ACTION_EVENTS.UP, 'joystick-up');
        },
        gameMove: function (x, y) {
            (x < -0.5) ?
                register(DURATION_EVENTS.LEFT, 'joystick-left') :
                unregister(DURATION_EVENTS.LEFT, 'joystick-left');
            (x > 0.5) ?
                register(DURATION_EVENTS.RIGHT, 'joystick-right') :
                unregister(DURATION_EVENTS.RIGHT, 'joystick-right');
            (y < -0.5) ?
                register(DURATION_EVENTS.UP, 'joystick-up') :
                unregister(DURATION_EVENTS.UP, 'joystick-up');
            (y > 0.5) ?
                register(DURATION_EVENTS.DOWN, 'joystick-down') :
                unregister(DURATION_EVENTS.DOWN, 'joystick-down');
        },
        gameEnd: function () {
            unregister(DURATION_EVENTS.LEFT, 'joystick-left');
            unregister(DURATION_EVENTS.RIGHT, 'joystick-right');
            unregister(DURATION_EVENTS.DOWN, 'joystick-down');
            unregister(DURATION_EVENTS.UP, 'joystick-up');
        },
    },
};
</script>

<style lang='scss' scoped>
@import 'style/globals';

$control-margin: 30px;
$control-spacing: 20px;

#mobile-controls {
    width: 100%;
    height: 2 * $JOYSTICK_RADIUS + $SPRITE_SIZE + 50px;
    position: fixed;
    bottom: 0;
    z-index: 2;

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

// TODO: cleaner CSS
#move-joystick {
    border: dashed pink 2px;

    position: absolute;
    right: $control-margin + ($SPRITE_SIZE + $control-spacing - $JOYSTICK_RADIUS) / 2;
    bottom: $control-margin;
}
</style>
