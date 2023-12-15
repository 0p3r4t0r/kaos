<template>
  <ul class="kaos-list-ul">
    <li
      v-for="(item, index) in items"
      :key="index"
      :class="{ 'active': index == activeIndex }"
      class="kaos-list-li"
      @mouseover="setActiveIndex(index)"
      @click="action"
    >
      <a
        v-if="item.href"
        :href="item.href"
      >{{ $t(item.label) }}</a>
      <span
        v-else
        class="label"
      >{{ $t(item.label) }}</span>
    </li>
  </ul>
</template>

<script>
import { ACTION_EVENTS } from 'input/events';

export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
        activeIndex: {
            type: Number,
            required: true,
        },
    },

    mounted() {
        window.addEventListener(ACTION_EVENTS.DOWN, this.next);
        window.addEventListener(ACTION_EVENTS.UP, this.prev);
        window.addEventListener(ACTION_EVENTS.ACCEPT, this.action);
    },

    beforeUnmount() {
        window.removeEventListener(ACTION_EVENTS.DOWN, this.next);
        window.removeEventListener(ACTION_EVENTS.UP, this.prev);
        window.removeEventListener(ACTION_EVENTS.ACCEPT, this.action);
    },

    methods: {
        // ---------------------------------------------------------------------
        // HELPERS
        // ---------------------------------------------------------------------

        setActiveIndex: function(idx, relative = false) {
            let { activeIndex, items } = this;

            if (!relative) {
                activeIndex = idx;
            } else {
                activeIndex = (idx < 0) ?
                    Math.max(activeIndex + idx, 0) :
                    Math.min(activeIndex + idx, items.length - 1);
            }

            this.$parent.$data.activeIndex = activeIndex;
        },

        // ---------------------------------------------------------------------
        // EVENT LISTENERS
        // ---------------------------------------------------------------------

        prev: function() { this.setActiveIndex(-1, true); },
        next: function() { this.setActiveIndex(1, true); },
        action: function() {
            let action = this.items[this.activeIndex].action;
            (action) && (action)();
        },
    },
};
</script>

<style lang='scss'>
@import 'style/globals';
@import 'style/palette';
@import 'style/mixins/flex';
@import 'style/mixins/underline';

// -----------------------------------------------------------------------------
// LIST
// -----------------------------------------------------------------------------

.kaos-list-ul {
    /* core */
    @include flex-center;
    flex-direction: column;
}

// -----------------------------------------------------------------------------
// LIST ITEM
// -----------------------------------------------------------------------------

.kaos-list-li {
    /* core */
    margin: 20px 0;
    cursor: pointer;
    transition: transform 0.25s ease-out;

    .label { @include underline-core; }

    &.active {
        transform: scale(1.5);
        .label { @include underline-active; }
    }

    /* mobile / desktop */
    font-size: 20px;

    /* tablet */
    @media only screen and (min-width: $TABLET) and (max-width: $DESKTOP) {
        font-size: 3vw;
    }
}

@for $i from 1 through length($palette) {
    .kaos-list-li:nth-child(4n + #{$i}) .label {
        @include underline-bg(nth($palette, $i));
    }
}
</style>
