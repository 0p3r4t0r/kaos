<template>
  <KaosDialog :items="items">
    <span>
      {{ $t('gameover.gameover') }}<br>
      {{ $t('gameover.score') }}{{ score }}
    </span>
  </KaosDialog>
</template>


<script>
import { NUM_SCORES, SCORES } from 'globals';
import * as engine from 'engine/core';
import KaosDialog from 'components/KaosDialog.vue';

export default {
    components: { KaosDialog },

    data() {
        return {
            score: 0,
            items: [
                { label: 'gameover.restart', action: engine.restart },
                { label: 'gameover.quit', action: this.$parent.quit },
            ],
        };
    },

    mounted() {
        this.score = engine.gameState.score;
        let saved = false;
        let categoryScores = SCORES[engine.gameState.mode];
        let gameScore = {
            score: this.score,
            date: this.getDate(),
        };

        for (let [index, scoreData] of Object.entries(categoryScores)) {
            if (gameScore.score > scoreData.score) {
                categoryScores.splice(index, 0, gameScore);
                saved = true;
                break;
            }
        }

        if (categoryScores.length > NUM_SCORES)
            categoryScores.pop();
        else if (!saved && categoryScores.length < NUM_SCORES)
            categoryScores.push(gameScore);

        localStorage.setItem('score_data', JSON.stringify(SCORES));
    },

    methods: {
        // HELPER FUNCTIONS
        getDate: function() {
            let dateObj = new Date();
            let date = dateObj.getDate(); 
            let month = dateObj.getMonth(); 
            let year = dateObj.getFullYear(); 
            return `${date}/${month}/${year}`;
        },
    },
};
</script>
