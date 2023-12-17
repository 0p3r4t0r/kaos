<template>
  <div id="home">
    <KaosHeader />
    <List
      :items="items"
      :active-index="activeIndex"
    />
    <KaosFooter />
  </div>
</template>

<script>
import KaosHeader from '../components/KaosHeader.vue';
import KaosFooter from '../components/KaosFooter.vue';
import List from 'components/List';

export default {
    components: { KaosHeader, KaosFooter, List },

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
                    label: 'home.controls',
                    action: () => this.goto('/controls'),
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
    gap: 40px;
}
</style>
