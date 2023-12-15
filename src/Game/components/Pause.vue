<template>
  <Dialog :items="items" />
</template>


<script>
import Dialog from 'components/Dialog.vue';
import * as engine from 'engine/core';

export default {
    components: { Dialog },

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
