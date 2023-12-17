<template>
  <footer>
    <ul>
      <li>
        <router-link
          id="logo"
          to="/about"
        >
          {{ $t('footer.about') }}
        </router-link>
      </li>
      <li>
        <a href="https://github.com/0p3r4t0r/kaos">
          github
        </a>
      </li>
    </ul>
  </footer>
</template>


<style lang='scss' scoped>
@import 'style/palette';
@import 'style/mixins/flex-center';

footer {
    min-height: 50px;
    height: 50px;
    margin-top: 30px;
}

ul {
    @include flex-center;
    li { margin: 0 10px; }
}
</style>
