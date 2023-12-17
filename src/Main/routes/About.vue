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
    width: 80%;
    max-width: 600px;
}

a {
    color: $cyan;
    &:hover { color: $purple }
}
</style>
