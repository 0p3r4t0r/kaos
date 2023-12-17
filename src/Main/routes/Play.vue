<template>
  <div id="play">
    <KaosHeader :text="$t('howtoplay')" />
    <ModeSelect />
  </div>
</template>

<script>
import KaosHeader from '../components/KaosHeader.vue';
import ModeSelect from '../components/ModeSelect.vue';

export default {
    components: { KaosHeader, ModeSelect },
};
</script>

<style lang='scss'>
@import 'style/mixins/flex-center';
@import 'style/mixins/flex-direction';

#play {
    width: 60%;
    @include flex-center;
    @include flex-direction;
}
</style>
