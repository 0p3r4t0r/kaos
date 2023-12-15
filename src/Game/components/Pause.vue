<template>
  <KaosDialog :items="items" />
</template>


<script>
import KaosDialog from 'components/KaosDialog.vue';
import * as engine from 'engine/core';

export default {
    components: { KaosDialog },

    data() {
        return {
            items: [
                { label: 'pause.resume', action: engine.resume },
                { label: 'pause.quit', action: this.$parent.quit },
            ],
        };
    },
};
</script>
