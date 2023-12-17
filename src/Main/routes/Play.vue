<template>
  <div id="play">
    <KaosHeader>
      <p v-html="$t('howtoplay')" />
    </KaosHeader>
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
    width: 55%;
    @include flex-center;
    @include flex-direction;
}

p { 
  text-align: center;
  max-height: 12em;
  min-width: 20em;
}
</style>
