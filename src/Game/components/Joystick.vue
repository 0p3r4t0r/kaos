<template>
  <canvas
    :id="id"
    :width="JOYSTICK_SIZE"
    :height="JOYSTICK_SIZE"
  />
</template>

<script>
import { JOYSTICK_RADIUS } from 'globals';
import Hammer from 'hammerjs/hammer.min';

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
        knobColor: {
            type: String,
            default: 'white',
        },
        backgroundColor: {
            type: String,
            default: '#383838',
        }
    },

    data() {
        const JOYSTICK_SIZE = JOYSTICK_RADIUS * 2;

        return {
            JOYSTICK_SIZE
        };
    },
    
    mounted() {
        const canvas = document.getElementById(this.id);
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 2;

        // background
        ctx.beginPath();
        ctx.arc(JOYSTICK_RADIUS, JOYSTICK_RADIUS, JOYSTICK_RADIUS, 0, 2 * Math.PI);

        ctx.fillStyle = this.backgroundColor;
        ctx.fill();

        ctx.strokeStyle = this.backgroundColor;
        ctx.stroke();

        // knob
        ctx.beginPath();
        ctx.arc(JOYSTICK_RADIUS, JOYSTICK_RADIUS, JOYSTICK_RADIUS * 0.65, 0, 2 * Math.PI);

        ctx.fillStyle = this.knobColor;
        ctx.fill();

        // events
        const hammertime = new Hammer(canvas);
        hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });

        // https://hammerjs.github.io/api/#Event-object:~:text=pointers)%3B%0A%7D)%3B-,Event%20object,-All%20events%20that
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