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

ul {
    display: flex;
    gap: 20px;

    @include flex-center;
    @media screen and (orientation:landscape) { 
      flex-direction: column;
    }
    flex-direction: row;
    li { margin: 0 10px; }
}
</style>
