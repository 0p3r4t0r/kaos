<template>
  <div class="dialog">
    <span class="dialog-msg">
      <slot />
    </span>
    <List
      :items="items"
      :active-index="activeIndex"
    />
  </div>
</template>


<script>
import { setContext, CONTEXTS } from 'input/state';

import List from 'components/List.vue';

export default {
    components: { List },
    props: {
        items: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            activeIndex: 0,
        };
    },

    mounted() {
        setContext(CONTEXTS.MENU);
    },

    beforeUnmount() {
        setContext(CONTEXTS.GAME);
    },
};
</script>


<style lang='scss' scoped>
@import 'style/palette';
@import 'style/mixins/flex-center';
@import 'style/mixins/underline';

// -----------------------------------------------------------------------------
// DIALOG
// -----------------------------------------------------------------------------

.dialog {
    width: 300px;
    padding: 20px;
    @include flex-center;
    flex-direction: column;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: $black;
    border: 2px solid $grey;
    border-radius: 10px;
}

.dialog-msg {
    text-align: center;
}
</style>

<style lang='scss'>

// -----------------------------------------------------------------------------
// LIST
// -----------------------------------------------------------------------------

.kaos-list-ul {
    .kaos-list-li {
        font-size: 16px;
    }
}
</style>
