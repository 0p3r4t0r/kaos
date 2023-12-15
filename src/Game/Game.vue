<template>
  <div id="game">
    <canvas id="canvas" />
    <Hud />
    <component :is="dialog" />
    <MobileControls v-if="enableMobileControls" />
  </div>
</template>


<script>
import { IS_TOUCH_DEVICE } from 'globals';
import * as engine from 'engine/core';
import { setContext, CONTEXTS } from 'input/state';

import MobileControls from './components/MobileControls.vue';
import Hud from './components/Hud.vue';
import Pause from './components/Pause.vue';
import GameOver from './components/GameOver.vue';

export default {
    components: { Hud, Pause, GameOver, MobileControls },

    data() {
        return {
            enableMobileControls: IS_TOUCH_DEVICE,
            dialog: null,
            gameState: engine.gameState,
        };
    },

    computed: {
        gameover: function() {
            return this.gameState.gameover;
        },
        paused: function() {
            return this.gameState.paused;
        },
    },

    watch: {
        gameover: function() {
            this.dialog = (this.gameover) ? 'GameOver' : null;
        },
        paused: function() {
            this.dialog = (this.paused) ? 'Pause' : null;
        },
    },

    mounted() {
        setContext(CONTEXTS.GAME);
        engine.initCanvas();
        engine.enter();
        engine.start();
    },

    beforeUnmount() {
        engine.reset();
        engine.leave();
    },
    
    methods: {
        quit: function() {
            let app = this.$root;
            app.leaveGame();
        },
    },
};
</script>

<style lang='scss' scoped>
#game {
    height: 100%;
    position: relative;
}
</style>
