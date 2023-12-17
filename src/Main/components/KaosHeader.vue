<template>
  <header>
    <router-link
      id="logo"
      to="/"
    >
      <div id="logo-white">
        <object
          data="logo/LogoWhite.svg"
          type="image/svg+xml"
        />
      </div>
      <div id="logo-color">
        <object
          data="logo/LogoColor.svg"
          type="image/svg+xml"
        />
      </div>
    </router-link>
  </header>
</template>

<script>
export default {
    mounted() {
        let logo = document.getElementById('logo');
        let logoWhite= document.getElementById('logo-white');
        let logoColor = document.getElementById('logo-color');

        logo.addEventListener('mouseenter', () => {
            logoWhite.classList.remove('wipe-in');
            logoWhite.classList.add('wipe-out');

            logoColor.classList.remove('wipe-out');
            logoColor.classList.add('wipe-in');
        });

        logo.addEventListener('mouseleave', () => {
            logoWhite.classList.remove('wipe-out');
            logoWhite.classList.add('wipe-in');

            logoColor.classList.remove('wipe-in');
            logoColor.classList.add('wipe-out');
        });

        // Prevent persistent focus so keybindings such as 'Enter' don't take
        // us home.
        logo.addEventListener('click', () => {
            logo.blur();
        });
    }
};
</script>

<style lang='scss' scoped>
@import 'style/globals';

// -----------------------------------------------------------------------------
// LOGO
// -----------------------------------------------------------------------------

#logo {
    display: block;
    position: relative;
    overflow: hidden;
    outline: 0;
    z-index: 2;

    * {
        width: 100%;
        height: 100%;

        position: absolute;
        overflow: hidden;

        animation-duration: 0.25s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }

    /* mobile */
    width: 80px;
    height: 80px;

    /* mobile */

    @media only screen and (min-width: $TABLET) {
        width: 120px;
        height: 120px;
    }
}

#logo-color {
    left: -100%;
    object { left: 100%; }
}

// -----------------------------------------------------------------------------
// ANIMATIONS
// -----------------------------------------------------------------------------

.wipe-in {
    animation-name: wrapper-wipein;
    object { animation-name: svg-wipein; }
}

.wipe-out {
    animation-name: wrapper-wipeout;
    object { animation-name: svg-wipeout; }
}

@keyframes wrapper-wipein {
    from { left: -100%; }
    to { left: 0; }
}

@keyframes svg-wipein {
    from { left: 100%; }
    to { left: 0; }
}

@keyframes wrapper-wipeout {
    from { left: 0; }
    to { left: 100%; }
}

@keyframes svg-wipeout {
    from { left: 0; }
    to { left: -100%; }
}
</style>
