<template>
  <ul id="locale-picker">
    <li 
      v-for="[locale, data] of locales"
      :key="locale"
      :data-locale="locale"
      class="locale-button"
      @click="click(locale)"
    >
      <Sprite :sprite="data.sprite" />
    </li>
  </ul>
</template>

<script>
import Sprite from 'components/Sprite';

export default {
    components: { Sprite },

    data() {
        return {
            active: false,
            locales: new Map([
                ['en', { sprite: 'locale-en', button: null }],
                ['ja', { sprite: 'locale-ja', button: null }],
            ]),
        };
    },

    mounted() {
        for (let el of this.$el.getElementsByClassName('locale-button'))
            this.locales.get(el.dataset.locale).button = el;
    },

    methods: {
        click: function(activeLocale) {
            if (this.active) {
                this.locales.forEach(({ button }, locale) => {
                    button.style.top = 0;
                    button.style.zIndex = (locale == activeLocale) ? 2 : 1;
                });

                this.$i18n.locale = activeLocale;
            } else {
                let counter = 0;
                this.locales.forEach(({ button }, locale) => {
                    button.style.top = (60 * counter++) + 'px';
                });
            }

            this.active = !this.active;
        },
    }
};
</script>

<style lang='scss' scoped>
@import 'style/globals';

ul {
    width: $SPRITE_SIZE;
    position: absolute;
    top: 50px;
    left: 50px;
    z-index: 2;

    li {
        width: $SPRITE_SIZE;
        height: $SPRITE_SIZE;
        position: absolute;
        top: 0;
        transition: 250ms top ease-in-out;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>