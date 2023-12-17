<template>
  <div id="kaos-app">
    <transition
      name="fade"
      mode="out-in"
    >
      <component :is="component" />
    </transition>
  </div>
</template>


<script>
import * as engine from 'engine/core';

import Kaos from './Main/Kaos.vue';
import Game from './Game/Game.vue';

export default {
    components: { Kaos, Game },

    data() {
        return {
            component: 'Kaos',
        };
    },

    methods: {
        startGame: function(mode) {
            engine.setMode(mode);
            this.component = 'Game';
        },
        leaveGame: function() {
            this.component = 'Kaos';
        },
    },
};
</script>


<style lang='scss'>
@import 'style/palette';

#kaos-app {
    height: 100%;
    background-color: $black;

    /* This is needed to prevent the canvas from blocking certain clickables! */
    position: relative;
    overflow: clip;
}
</style>
