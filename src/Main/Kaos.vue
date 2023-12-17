<template>
  <div id="main">
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
  </div>
</template>

<script>
import { setContext, CONTEXTS } from 'input/state';
import router from './router.js';

import LocalePicker from './components/LocalePicker.vue';
import KaosHeader from './components/KaosHeader.vue';

export default {
    router,
    components: { LocalePicker, KaosHeader },

    mounted() {
        setContext(CONTEXTS.MENU);
    },
};
</script>

<style lang='scss'>
@import 'style/mixins/flex-center';
@import 'style/mixins/flex-direction';

#main {
    height: 100%;

    @include flex-center;
    @include flex-direction;
    gap: 40px;

    /* This is needed to prevent the canvas from blocking certain clickables! */
    position: relative;
    transition: opacity .5s ease-out;
}
</style>
