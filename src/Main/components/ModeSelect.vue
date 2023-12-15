<template>
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
          :data="slide.icon"
          type="image/svg+xml"
        />
        <div class="divider" />
        <h3>{{ $t(slide.label) }}</h3>
        <p>{{ $t(slide.description) }}</p>
      </div>
    </div>

    <!-- pagination -->
    <div class="swiper-pagination" />
  </div>
</template>


<script>
import Swiper from 'swiper';
import 'swiper/css';

import { MODES } from 'globals';
import { ACTION_EVENTS } from 'input/events';

const INVALID_SWIPER_ACCEPT_CLASSES = [
    'swiper-pagination-bullet',
];

export default {

    data() {
        return {
            slides: [
                {
                    label: 'modes.timed.label',
                    description: 'modes.timed.description',
                    icon: 'modes/timed.svg',
                },
                {
                    label: 'modes.spin.label',
                    description: 'modes.spin.description',
                    icon: 'modes/spin.svg',
                },
                {
                    label: 'modes.collector.label',
                    description: 'modes.collector.description',
                    icon: 'modes/collector.svg',
                },
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

            on: {
                click: (event) => {
                    let classList = event.target.classList;

                    for (let cssClass of INVALID_SWIPER_ACCEPT_CLASSES)
                        if (classList.contains(cssClass))
                            return;

                    this.accept();
                },
            },
        });

        window.addEventListener(ACTION_EVENTS.RIGHT, this.next);
        window.addEventListener(ACTION_EVENTS.LEFT, this.prev);
        window.addEventListener(ACTION_EVENTS.ACCEPT, this.accept);
    },

    beforeUnmount() {
        window.removeEventListener(ACTION_EVENTS.RIGHT, this.next);
        window.removeEventListener(ACTION_EVENTS.LEFT, this.prev);
        window.removeEventListener(ACTION_EVENTS.ACCEPT, this.accept);
    },
    methods: {
        next: function() { this.swiper.slideNext(); },
        prev: function() { this.swiper.slidePrev(); },

        accept: function() {
            let mode = MODES[this.swiper.activeIndex];
            let app = this.$root;
            app.startGame(mode);
        },
    },
};
</script>

<style lang='scss' scoped>
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
    border: 1px solid $white;

    object {
        width: 100%;
        height: 210px;
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
