<template>
  <div id="hud">
    <!-- {{ $t('hud.nextcolor') }}<div class='player-color' v-bind:class='nextColorClass' /> -->
    {{ $t('hud.score') }}<span class="score">{{ gameState.score }}</span>
  </div>
</template>


<script>
import { gameState, player } from 'engine/core';

export default {

    data() {
        return {
            gameState: gameState,
            player: player,
        };
    },
    
    computed: {
        nextColorClass: function () {
            switch (player.colorId) {
            case 0:
                return 'purple';
            case 1:
                return 'green';
            case 2:
                return 'cyan';
            case 3:
                return 'red';
            default:
                throw Error(`Invalid player color: ${player.colorId}`);
            }
        },
    },
};
</script>


<style lang='scss' scoped>
@import 'style/globals';
@import 'style/palette';

#hud {
    width: 100%;
    height: $HUD_HEIGHT;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid $grey;
}

.player-color {
    width: 20px;
    height: 20px;
    margin: 0 20px;
    border-radius: 3px;
}

.score {
    width: 30px;
    text-align: center;
}

.red {
    background: $red;
}

.purple {
    background: $purple;
}

.green {
    background: $green;
}

.cyan {
    background: $cyan;
}
</style>
