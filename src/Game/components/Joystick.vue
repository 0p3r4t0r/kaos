<template>
  <canvas
    :id="id"
    :width="JOYSTICK_SIZE"
    :height="JOYSTICK_SIZE"
  />
</template>

<script>
import { JOYSTICK_RADIUS } from 'globals';
import Hammer from 'hammerjs';

export default {
    props: {
        id: {
            type: String,
            required: true,
        },
        onMove: {
            type: Function,
            required: true,
        },
        onEnd: {
            type: Function,
            required: true,
        },
    },

    data() {
        const JOYSTICK_SIZE = JOYSTICK_RADIUS * 2;

        return {
            JOYSTICK_SIZE
        };
    },
    
    mounted() {
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

        hammertime.on('panmove', (ev) => {
            this.onMove(ev);
        });
        hammertime.on('panend', () => {
            this.onEnd();
        });
    }
};
</script>

<style lang='scss' scoped>
</style>