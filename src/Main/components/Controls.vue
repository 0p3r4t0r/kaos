<template>
  <div>
    <!-- swiper wrapper -->
    <div class="swiper-container">
      <!-- slide wrapper -->
      <div class="swiper-wrapper">
        <!-- slides -->
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="swiper-slide"
        >
          <object
            :data="slide.data"
            type="image/svg+xml"
          />
          <div class="divider" />
          <h3>{{ $t(slide.label) }}</h3>
        </div>
      </div>

      <!-- pagination -->
      <div class="swiper-pagination" />
    </div>
  </div>
</template>


<script>
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { ACTION_EVENTS } from 'input/events';

const INVALID_SWIPER_ACCEPT_CLASSES = [
    'swiper-button-prev',
    'swiper-button-next',
    'swiper-pagination-bullet',
];

export default {

    data() {
        return {
            slides: [
                { label: 'settings.keyboard', data: 'controls/KeyboardControls.svg' },
                { label: 'settings.xbox', data: 'controls/XboxControls.svg' },
                { label: 'settings.playstation', data: 'controls/PlaystationControls.svg' },
                { label: 'settings.mobile', data: 'controls/MobileControls.svg' },
            ],
        };
    },

    mounted() {
        this.swiper = new Swiper('.swiper-container', {
            effect: 'coverflow',
            slidesPerView: 'auto',
            centeredSlides: true,
            grabCursor: true,

            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        window.addEventListener(ACTION_EVENTS.RIGHT, this.next);
        window.addEventListener(ACTION_EVENTS.LEFT, this.prev);
    },

    beforeUnmount() {
        window.removeEventListener(ACTION_EVENTS.RIGHT, this.next);
        window.removeEventListener(ACTION_EVENTS.LEFT, this.prev);
    },
    methods: {
        next: function() { this.swiper.slideNext(); },
        prev: function() { this.swiper.slidePrev(); },
    },
};
</script>


<style lang='scss' scoped>
@import 'style/globals';
@import 'style/palette';

// -----------------------------------------------------------------------------
// SWIPER CONTAINER
// -----------------------------------------------------------------------------

.swiper-container {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
}

// -----------------------------------------------------------------------------
// SWIPER SLIDE
// -----------------------------------------------------------------------------

.swiper-slide {
    width: 300px;
    height: 300px;
    padding: 5px;
    border: 1px solid $white;

    object {
        width: 100%;
        height: 230px;
    }

    .divider {
        width: 50%;
        height: 2px;
        margin: 5px auto;
        background: $grey;
    }

    h3, p {
        margin: 10px 0;
        text-align: center;
    }

    p { font-size: 12px; }
}

.swiper-slide-active {
    border: 1px solid $cyan;
}
</style>
