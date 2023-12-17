<template>
  <div id="home">
    <List
      :items="items"
      :active-index="activeIndex"
    />
    <KaosFooter />
  </div>
</template>

<script>
import KaosFooter from '../components/KaosFooter.vue';
import List from 'components/List';

export default {
    components: { KaosFooter, List },

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
@import 'style/mixins/flex-center';
@import 'style/mixins/flex-direction';

#home {
    @include flex-center;
    @include flex-direction;
}
</style>
