<template>
  <table>
    <tr>
      <td>{{ $t('leaderboard.date') }}</td>
      <td>{{ $t('leaderboard.score') }}</td>
    </tr>
    <tr
      v-for="(data, index) in scores"
      :key="index"
    >
      <td>{{ data.date }}</td>
      <td>{{ data.score }}</td>
    </tr>
  </table>
</template>


<script>
export default {
    props: [ 'scores' ],
};
</script>


<style lang='scss' scoped>
@import 'style/palette';
@import 'style/mixins/flex-center';

table {
    width: 80%;
    max-width: 600px;
    margin: 20px auto;
    border: 1px solid $grey;
    border-radius: 10px;

    tr {
        display: flex;
        justify-content: center;
    }

    td {
        width: 30%;
        height: 50px;

        @include flex-center;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
