<template>
  <div id="about">
    <KaosHeader />
    <div v-html="$t('about')" />
  </div>
</template>

<script>
import KaosHeader from '../components/KaosHeader.vue';

export default {
    components: { KaosHeader },
};
</script>


<style lang='scss' scoped>
@import 'style/palette';
@import 'style/mixins/flex-center';
@import 'style/mixins/flex-direction';

#about {
  @include flex-center;
  @include flex-direction;
}

div {
    max-width: 600px;
    @media screen and (orientation:landscape) { 
      margin: 0px 30px;
    }
      margin: 0px 10px;
}
</style>
