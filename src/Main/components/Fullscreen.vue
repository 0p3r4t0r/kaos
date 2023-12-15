<template>
  <div
    id="fullscreen"
    @click="toggleFullscreen()"
  >
    <Sprite :sprite="sprite" />
  </div>
</template>

<script>
import Sprite from 'components/Sprite';

export default {
    components: { Sprite },

    data() {
        return {
            isFullscreen: false,
            sprite: 'fs-enter',
        };
    },

    mounted() {
        this.icon = this.$el.children[0];
        document.addEventListener('fullscreenchange', this.fsChange);
    },

    beforeUnmount() {
        document.removeEventListener('fullscreenchange', this.fsChange);
    },

    methods: {
        toggleFullscreen: function() {
            if (this.isFullscreen) {
                document.exitFullscreen();
            } else {
                let app = this.$root;
                app.$el.requestFullscreen();
            }
        },
        fsChange: function(event, rest) {
            this.isFullscreen = !this.isFullscreen;
            this.sprite = (this.isFullscreen) ? 'fs-exit' : 'fs-enter';
        },
    },
};
</script>

<style lang='scss' scoped>
#fullscreen {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50px;
    right: 50px;
    z-index: 2;
    cursor: pointer;
    overflow: hidden;

    object {
        width: 200%;
        height: 100%;
        position: absolute;
        left: -100%;
    }
}
</style>