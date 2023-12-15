<template>
  <List
    :items="items"
    :active-index="activeIndex"
  />
</template>

<script>
import List from 'components/List';

export default {
    components: { List },

    data() {
        return {
            activeIndex: 0,
            items: [
                {
                    label: 'home.play',
                    action: () => this.goto('/play'),
                },
                {
                    label: 'home.scores',
                    action: () => this.goto('/scores'),
                },
                {
                    label: 'home.settings',
                    action: () => this.goto('/settings'),
                },
            ],
        };
    },

    methods: {
        goto: function(route) {
            // VueRouter throws an exception if we try to push the same route
            // we are already on.
            if (this.$route.path == route)
                return;
            this.$router.push(route);
        },
    },
};
</script>

<style lang='scss'>
@import 'style/globals';
@import 'style/mixins/flex';

#home {
    /* core */
    @include flex-center;
    position: relative;
    overflow: hidden;

    // allow overlapping elements during transitions
    > * { position: absolute; }

    /* tablet */
    @media only screen and (min-width: $TABLET) {
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
    }
}
</style>
