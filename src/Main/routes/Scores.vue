<template>
  <div id="score">
    <div class="pagination-wrapper">
      <span
        v-for="(modeScores, mode) in scores"
        :key="mode"
        class="pagination-slide"
      >
        {{ $t(`modes.${mode}.label`) }}
      </span>
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(modeScores, mode) in scores"
          :key="mode"
          class="swiper-slide"
        >
          <Leaderboard :scores="modeScores" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { SCORES } from 'globals';
import { ACTION_EVENTS } from 'input/events';
import Leaderboard from '../components/Leaderboard.vue';

export default {
    components: { Leaderboard },

    data() {
        return {
            scores: SCORES,
        };
    },

    mounted() {
        let root = document.getElementById('score');
        let activeBorder = document.getElementById('active-border');

        this.swiperSlides = root.getElementsByClassName('swiper-slide');
        this.paginationSlides = root.getElementsByClassName('pagination-slide');
        this.paginationSlides[0].classList.add('pagination-slide-active');

        for (let i = 0; i < this.paginationSlides.length; ++i)
            this.paginationSlides[i].onclick = () => this.goto(i);

        this.swiper = new Swiper('.swiper-container', {
            grabCursor: true,

            on: {
                slideChangeTransitionStart: () => {
                    for (let i = 0; i < this.swiperSlides.length; ++i) {
                        let slide = this.swiperSlides[i];
                        let pagination = this.paginationSlides[i];

                        slide.classList.contains('swiper-slide-active') ?
                            pagination.classList.add('pagination-slide-active') :
                            pagination.classList.remove('pagination-slide-active');
                    }
                },
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
        goto: function(idx) {
            this.swiper.slideTo(idx);

            for (let i = 0; i < this.paginationSlides.length; ++i) {
                let cl = this.paginationSlides[i].classList;
                (i == idx) ?
                    cl.add('pagination-slide-active') :
                    cl.remove('pagination-slide-active');
            }
        },
        next: function() { this.swiper.slideNext(); },
        prev: function() { this.swiper.slidePrev(); },
    },
};
</script>


<style lang='scss' scoped>
@import 'style/palette';
@import 'style/mixins/underline';
@import 'style/mixins/flex';

#score {
    width: 100%;
    margin: 20px auto 0;
}

// -----------------------------------------------------------------------------
// SWIPER CONTAINER
// -----------------------------------------------------------------------------

.swiper-container {
    width: 100%;
    height: 100%;
}

// -----------------------------------------------------------------------------
// SWIPER SLIDE
// -----------------------------------------------------------------------------

.swiper-slide {
    width: 300px;
    background-position: center;
    background-size: cover;
}

// -----------------------------------------------------------------------------
// CUSTOM PAGINATION
// -----------------------------------------------------------------------------

.pagination-wrapper {
    @include flex-center;
}

.pagination-slide {
    margin: 0 10px;
    cursor: pointer;
    @include underline-core;
}

.pagination-slide-active {
    @include underline-active;
    @include underline-bg($red);
}

@for $i from 1 through length($palette) {
    .pagination-slide:nth-child(4n + #{$i}) {
        @include underline-bg(nth($palette, $i));
    }
}
</style>
