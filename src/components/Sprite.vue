<template>
  <div class="sprite">
    <object
      :style="style"
      data="sprites.svg"
      type="image/svg+xml"
    />
  </div>
</template>

<script>
const SPRITE_SIZE = 55; // 50px + 5px padding

export default {
    props: {
        sprite: {
            type: String,
            required: true,
        },
    },

    computed: {
        style: function () {
            switch (this.sprite) {
            case 'fs-exit':
                return this.getStyleFromCoord(0, 0);
            case 'fs-enter':
                return this.getStyleFromCoord(1, 0);
            case 'locale-en':
                return this.getStyleFromCoord(2, 0);
            case 'locale-ja':
                return this.getStyleFromCoord(2, 1);
            case 'rotate-cc':
                return this.getStyleFromCoord(0, 1);
            case 'rotate':
                return this.getStyleFromCoord(1, 1);
            }

            return {};
        }
    },

    methods: {
        getStyleFromCoord(x, y) {
            return {
                left: (SPRITE_SIZE * -x) + 'px',
                top: (SPRITE_SIZE * -y) + 'px',
            };
        }
    },
};
</script>

<style lang='scss' scoped>
$SPRITE_SIZE: 50px;

.sprite {
    width: $SPRITE_SIZE;
    height: $SPRITE_SIZE;
    position: relative;
    overflow: hidden;

    object {
        position: absolute;
    }
}
</style>
