<template>
  <div id="play">
    <p v-html="$t('howtoplay')" />
    <ModeSelect />
  </div>
</template>

<script>
import ModeSelect from '../components/ModeSelect.vue';

export default {
    components: { ModeSelect },
};
</script>

<style lang='scss'>
@import 'style/mixins/flex';

#play {
    width: 100%;
    @include flex-center;
    flex-direction: column;

    p { text-align: center; }
}
</style>
