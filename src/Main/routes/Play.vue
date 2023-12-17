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
@import 'style/mixins/flex-center';
@import 'style/mixins/flex-direction';

#play {
    width: 50%;
    @include flex-center;
    @include flex-direction

    p { text-align: center; }
}
</style>
