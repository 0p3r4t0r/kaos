<template>
  <div v-html="$t('about')" />
</template>


<style lang='scss' scoped>
@import 'style/palette';

div {
    width: 80%;
    max-width: 600px;
    margin: 50px auto;
}

a {
    color: $cyan;
    &:hover { color: $purple }
}
</style>
