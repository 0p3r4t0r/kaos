<template>
  <div id="main">
    <div class="padding" />
    <KaosHeader />
    <LocalePicker />
    <router-view v-slot="{ Component }">
      <transition
        name="fade"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
    <div class="padding" />
    <KaosFooter />
  </div>
</template>

<script>
import { setContext, CONTEXTS } from 'input/state';
import router from './router.js';

import LocalePicker from './components/LocalePicker.vue';
import KaosHeader from './components/KaosHeader.vue';
import KaosFooter from './components/KaosFooter.vue';

export default {
    router,
    components: { LocalePicker, KaosHeader, KaosFooter },

    mounted() {
        setContext(CONTEXTS.MENU);
    },
};
</script>

<style lang='scss'>
@import 'style/mixins/flex';

#main {
    height: 100%;

    display: flex;
    align-items: center;
    flex-direction: column;

    /* This is needed to prevent the canvas from blocking certain clickables! */
    position: relative;
    transition: opacity .5s ease-out;

    .padding {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: auto;
        transition: all 2s ease-out;
    }
}
</style>
